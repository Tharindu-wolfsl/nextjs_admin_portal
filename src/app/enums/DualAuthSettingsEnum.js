class DualAuthSettingsEnum {
    static UPDATE_DUAL_AUTH = {
        value: 1,
        label: "Update Dual Auth",
    }
    static CREATE_USER = {
        value: 2,
        label: "Create User",
    }
    static EDIT_USER = {
        value: 3,
        label: "Edit User",
    }
    static REMOVE_USER = {
        value: 4,
        label: "Remove User",
    }
    static CREATE_USER_ROLE = {
        value: 5,
        label: "Create User Role",
    }
    static EDIT_USER_ROLE = {
        value: 6,
        label: "Edit User Role",
    }
    static REMOVE_USER_ROLE = {
        value: 7,
        label: "Remove User Role",
    }

    static isValid(category) {
        return [
            DualAuthSettingsEnum.UPDATE_DUAL_AUTH.value,
            DualAuthSettingsEnum.CREATE_USER.value,
            DualAuthSettingsEnum.EDIT_USER.value,
            DualAuthSettingsEnum.REMOVE_USER.value,
            DualAuthSettingsEnum.CREATE_USER_ROLE.value,
            DualAuthSettingsEnum.EDIT_USER_ROLE.value,
            DualAuthSettingsEnum.REMOVE_USER_ROLE.value,
        ].includes(category);
    }
}

module.exports = DualAuthSettingsEnum;