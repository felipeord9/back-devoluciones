"use strict";

const { RETURN_TABLE, ReturnSchema} = require('../models/returnModel')
const { RETURN_PRODUCT_TABLE, ReturnProductSchema} = require('../models/return-productModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(RETURN_TABLE, ReturnSchema)
    await queryInterface.createTable(RETURN_PRODUCT_TABLE, ReturnProductSchema)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(RETURN_TABLE)
    await queryInterface.dropTable(RETURN_PRODUCT_TABLE)
  },
};
