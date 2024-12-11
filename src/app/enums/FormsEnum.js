class FormsEnum {
    static USER_MANAGEMENT = {
        value: "user-management", label: "User Management",
    }
    static ROLE_MANAGEMENT = {
        value: "role-management", label: "Role Management",
    }

    static isValid(form) {
        return [FormsEnum.USER_MANAGEMENT.value, FormsEnum.ROLE_MANAGEMENT.value].includes(form);
    }
}

module.exports = FormsEnum;