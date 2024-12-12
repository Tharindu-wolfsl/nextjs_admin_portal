import User from "../../../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const POST = async (request) => {
    try {
        const reqBody = await request.formData();
        const name = reqBody.get("name");
        const email = reqBody.get("email");
        const password = reqBody.get("password");
        const user = await User.findOne({ where: { email } });


        if (user ) {
            const token = jwt.sign({ userId: user.id}, JWT_SECRET, { expiresIn: '30min' });

            return new Response(
                JSON.stringify({ message: "User already exists", token }),{
                    status: 200,
                    headers: {
                        "Set-Cookie": `authToken=${token}; HttpOnly; Path=/; Max-Age=1800`,
                        "Content-Type": "application/json",
                    },
                });
        }


    } catch (err) {
        console.error(err);
        return new Response('Something went wrong', { status: 500 });
    }

};
