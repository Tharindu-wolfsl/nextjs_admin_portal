import Role from "../../../../models/Role";
import FormsEnum from "../../../../enums/FormsEnum";
import SubmitMethodsEnum from "../../../../enums/SubmitMethodsEnum";
import PermissionsEnum from "../../../../enums/PermissionsEnum";
import DualAuth from "../../../../common/DualAuth";


export const PUT = async (request, {params}) => {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const role_permission = formData.get('role_permission');
        let prevData = [];
        // const password = formData.get('password');
        const {id} = await params;

        prevData = await Role.findByPk(id);
        const old_payload = {
            data: {
                name: prevData.name,
                role_permission: prevData.role_permission
            }
        }
        const new_payload = {
            data: {},
            id: id
        }
        if(name && (prevData.name !== name)) {
            new_payload.data.name = name;
        }
        if(role_permission && (prevData.role_permission !== role_permission)) {
            new_payload.data.role_permission = role_permission;
        }

        if( new_payload.data.length === 0 ) {
            return new Response(JSON.stringify({message:'No changes found!'}), {status: 300});
        }
        const summary_data = {
            pre: {
                Name: prevData.name,
                Permissions: prevData.role_permission,
            },
            new: {
                Name: name,
                Permissions: role_permission,
            },
        }
        const data = {
            form_name: FormsEnum.ROLE_MANAGEMENT.value,
            method: SubmitMethodsEnum.UPDATE.value,
            model_type: 'Role',
            new_payload: JSON.stringify(new_payload),
            old_payload: JSON.stringify(old_payload),
            summary: "Update Role",
            summary_data: JSON.stringify(summary_data),
            permission: PermissionsEnum.UPDATE_ROLE.value,
            created_by: 1,
        };

        const dualAuth = await new DualAuth(data).create();
        return new Response(JSON.stringify({message:'Success!', data:dualAuth}), {status: 200});
    } catch (err) {
        return new Response(JSON.stringify({message:'Something went wrong!', error: err.message}), {status: 500});
    }
}

export const DELETE = async (request, { params }) => {
    try {
        let prevData = [];
        // const password = formData.get('password');
        const {id} = await params;
        prevData = await Role.findByPk(id);
        const old_payload = {
            data: {
                name: prevData.name,
                role_permission: prevData.role_permission
            }
        }
        const new_payload = {
            data: {},
            id: id
        }
        const summary_data = {
            pre: {
                Name: prevData.name,
                Permissions: prevData.role_permission,
            },
        }
        const data = {
            form_name: FormsEnum.ROLE_MANAGEMENT.value,
            method: SubmitMethodsEnum.DELETE.value,
            model_type: 'Role',
            new_payload: JSON.stringify(new_payload),
            old_payload: JSON.stringify(old_payload),
            summary: "Delete Role",
            summary_data: JSON.stringify(summary_data),
            permission: PermissionsEnum.DELETE_ROLE.value,
            created_by: 1,
        };

        const dualAuth = await new DualAuth(data).create();
        return new Response(JSON.stringify({message:'Success!', data:dualAuth}), {status: 200});
    } catch (err) {
        return new Response(JSON.stringify({message:'Something went wrong!', error: err.message}), {status: 500});
    }
}