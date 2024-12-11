class PermissionCategory {
    static CREATE_USER = {
        value: "user-management",
        label: "User Management",
    }
    static UPDATE_USER = {
        value: "role-management",
        label: "Role Management",
    }

    static isValid(category) {
        return [PermissionCategory.USER_MANAGEMENT.value, PermissionCategory.ROLE_MANAGEMENT.value].includes(category);
    }
}

module.exports = PermissionCategory;