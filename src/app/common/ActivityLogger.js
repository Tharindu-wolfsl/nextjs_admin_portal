import ActivityLog from "../models/ActivityLog";

class ActivityLogger {
    constructor({
                    user_name, affected_module, action, affected_app_user, previous_value, new_value, link_id,
                }) {
        Object.assign(this, {
            user_name, affected_module, action, affected_app_user, previous_value, new_value, link_id
        });
    }

    async save() {
        return await ActivityLog.create(this);
    }
}

export default ActivityLogger;
