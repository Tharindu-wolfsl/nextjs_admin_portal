import {Model, DataTypes} from "sequelize";
import sequelize from "../db.ts";
import Role from "./Role";

const RoleHasPermission = sequelize.define('RoleHasPermission', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER, autoIncrement: false, primaryKey: true
    }, role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles', // Matches the table name of the Role model
            key: 'id',
        },
    }, permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "role_has_permissions", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);

// Role.hasMany(RoleHasPermission, { foreignKey: 'role_id', as: 'permissions' });

export default RoleHasPermission;