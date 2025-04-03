import DualAuth from "../../../../common/DualAuth";
import FormDualAuth from "../../../../models/FormDualAuth";

export const PUT = async (request, {params}) => {
    try {
        const formData = await request.formData();
        const {id} = await params;
        const action_status = formData.get('status');
        const isExists = await FormDualAuth.findByPk(id);
        if(!isExists) {
            return new Response(JSON.stringify({message:'Record not found!'}), {status: 404});
        }
        const response = await new DualAuth({id}).action(action_status)
        return new Response(JSON.stringify({message:'Success!', data: response}), {status: 200});
    } catch (err) {
        return new Response(JSON.stringify({message:'Something went wrong!', error: err}), {status: 500});
    }
}