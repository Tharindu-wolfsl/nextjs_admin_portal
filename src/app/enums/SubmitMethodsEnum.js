class SubmitMethodsEnum {
    static CREATE = {
        value: "create-user",
        label: "Create User",
    };
    static UPDATE = {
        value: "update-user",
        label: "Update User",
    };
    static DELETE = {
        value: "delete-user",
        label: "Delete User",
    };

    static isValid(method) {
        return [SubmitMethodsEnum.CREATE.value, SubmitMethodsEnum.UPDATE.value, SubmitMethodsEnum.DELETE.value].includes(method);
    }
}
module.exports = SubmitMethodsEnum;