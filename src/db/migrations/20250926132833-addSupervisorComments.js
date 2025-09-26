'use strict';
const { RETURN_TABLE, ReturnSchema } = require('../models/returnModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(RETURN_TABLE, 'supervisor_comments', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    //
  }
};
