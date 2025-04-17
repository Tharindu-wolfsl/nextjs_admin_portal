import User from "../../../models/User";
import DualAuth from "../../../common/DualAuth";
import FormsEnum from "../../../enums/FormsEnum";
import SubmitMethodsEnum from "../../../enums/SubmitMethodsEnum";
import PermissionsEnum from "../../../enums/PermissionsEnum";
import GenerateHash from "../../../utils/GenerateHash";
import ActivityLogger from "../../../common/ActivityLogger";

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
        await new ActivityLogger({
            user_name: 'admin@admin.com',
            affected_module: FormsEnum.USER_MANAGEMENT.label,
            action: PermissionsEnum.CREATE_USER.label,
            new_value: JSON.stringify(summary_data['common']),
            link_id: dualAuth.id
        }).save();
        return new Response(JSON.stringify({message:'Success!', data:dualAuth}), {status: 200});
    } catch (err) {
        return new Response(JSON.stringify({message:'Something went wrong!', error: err}), {status: 500});
    }
}

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);

        const page = parseInt(searchParams.get("_page") || "1");
        const limit = parseInt(searchParams.get("_limit") || "10");
        const offset = (page - 1) * limit;
        const sortField = searchParams.get("_sort") || "id";
        const order = searchParams.get("_order") === "desc" ? "DESC" : "ASC";

        // Handle selected fields like ?fields=name,email
        const fields = searchParams.get("_fields");
        const attributes = fields ? fields.split(",") : ['id', 'name', 'email','status', 'created_at', 'updated_at'];

        // List of filterable columns (you can add more if needed)
        const filterableFields = ["id", "name", "email", "status", "created_at", "updated_at"];

        const where = {};

        filterableFields.forEach((field) => {
            const value = searchParams.get(field);
            if (value !== null) {
                where[field] = value;
            }
        });


        const total = await User.count({ where });

        const data = await User.findAll({
            attributes,
            where,
            limit,
            offset,
            order: [[sortField, order]], // You can also allow sorting by other fields if needed
        });

        const response =  new Response(JSON.stringify({ message: "success", data }), {
            status: 200,
        });

        // Set x-total-count header
        response.headers.set("x-total-count", total.toString());

        return response;

    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(
            JSON.stringify({ message: "Something went wrong!", error }),
            { status: 500 }
        );
    }
};