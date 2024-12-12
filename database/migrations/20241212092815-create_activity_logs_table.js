'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('activity_logs', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true
            }, user_name: {
                type: Sequelize.STRING, allowNull: false
            }, affected_module: {
                type: Sequelize.STRING, allowNull: false
            }, action: {
                type: Sequelize.STRING, allowNull: false
            }, affected_app_user: {
                type: Sequelize.STRING
            }, previous_value: {
                type: Sequelize.STRING
            }, new_value: {
                type: Sequelize.STRING
            }, link_id: {
                type: Sequelize.INTEGER
            }, created_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }, updated_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('activity_logs');

    }
};
