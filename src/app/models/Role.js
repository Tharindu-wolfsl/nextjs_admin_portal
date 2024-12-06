import {Model, DataTypes} from "sequelize";
import sequelize from "../db.ts";

const Role = sequelize.define('Role', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    }, name: {
        type: DataTypes.STRING, allowNull: false
    }, role_permission: {
        type: DataTypes.STRING, allowNull: false, unique: true
    }, created_by: {
        type: DataTypes.STRING,
    }
}, {
    tableName: "roles", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);

export default Role;