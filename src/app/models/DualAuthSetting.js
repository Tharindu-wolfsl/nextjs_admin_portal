import {Model, DataTypes} from "sequelize";
import sequelize from "../db.ts";

const DualAuthSetting = sequelize.define('DualAuthSetting', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    }, feature_name: {
        type: DataTypes.STRING,
    }, status: {
        type: DataTypes.BOOLEAN, defaultValue: false
    },
}, {
    tableName: "dual_auth_settings", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);


export default DualAuthSetting;