import {Model, DataTypes} from "sequelize";
import sequelize from "../db.ts";
import UserRole from "./UserRole";
import {getMaxId} from "../utils/helper";

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER, autoIncrement: false, primaryKey: true
    }, name: {
        type: DataTypes.STRING, allowNull: false
    }, email: {
        type: DataTypes.STRING, allowNull: false, unique: true
    }, email_verified_at: {
        type: DataTypes.DATE,
    }, password: {
        type: DataTypes.STRING, allowNull: false
    }, attempts_count: {
        type: DataTypes.INTEGER, allowNull: false, defaultValue: 0,
    }, status: {
        type: DataTypes.BOOLEAN, defaultValue: true
    }, password_changed_at: {
        type: DataTypes.DATE,
    }, is_ldap_user: {
        type: DataTypes.BOOLEAN, defaultValue: false
    }, login_time: {
        type: DataTypes.DATE,
    }
}, {
    tableName: "users", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);

UserRole.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

User.afterCreate(async (user, options) => {
    try {
        const roles = JSON.parse(user.roles) || []; // Parse permissions from the role
        if (roles.length > 0) {
            for (const role of roles) {
                const newId = await getMaxId('UserRole');
                await UserRole.create(
                    {
                        id: newId,
                        user_id: user.id,
                        role_id: role,
                    },
                    { transaction: options.transaction }
                );
            }
        }
    } catch (error) {
        console.error('Error creating User Role entries:', error);
        throw error; // Rethrow error to ensure proper transaction rollback if necessary
    }
});

export default User;