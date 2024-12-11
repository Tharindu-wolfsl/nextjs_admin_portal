import {Model, DataTypes} from "sequelize";
import sequelize from "../db.ts";
import RoleHasPermission from "./RoleHasPermission";

const Role = sequelize.define('Role', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    }, name: {
        type: DataTypes.STRING, allowNull: false
    }, role_permission: {
        type: DataTypes.STRING, allowNull: false
    }, created_by: {
        type: DataTypes.STRING,
    }
}, {
    tableName: "roles", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);

RoleHasPermission.belongsTo(Role, {foreignKey: 'role_id', as: 'role'});

Role.afterCreate(async (role, options) => {
    const permissions = JSON.parse(role.role_permission) || []; // Assume permissions are part of the payload
    if (permissions.length > 0) {
        const rolePermissions = permissions.map(permission => ({
            permission_id: permission, role_id: role.id,
        }));
        await RoleHasPermission.bulkCreate(rolePermissions, {transaction: options.transaction});
    }
});

export default Role;