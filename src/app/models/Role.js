import {Model, DataTypes} from "sequelize";
import sequelize from "../db.ts";
import RoleHasPermission from "./RoleHasPermission";
import {getMaxId} from "../utils/helper";

const Role = sequelize.define('Role', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER, autoIncrement: false, primaryKey: true
    }, name: {
        type: DataTypes.STRING, allowNull: false
    }, role_permission: {
        type: DataTypes.STRING, allowNull: false
    }, created_by: {
        type: DataTypes.STRING,
    }
}, {
    tableName: "roles", sequelize, createdAt: "created_at", updatedAt: "updated_at"
    // Other model options go here
},);

RoleHasPermission.belongsTo(Role, {foreignKey: 'role_id', as: 'role'});

Role.afterCreate(async (role, options) => {
    try {
        const permissions = JSON.parse(role.role_permission) || []; // Parse permissions from the role
        if (permissions.length > 0) {
            for (const permission of permissions) {
                const newId = await getMaxId('RoleHasPermission');
                await RoleHasPermission.create(
                    {
                        id: newId,
                        permission_id: permission,
                        role_id: role.id,
                    },
                    { transaction: options.transaction }
                );
            }
        }
    } catch (error) {
        console.error('Error creating RoleHasPermission entries:', error);
        throw error; // Rethrow error to ensure proper transaction rollback if necessary
    }
});

Role.afterUpdate(async (role, options) => {
    try {
        const permissions = JSON.parse(role.role_permission) || []; // Parse permissions from the role
        if (permissions.length > 0) {
            let payload = [];
            await RoleHasPermission.destroy({where:{
                    role_id: role.id,
                }});
            for (const permission of permissions) {
                const newId = await getMaxId('RoleHasPermission');
                await RoleHasPermission.create(
                    {
                        id: newId,
                        permission_id: permission,
                        role_id: role.id,
                    },
                    { transaction: options.transaction }
                );
            }
        }
    } catch (error) {
        console.error('Error Updating  Role Permission  entries:', error);
        throw error; // Rethrow error to ensure proper transaction rollback if necessary
    }
});

Role.beforeDestroy(async (role, options) => {
    try {
        let payload = [];
        await RoleHasPermission.destroy({
            where: {
                role_id: role.id,
            }
        });
    } catch (error) {
        console.error('Error Deleting  Role Permission entries:', error);
        throw error; // Rethrow error to ensure proper transaction rollback if necessary
    }
});

export default Role;