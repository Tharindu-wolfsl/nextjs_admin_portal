import Role from "../../../../models/Role";
import FormsEnum from "../../../../enums/FormsEnum";
import SubmitMethodsEnum from "../../../../enums/SubmitMethodsEnum";
import PermissionsEnum from "../../../../enums/PermissionsEnum";
import DualAuth from "../../../../common/dual_auth/DualAuth";


export const PUT = async (request, {params}) => {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        let prevData = [];
        // const password = formData.get('password');
        const {id} = await params;
        if (email) {
            const emailExist = await User.findOne({where: {email}});
            if (emailExist) {
                return new Response(JSON.stringify({error:'Email already exist!'}), {status: 400});
            }
        }
        prevData = await User.findByPk(id);
        const old_payload = {
            data: {
                name: prevData.name,
                email: prevData.email
            }
        }
        const new_payload = {
            data: {},
            id: id
        }
        if(name && prevData.name !== name) {
            new_payload.data.name = name;
        }
        if(email && prevData.email !== email) {
            new_payload.data.email = email;
        }
        console.log(new_payload, old_payload);
        if( new_payload.data.length === 0 ) {
            return new Response(JSON.stringify({message:'No changes found!'}), {status: 300});
        }
        const summary_data = {
            pre: {
                Name: prevData.name,
                Email: prevData.email,
            },
            new: {
                Name: name,
                Email: email,
            },
        }
        const data = {
            form_name: FormsEnum.USER_MANAGEMENT.value,
            method: SubmitMethodsEnum.UPDATE.value,
            model_type: 'User',
            new_payload: JSON.stringify(new_payload),
            old_payload: JSON.stringify(old_payload),
            summary: "Update User",
            summary_data: JSON.stringify(summary_data),
            permission: PermissionsEnum.UPDATE_USER.value,
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
        prevData = await User.findByPk(id);
        const old_payload = {
            data: {
                name: prevData.name,
                email: prevData.email
            }
        }
        const new_payload = {
            data: {},
            id: id
        }
        const summary_data = {
            pre: {
                Name: prevData.name,
                Email: prevData.email,
            },
        }
        const data = {
            form_name: FormsEnum.USER_MANAGEMENT.value,
            method: SubmitMethodsEnum.DELETE.value,
            model_type: 'User',
            new_payload: JSON.stringify(new_payload),
            old_payload: JSON.stringify(old_payload),
            summary: "Delete User",
            summary_data: JSON.stringify(summary_data),
            permission: PermissionsEnum.DELETE_USER.value,
            created_by: 1,
        };

        const dualAuth = await new DualAuth(data).create();
        return new Response(JSON.stringify({message:'Success!', data:dualAuth}), {status: 200});
    } catch (err) {
        return new Response(JSON.stringify({message:'Something went wrong!', error: err.message}), {status: 500});
    }
}