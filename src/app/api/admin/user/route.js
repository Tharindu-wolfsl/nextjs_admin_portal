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
        const password = await new GenerateHash({plaintext : process.env.DEFAULT_USER_PW, saltRounds: Number(process.env.SALT_ROUNDS) }).getHash();
        // const password = formData.get('password');

        const isUserExists = await User.findOne({where: {email}});
        if (isUserExists) {
            return new Response('Email already exist!', {status: 403});
        }
        const new_payload = {
            data: {
                name, email, password
            }
        }
        const summary_data = {
            common: {
                Name: name, Email: email
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
        return new Response({dualAuth}, {status: 200});
    } catch (err) {
        console.log(err);
        return new Response('Something went wrong', {status: 500});
    }
}