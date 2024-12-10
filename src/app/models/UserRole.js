import {Model, DataTypes} from "sequelize";
import sequelize from "../db.ts";

const UserRole = sequelize.define('UserRole', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    }, role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles', // Matches the table name of the Role model
            key: 'id',
        },
    }, user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Matches the table name of the Role model
            key: 'id',
        },
    }
}, {
    tableName: "user_roles", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);


export default UserRole;