'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const id = 1;
    const existingRole = await queryInterface.rawSelect(
        'user_roles',
        {
          where: { id: 1 },
        },
        ['id']
    );

    const adminRole = {
      id:1, role_id: 1, user_id: 1, created_at: new Date(), updated_at: new Date()
    };

    if (existingRole) {
      // Update only the `updated_at` field
      await queryInterface.bulkUpdate(
          'user_roles',
          { updated_at: adminRole.updated_at },
          { id: id }
      );
    } else {
      // Insert a new admin user
      await queryInterface.bulkInsert('user_roles', [
        { ...adminRole, created_at: new Date() }
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_roles', { id: 1 }, {});
  }
};
