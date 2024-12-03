'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('role_has_permissions', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true
            }, role_id: {
                type: Sequelize.INTEGER, references: {
                    model: 'roles', key: 'id'
                }
            }, permission_id: {
                type: Sequelize.INTEGER, references: {
                    model: 'permissions', key: 'id'
                }
            }, created_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }, updated_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
        });
    }, async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('role_has_permissions');
    }
};
