'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const role = [{
            id:1, name: 'admin', role_permission: 0, created_at: new Date(), updated_at: new Date()
        }]
        await queryInterface.bulkInsert('roles', role);
    }, async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    }
};
