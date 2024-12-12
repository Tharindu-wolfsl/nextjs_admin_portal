export const getMaxId = async (model_type) => {
    try {
        const { default: Model} = await import(`../../app/models/${model_type}`)
        let maxId = await Model.max('id');
        console.log('maxId', typeof maxId, maxId);
        if(maxId) {
            return ++maxId;
        }
        return 1;
    } catch (e) {
        console.log('------------',e.message,'-------------');
        return false;
    }
}