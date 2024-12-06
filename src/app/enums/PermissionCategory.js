class PermissionCategory {
    static USER_MANAGEMENT = {
        value: "user-management",
        label: "User Management",
    }

    static isValid(category) {
        return [PermissionCategory.USER_MANAGEMENT.value].includes(category);
    }
}

module.exports = PermissionCategory;