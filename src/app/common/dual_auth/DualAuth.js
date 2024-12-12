import FormDualAuth from "../../models/FormDualAuth";
import Models from "../../common/Models";
import SubmitMethodsEnum from "../../enums/SubmitMethodsEnum";
import {getMaxId} from "../../utils/helper";

class DualAuth {
    constructor({
                    id,
                    form_name,
                    method,
                    model_type,
                    repository_type,
                    new_payload,
                    old_payload,
                    summary,
                    summary_data,
                    permission,
                    created_by,
                    approved_by,
                    status,
                    approved_at
                }) {
        Object.assign(this, {
            id,
            form_name,
            method,
            model_type,
            repository_type,
            new_payload,
            old_payload,
            summary,
            summary_data,
            permission,
            created_by,
            approved_by,
            status,
            approved_at,
        });
    }

    async create() {
        return await FormDualAuth.create({
            form_name: this.form_name,
            method: this.method,
            model_type: this.model_type,
            repository_type: this.repository_type,
            new_payload: this.new_payload,
            old_payload: this.old_payload,
            summary_data: this.summary_data,
            summary: this.summary,
            permission: this.permission,
            created_by: this.created_by,
            approved_by: this.approved_by,
            status: this.status,
            approved_at: this.approved_at,
        });
    }

    async action(status) {
        try {
            let response = [];
            const DualAuth = await FormDualAuth.findByPk(this.id);
            let payload = DualAuth.new_payload ? JSON.parse(DualAuth.new_payload).data : {};
            console.log('payload--------------------',payload);
            const id = DualAuth.new_payload &&  JSON.parse(DualAuth.new_payload).id ? JSON.parse(DualAuth.new_payload).id : null;
            console.log(Models)
            const Model = Models[DualAuth.model_type];
            if (status === 'APPROVED') {
                if (DualAuth.model_type !== '') {
                    switch (DualAuth.method) {
                        case SubmitMethodsEnum.CREATE.value :
                            const payload_data = {id:await getMaxId(DualAuth.model_type), ...payload};
                            console.log('#########################payload_data', payload_data);
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

    async update_status(DualAuth, status)
    {
        DualAuth.set({
            status, approved_by: 1, approved_at: Date.now()
        });
        await DualAuth.save();
    }
}

export default DualAuth;
