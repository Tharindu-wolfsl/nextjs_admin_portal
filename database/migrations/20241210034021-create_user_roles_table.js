'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_roles', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED, autoIncrement: false, primaryKey: true
            }, role_id: {
                type: Sequelize.INTEGER, references: {
                    model: 'roles', key: 'id'
                }
            }, user_id: {
                type: Sequelize.INTEGER, references: {
                    model: 'users', key: 'id'
                }
            }, created_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }, updated_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_roles');
    }
};
