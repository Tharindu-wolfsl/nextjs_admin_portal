import ActivityLog from "../models/ActivityLog";

class ActivityLogger {
    constructor(values) {
        Object.assign(this, {...values});
    }

    async save() {
        return await ActivityLog.create(this);
    }
}

export default ActivityLogger;
