import {Model, DataTypes} from "sequelize";
import sequelize from "../db.ts";

const RoleHasPermission = sequelize.define('RoleHasPermission', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    }, role_id: {
        type: DataTypes.INTEGER
    }, permission_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "role_has_permissions", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);


export default RoleHasPermission;