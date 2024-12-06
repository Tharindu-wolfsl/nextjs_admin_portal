import FormDualAuth from "../../models/FormDualAuth";
import Models from "../../common/Models";

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
            const Model = Models[DualAuth.model_type];
            if (status === 'APPROVED') {
                if (DualAuth.model_type !== '') {
                    const response = await Model.create(payload);
                    if (response) {
                        DualAuth.set({
                            status, approved_by: 1, approved_at: Date.now()
                        });
                        await DualAuth.save();
                    } else {
                        return false;
                    }
                }
            } else if (status === 'REJECTED') {
                DualAuth.set({
                    status,
                });
                await DualAuth.save();
            }
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}

export default DualAuth;
