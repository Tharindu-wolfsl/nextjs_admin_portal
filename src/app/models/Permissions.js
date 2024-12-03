import {Model, DataTypes} from "sequelize";
import sequelize from "../db.ts";

const Permission = sequelize.define('Permission', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    }, name: {
        type: DataTypes.STRING, allowNull: false
    }, value: {
        type: DataTypes.STRING, unique: true
    }, category: {
        type: DataTypes.STRING,
    }
}, {
    tableName: "permissions", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);


export default Permission;