'use strict';
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const adminEmail = 'admin@admin.com';
        const existingAdmin = await queryInterface.rawSelect(
            'users',
            {
                where: { email: adminEmail },
            },
            ['id']
        );

        const adminUser = {
            id:1,
            name: 'admin',
            email: adminEmail,
            password: bcrypt.hashSync(process.env.DEFAULT_USER_PW, Number(process.env.SALT_ROUNDS)),
            status: true,
            updated_at: new Date()
        };

        if (existingAdmin) {
            // Update only the `updated_at` field
            await queryInterface.bulkUpdate(
                'users',
                { updated_at: adminUser.updated_at },
                { email: adminEmail }
            );
        } else {
            // Insert a new admin users
            await queryInterface.bulkInsert('users', [
                { ...adminUser, created_at: new Date() }
            ]);
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', { email: 'admin@admin.com' }, {});
    }
};
