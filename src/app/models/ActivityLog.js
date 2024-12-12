import {Model, DataTypes, where} from "sequelize";
import sequelize from "../db.ts";

const ActivityLog = sequelize.define('ActivityLog', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true
    }, user_name: {
        type: DataTypes.STRING, allowNull: false
    }, affected_module: {
        type: DataTypes.STRING, allowNull: false
    }, action: {
        type: DataTypes.STRING, allowNull: false
    }, affected_app_user: {
        type: DataTypes.STRING
    }, previous_value: {
        type: DataTypes.STRING
    }, new_value: {
        type: DataTypes.STRING
    }, link_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "activity_logs", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);


export default ActivityLog;