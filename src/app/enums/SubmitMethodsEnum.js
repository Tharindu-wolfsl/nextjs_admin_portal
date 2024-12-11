class SubmitMethodsEnum {
    static CREATE = {
        value: "CREATE",
        label: "Create",
    };
    static UPDATE = {
        value: "UPDATE",
        label: "Update",
    };
    static DELETE = {
        value: "DELETE",
        label: "Delete",
    };

    static isValid(method) {
        return [SubmitMethodsEnum.CREATE.value, SubmitMethodsEnum.UPDATE.value, SubmitMethodsEnum.DELETE.value].includes(method);
    }
}
module.exports = SubmitMethodsEnum;