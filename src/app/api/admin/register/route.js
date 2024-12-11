import User from "../../../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import {middleware} from "../../../middleware/middeware";
// import login from "../../../../../public/auth"


const JWT_SECRET = process.env.JWT_SECRET;

export const POST = async (request) => {
    try {
        const reqBody = await request.formData();
        const name = reqBody.get("name");
        const email = reqBody.get("email");
        const password = reqBody.get("password");
        // const user = await User.findOne({ where: { email } });

        // middleware(request);
        //
        // if (user ) {
        //     const token = jwt.sign({ userId: user.id}, JWT_SECRET, { expiresIn: '30min' });
        //
        //     return new Response(
        //         JSON.stringify({ message: "User already exists", token }),{
        //         status: 200,
        //             headers: {
        //                 "Set-Cookie": `authToken=${token}; HttpOnly; Path=/; Max-Age=1800`,
        //                 "Content-Type": "application/json",
        //             },
        //     });
        // }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return new Response('User registration success!', { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response('Something went wrong', { status: 500 });
    }

};
