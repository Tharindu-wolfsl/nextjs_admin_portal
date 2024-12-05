class FormsEnum {
    static USER_MANAGEMENT = {
        value: "user-management", label: "User Management",
    }

    static isValid(form) {
        return [FormsEnum.USER_MANAGEMENT.value].includes(form);
    }
}

module.exports = FormsEnum;