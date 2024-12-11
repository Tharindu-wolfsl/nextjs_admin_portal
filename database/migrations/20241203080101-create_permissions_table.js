'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('permissions', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED, autoIncrement: false, primaryKey: true
            }, name: {
                type: Sequelize.STRING, allowNull: false
            }, value: {
                type: Sequelize.STRING, unique: true
            }, category: {
                type: Sequelize.STRING,
            }, created_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }, updated_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
        });
    }, async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('permissions');
    }
};
