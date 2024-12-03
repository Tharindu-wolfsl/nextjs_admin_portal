'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('dual_auth_settings', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true
            }, feature_name: {
                type: Sequelize.STRING,
            }, status: {
                type: Sequelize.BOOLEAN, defaultValue: false
            }, created_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }, updated_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('dual_auth_settings');
    }
};
