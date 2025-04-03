import DualAuth from "../../../common/DualAuth";
import FormsEnum from "../../../enums/FormsEnum";
import SubmitMethodsEnum from "../../../enums/SubmitMethodsEnum";
import PermissionsEnum from "../../../enums/PermissionsEnum";
import Role from "../../../models/Role";

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const role_permission = formData.get('role_permission');

        const new_payload = {
            data: {
                name, role_permission
            }
        }
        const summary_data = {
            common: {
                Name: name, Permissions: role_permission
            }
        }
        const data = {
            form_name: FormsEnum.ROLE_MANAGEMENT.value,
            method: SubmitMethodsEnum.CREATE.value,
            model_type: 'Role',
            new_payload: JSON.stringify(new_payload),
            summary: "Create New Role",
            summary_data: JSON.stringify(summary_data),
            permission: PermissionsEnum.CREATE_ROLE.value,
            created_by: 1,
        };

        const dualAuth = await new DualAuth(data).create();
        return new Response(JSON.stringify({message:'Success!', data:dualAuth}), {status: 200});
    } catch (err) {
        return new Response(JSON.stringify({message:'Something went wrong!', error: err}), {status: 500});
    }
}
export const GET = async (request) => {
    try {
        const data = await Role.findAll();
        return new Response(JSON.stringify({message: 'success', data}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: 'Something went wrong!', error: error}), {status: 500});
    }
}