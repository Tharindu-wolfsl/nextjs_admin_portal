const PermissionCategory = require("../enums/PermissionCategory");

class PermissionsEnum {
    static VIEW_USER = {
        value: "view-user",
        label: "View User",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static CREATE_USER = {
        value: "create-user",
        label: "Create User",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static UPDATE_USER = {
        value: "update-user",
        label: "Update User",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static DELETE_USER = {
        value: "delete-user",
        label: "Delete User",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static APPROVE_CREATE_USER = {
        value: "approve-create-user",
        label: "Approve Create user",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static APPROVE_UPDATE_USER = {
        value: "approve-update-user",
        label: "Approve Update User",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static APPROVE_DELETE_USER = {
        value: "approve-delete-user",
        label: "Approve Delete user",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };

    static isValid(permission) {
        return [
            PermissionsEnum.VIEW_USER.value,
            PermissionsEnum.CREATE_USER.value,
            PermissionsEnum.UPDATE_USER.value,
            PermissionsEnum.DELETE_USER.value,
            PermissionsEnum.APPROVE_CREATE_USER.value,
            PermissionsEnum.APPROVE_UPDATE_USER.value,
            PermissionsEnum.APPROVE_DELETE_USER.value]
            .includes(permission);
    }
}

module.exports=PermissionsEnum;