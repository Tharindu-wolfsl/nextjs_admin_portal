

class UserPermission {
    constructor(permission, userId) {
        this.permission = permission;
        this.userId = userId;
    }
    async isPermissionGranted() {

        //Get users role
        // $role =  await RolesHas
    }
}

export default UserPermission;