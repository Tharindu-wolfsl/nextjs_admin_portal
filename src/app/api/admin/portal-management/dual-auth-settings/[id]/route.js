import FormsEnum from "../../../../../enums/FormsEnum";
import SubmitMethodsEnum from "../../../../../enums/SubmitMethodsEnum";
import PermissionsEnum from "../../../../../enums/PermissionsEnum";
import DualAuth from "../../../../../common/DualAuth";
import DualAuthSetting from "../../../../../models/DualAuthSetting";

export const PUT = async (request, {params}) => {
    try {
        const formData = await request.formData();
        const status = formData.get('status');
        let prevData = [];
        const {id} = await params;

        prevData = await DualAuthSetting.findByPk(id);
        const old_payload = {
            data: {
                feature_name: prevData.feature_name,
                status: prevData.status
            }
        }
        const new_payload = {
            data: {},
            id: id
        }
        if(status && (prevData.status !==  (status === 'ACTIVE'))) {
            new_payload.data.status = status === 'ACTIVE';
        }

        if( new_payload.data.length === 0 ) {
            return new Response(JSON.stringify({message:'No changes found!'}), {status: 300});
        }
        const summary_data = {
            pre: {
                Status: prevData.status === true ? 'Active' : 'Inactive',
            },
            new: {
                Status: status === 'ACTIVE' ? 'Active' : 'Inactive',
            },
        }
        const data = {
            form_name: FormsEnum.DUAL_AUTH_SETTINGS_MANAGEMENT.value,
            method: SubmitMethodsEnum.UPDATE.value,
            model_type: 'DualAuthSetting',
            new_payload: JSON.stringify(new_payload),
            old_payload: JSON.stringify(old_payload),
            summary: "Update Dual Auth Setting",
            summary_data: JSON.stringify(summary_data),
            permission: PermissionsEnum.UPDATE_DUAL_AUTH_SETTINGS.value,
            created_by: 1,
        };

        const dualAuth = await new DualAuth(data).create();
        return new Response(JSON.stringify({message:'Success!', data:dualAuth}), {status: 200});
    } catch (err) {
        return new Response(JSON.stringify({message:'Something went wrong!', error: err.message}), {status: 500});
    }
}