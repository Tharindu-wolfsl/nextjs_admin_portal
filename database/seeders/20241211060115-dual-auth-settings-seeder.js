'use strict';
const DualAuthSettingsEnum = require(`../../src/app/enums/DualAuthSettingsEnum.js`);
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const settings = Object.values(DualAuthSettingsEnum).map((setting, index) => ({
      id:setting.value, feature_name: setting.label, status: true, created_at: new Date(), updated_at: new Date(),
    }));
    await queryInterface.bulkInsert('dual_auth_settings', [...settings], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dual_auth_settings', null, {truncate:true});
  }
};
