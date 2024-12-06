'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('form_dual_auths', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true
            }, form_name: {
                type: Sequelize.STRING,
            }, method: {
                type: Sequelize.STRING,
            }, model_type: {
                type: Sequelize.STRING,
            }, repository_type: {
                type: Sequelize.STRING,
            }, new_payload: {
                type: Sequelize.STRING,
            }, old_payload: {
                type: Sequelize.STRING,
            }, summary: {
                type: Sequelize.STRING,
            }, permission: {
                type: Sequelize.STRING,
            }, created_by: {
                type: Sequelize.STRING,
            }, approved_by: {
                type: Sequelize.STRING,
            }, status: {
                type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED'), defaultValue: 'PENDING',
            }, approved_at: {
                type: Sequelize.DATE,
            }, summary_data: {
                type: Sequelize.STRING,
            }, created_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }, updated_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('form_dual_auths');
    }


};
