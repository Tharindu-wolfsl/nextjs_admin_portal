'use strict';
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [{
            name: 'admin',
            email: 'admin@admin.com',
            password: await bcrypt.hashSync(process.env.DEFAULT_USER_PW, Number(process.env.SALT_ROUNDS)),
            status: true,
            created_at: new Date(),
            updated_at: new Date()
        }]
        await queryInterface.bulkInsert('users', [...users], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};
