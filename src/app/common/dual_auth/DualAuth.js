import FormDualAuth from "../../models/FormDualAuth";

class DualAuth {
    constructor({form_name, method, model_type, repository_type, new_payload,old_payload, summary, summary_data, permission, created_by, approved_by, status, approved_at}) {
        Object.assign(this, {
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
}

export default DualAuth;
