class FormsEnum {
    static USER_MANAGEMENT = {
        value: "user-management", label: "User Management",
    }
    static ROLE_MANAGEMENT = {
        value: "role-management", label: "Role Management",
    }
    static DUAL_AUTH_SETTINGS_MANAGEMENT = {
        value: "dual-auth-settings-management", label: "Dual Auth Settings Management",
    }

    static isValid(form) {
        return [FormsEnum.USER_MANAGEMENT.value, FormsEnum.ROLE_MANAGEMENT.value, FormsEnum.DUAL_AUTH_SETTINGS_MANAGEMENT.value].includes(form);
    }
}

module.exports = FormsEnum;