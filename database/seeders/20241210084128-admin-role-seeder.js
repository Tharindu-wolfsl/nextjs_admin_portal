'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const id = 1;
        const existingRole = await queryInterface.rawSelect('roles', {
            where: {id: 1},
        }, ['id']);

        const adminRole = {
            id: 1, name: 'admin', role_permission: 0, updated_at: new Date()
        };

        if (existingRole) {
            // Update only the `updated_at` field
            await queryInterface.bulkUpdate('roles', {updated_at: adminRole.updated_at}, {id: id});
        } else {
            // Insert a new admin user
            await queryInterface.bulkInsert('roles', [{...adminRole, created_at: new Date()}]);
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', {id: 1}, {});
    }
};
