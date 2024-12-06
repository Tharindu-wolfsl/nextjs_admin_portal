import DualAuth from "../../../../common/dual_auth/DualAuth";
import FormDualAuth from "../../../../models/FormDualAuth";

export const PUT = async (request, {params}) => {
    try {
        const formData = await request.formData();
        const {id} = await params;
        const action_status = formData.get('status');
        const isExists = await FormDualAuth.findByPk(id);
        if(!isExists) {
            return new Response('Record not found!', {status: 500});
        }
        const response = await new DualAuth({id}).action(action_status)
        return new Response(response, {status: 200});
    } catch (err) {
        return new Response(err, {status: 500});
    }
}