import {Model, DataTypes} from "sequelize";
import sequelize from "../db.ts";

const FormDualAuth = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    }, form_name: {
        type: DataTypes.STRING,
    }, method: {
        type: DataTypes.STRING,
    }, model_type: {
        type: DataTypes.STRING,
    }, repository_type: {
        type: DataTypes.STRING,
    }, new_payload: {
        type: DataTypes.STRING,
    }, old_payload: {
        type: DataTypes.STRING,
    }, summary: {
        type: DataTypes.STRING,
    }, permission: {
        type: DataTypes.STRING,
    }, created_by: {
        type: DataTypes.STRING,
    }, approved_by: {
        type: DataTypes.STRING,
    }, status: {
        type: DataTypes.BOOLEAN, defaultValue: true
    }, approved_at: {
        type: DataTypes.DATE,
    }
}, {
    tableName: "form_dual_auths", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);


export default FormDualAuth;