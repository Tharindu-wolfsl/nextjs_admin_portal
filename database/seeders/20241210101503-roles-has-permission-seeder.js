'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const id = 1;
    const existingRole = await queryInterface.rawSelect(
        'role_has_permissions',
        {
          where: { id: 1 },
        },
        ['id']
    );

    const adminRole = {
      id:1, role_id: 1, permission_id: 0, updated_at: new Date()
    };

    if (existingRole) {
      // Update only the `updated_at` field
      await queryInterface.bulkUpdate(
          'role_has_permissions',
          { updated_at: adminRole.updated_at },
          { id: id }
      );
    } else {
      // Insert a new admin user
      await queryInterface.bulkInsert('role_has_permissions', [
        { ...adminRole, created_at: new Date() }
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role_has_permissions', { id: 1 }, {});
  }
};
