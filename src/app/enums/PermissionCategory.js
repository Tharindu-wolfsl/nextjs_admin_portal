class PermissionCategory {
    static USER_MANAGEMENT = {
        value: "users-management",
        label: "User Management",
    }
    static ROLE_MANAGEMENT = {
        value: "role-management",
        label: "Role Management",
    }
    static PORTAL_MANAGEMENT = {
        value: "portal-management",
        label: "Portal Management",
    }

    static isValid(category) {
        return [PermissionCategory.USER_MANAGEMENT.value, PermissionCategory.ROLE_MANAGEMENT.value, PermissionCategory.PORTAL_MANAGEMENT.value].includes(category);
    }
}

module.exports = PermissionCategory;