'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true
            }, name: {
                type: Sequelize.STRING, allowNull: false
            }, email: {
                type: Sequelize.STRING, allowNull: false, unique: true
            }, email_verified_at: {
                type: Sequelize.DATE,
            }, password: {
                type: Sequelize.STRING, allowNull: false
            }, attempts_count: {
                type: Sequelize.INTEGER, allowNull: false, defaultValue: 0,
            }, status: {
                type: Sequelize.BOOLEAN, defaultValue: true
            }, password_changed_at: {
                type: Sequelize.DATE,
            }, is_ldap_user: {
                type: Sequelize.BOOLEAN, defaultValue: false
            }, login_time: {
                type: Sequelize.DATE,
            }, created_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }, updated_at: {
                type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
        });
    }, async down(queryInterface, Sequelize) {

        await queryInterface.dropTable('users');
    }
};
