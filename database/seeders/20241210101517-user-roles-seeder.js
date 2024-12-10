'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const user_role = [{
      role_id: 1, user_id: 1, created_at: new Date(), updated_at: new Date()
    }]
    await queryInterface.bulkInsert('user_roles', user_role);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {truncate:true});
  }
};
