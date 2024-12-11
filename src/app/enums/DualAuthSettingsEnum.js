class DualAuthSettingsEnum {
    static CREATE_USER = {
        value: "user-management",
        label: "User Management",
    }
    static UPDATE_USER = {
        value: "role-management",
        label: "Role Management",
    }

    static isValid(category) {
        return [DualAuthSettingsEnum.CREATE_USER.value, DualAuthSettingsEnum.UPDATE_USER.value].includes(category);
    }
}

module.exports = DualAuthSettingsEnum;