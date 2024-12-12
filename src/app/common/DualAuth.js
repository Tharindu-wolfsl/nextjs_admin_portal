import FormDualAuth from "../models/FormDualAuth";
import SubmitMethodsEnum from "../enums/SubmitMethodsEnum";
import {getMaxId} from "../utils/helper";

class DualAuth {
    constructor(values) {
        Object.assign(this, {...values});
    }

    async create() {
        return await FormDualAuth.create(this);
    }

    async action(status) {
        try {
            let response = [];
            const DualAuth = await FormDualAuth.findByPk(this.id);
            let payload = DualAuth.new_payload ? JSON.parse(DualAuth.new_payload).data : {};
            const id = DualAuth.new_payload && JSON.parse(DualAuth.new_payload).id ? JSON.parse(DualAuth.new_payload).id : null;
            const {default: Model} = await import(`../models/${DualAuth.model_type}`)
            if (status === 'APPROVED') {
                if (DualAuth.model_type !== '') {
                    switch (DualAuth.method) {
                        case SubmitMethodsEnum.CREATE.value :
                            const payload_data = {id: await getMaxId(DualAuth.model_type), ...payload};
                            await Model.create(payload_data);
                            await this.update_status(DualAuth, status)
                            break;
                        case SubmitMethodsEnum.UPDATE.value :
                            let UpdateModel = await Model.findByPk(id);
                            UpdateModel.set(payload);
                            await UpdateModel.save();
                            await this.update_status(DualAuth, status)
                            break;
                        case SubmitMethodsEnum.DELETE.value :
                            let DeleteModel = await Model.findByPk(id);
                            await DeleteModel.destroy();
                            await this.update_status(DualAuth, status)
                            break;
                        default:
                            return false;
                    }
                }
            } else if (status === 'REJECTED') {
                await this.update_status(DualAuth, status)
            }
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async update_status(DualAuth, status) {
        DualAuth.set({
            status, approved_by: 1, approved_at: Date.now()
        });
        await DualAuth.save();
    }
}

export default DualAuth;
