import User from "../../../models/User";
import DualAuth from "../../../common/dual_auth/DualAuth";
import FormsEnum from "../../../enums/FormsEnum";
import SubmitMethodsEnum from "../../../enums/SubmitMethodsEnum";
import PermissionsEnum from "../../../enums/PermissionsEnum";
import GenerateHash from "../../../utils/GenerateHash";

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const roles = formData.get('roles');
        const password = await new GenerateHash({plaintext : process.env.DEFAULT_USER_PW, saltRounds: Number(process.env.SALT_ROUNDS) }).getHash();
        // const password = formData.get('password');
        const isUserExists = await User.findOne({where: {email}});
        if (isUserExists) {
            return new Response(JSON.stringify({error:'Email already exist!'}), {status: 400});
        }
        const new_payload = {
            data: {
                name, email, password, roles
            }
        }
        const summary_data = {
            common: {
                Name: name, Email: email, Roles: roles
            }
        }
        const data = {
            form_name: FormsEnum.USER_MANAGEMENT.value,
            method: SubmitMethodsEnum.CREATE.value,
            model_type: 'User',
            new_payload: JSON.stringify(new_payload),
            summary: "Create New User",
            summary_data: JSON.stringify(summary_data),
            permission: PermissionsEnum.CREATE_USER.value,
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
        const data = await User.findAll();
        return new Response(JSON.stringify({message: 'success', data}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: 'Something went wrong!', error: error}), {status: 500});
    }
}