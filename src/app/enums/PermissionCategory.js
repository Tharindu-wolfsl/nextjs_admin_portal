class PermissionCategory {
    static USER_MANAGEMENT = {
        value: "user-management",
        label: "User Management",
    }
    static ROLE_MANAGEMENT = {
        value: "role-management",
        label: "Role Management",
    }

    static isValid(category) {
        return [PermissionCategory.USER_MANAGEMENT.value, PermissionCategory.ROLE_MANAGEMENT.value].includes(category);
    }
}

module.exports = PermissionCategory;