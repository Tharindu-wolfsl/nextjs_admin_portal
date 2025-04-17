const PermissionCategory = require("../enums/PermissionCategory");

class PermissionsEnum {

    //-------------User Management---------------
    static VIEW_USER = {
        value: "view-users",
        label: "View User",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static CREATE_USER = {
        value: "create-users",
        label: "Create User",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static UPDATE_USER = {
        value: "update-users",
        label: "Update User",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static DELETE_USER = {
        value: "delete-users",
        label: "Delete User",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static APPROVE_CREATE_USER = {
        value: "approve-create-users",
        label: "Approve Create users",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static APPROVE_UPDATE_USER = {
        value: "approve-update-users",
        label: "Approve Update User",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };
    static APPROVE_DELETE_USER = {
        value: "approve-delete-users",
        label: "Approve Delete users",
        category: PermissionCategory.USER_MANAGEMENT.value,
    };

    //-------------Role Management---------------
    static VIEW_ROLE = {
        value: "view-role",
        label: "View Role",
        category: PermissionCategory.ROLE_MANAGEMENT.value,
    };
    static CREATE_ROLE = {
        value: "create-role",
        label: "Create Role",
        category: PermissionCategory.ROLE_MANAGEMENT.value,
    };
    static UPDATE_ROLE = {
        value: "update-role",
        label: "Update Role",
        category: PermissionCategory.ROLE_MANAGEMENT.value,
    };
    static DELETE_ROLE = {
        value: "delete-role",
        label: "Delete Role",
        category: PermissionCategory.ROLE_MANAGEMENT.value,
    };
    static APPROVE_CREATE_ROLE = {
        value: "approve-create-role",
        label: "Approve Create Role",
        category: PermissionCategory.ROLE_MANAGEMENT.value,
    };
    static APPROVE_UPDATE_ROLE = {
        value: "approve-update-role",
        label: "Approve Update Role",
        category: PermissionCategory.ROLE_MANAGEMENT.value,
    };
    static APPROVE_DELETE_ROLE = {
        value: "approve-delete-role",
        label: "Approve Delete Role",
        category: PermissionCategory.ROLE_MANAGEMENT.value,
    };

    //-------------Portal Management---------------
    static VIEW_DUAL_AUTH_SETTINGS = {
        value: "view-dual-auth-settings",
        label: "View Dual Auth Settings",
        category: PermissionCategory.PORTAL_MANAGEMENT.value,
    };

    static UPDATE_DUAL_AUTH_SETTINGS = {
        value: "update-dual-auth-settings",
        label: "Update Dual Auth Settings",
        category: PermissionCategory.PORTAL_MANAGEMENT.value,
    };


    static isValid(permission) {
        return [
            PermissionsEnum.VIEW_USER.value,
            PermissionsEnum.CREATE_USER.value,
            PermissionsEnum.UPDATE_USER.value,
            PermissionsEnum.DELETE_USER.value,
            PermissionsEnum.APPROVE_CREATE_USER.value,
            PermissionsEnum.APPROVE_UPDATE_USER.value,
            PermissionsEnum.APPROVE_DELETE_USER.value,
            PermissionsEnum.VIEW_ROLE.value,
            PermissionsEnum.CREATE_ROLE.value,
            PermissionsEnum.UPDATE_ROLE.value,
            PermissionsEnum.DELETE_ROLE.value,
            PermissionsEnum.APPROVE_CREATE_ROLE.value,
            PermissionsEnum.APPROVE_UPDATE_ROLE.value,
            PermissionsEnum.APPROVE_DELETE_ROLE.value,
            PermissionsEnum.VIEW_DUAL_AUTH_SETTINGS.value,
            PermissionsEnum.UPDATE_DUAL_AUTH_SETTINGS.value,
        ]
            .includes(permission);
    }
}

module.exports=PermissionsEnum;