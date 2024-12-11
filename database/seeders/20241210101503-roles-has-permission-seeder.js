'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const role_permission = [{
      id:1, role_id: 1, permission_id: 0, created_at: new Date(), updated_at: new Date()
    }]
    await queryInterface.bulkInsert('role_has_permissions', role_permission);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_has_permissions', null,  {truncate:true});
  }
};
