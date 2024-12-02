import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

const User = sequelize.define(
    'User',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email_verified_at: {
        type: DataTypes.DATE,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      attempts_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      password_changed_at: {
        type: DataTypes.DATE,
      },
      is_ldap_user: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      login_time: {
        type: DataTypes.DATE,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP")
      },
    },
    {
      // Other model options go here
    },
  );

  export default User;