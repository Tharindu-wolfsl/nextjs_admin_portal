'use strict';
/** @type {PermissionsEnum|{}} */
const PermissionsEnum = require(`../../src/app/enums/PermissionsEnum.js`);

module.exports = {
    async up(queryInterface, Sequelize) {

        const permissions = Object.values(PermissionsEnum).map(permission => ({
            name: permission.label, value: permission.value, category: permission.category,
        }));
        await queryInterface.bulkInsert('permissions', [...permissions], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('permissions', null, {});
    }
};
