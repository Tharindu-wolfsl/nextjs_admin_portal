import User from "../../../models/User";
import DualAuth from "@/app/common/dual_auth/DualAuth";
import {FormNames}  from "../../../enums/FormNames";
export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        // const password = formData.get('password');

        const isUserExists = await User.findOne({where:{email}});
        if (isUserExists) {
            return new Response('Email already exist!', {status: 403});
        }
        console.log('----------------------------------',name, email, password);
        // const user = await User.create({name, email, password});
        const dualAuth =  new DualAuth({FormNames.USER_MANAGEMENT});
        return new Response({user}, {status: 200});
    } catch (err) {
        console.log(err);
        return new Response('Something went wrong', {status: 500});
    }
}