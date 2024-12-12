import DualAuthSetting from "../../../../models/DualAuthSetting";

export const GET = async () => {
    try {
        const data = await DualAuthSetting.findAll();
        return new Response(JSON.stringify({message: 'success', data}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: 'Something went wrong!', error: error}), {status: 500});
    }
}
