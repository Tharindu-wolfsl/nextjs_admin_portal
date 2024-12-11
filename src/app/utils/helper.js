import Models from "../../app/common/Models";

export const getMaxId = async (model_type) => {
    try {
        const Model = Models[model_type];
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