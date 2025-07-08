"use strict";

const { PRODUCT_TABLE, ProductSchema } = require("../models/productModel");
const { AGENCY_TABLE, AgencySchema } = require("../models/agencyModel");
const { CLIENT_TABLE, ClientSchema } = require("../models/clientModel");
const { SELLER_TABLE, SellerSchema } = require("../models/sellerModel");
const { BRANCH_TABLE, BranchSchema} = require('../models/branchModel')
const { RETURN_TABLE, ReturnSchema} = require('../models/returnModel')
const { RETURN_PRODUCT_TABLE, ReturnProductSchema} = require('../models/return-productModel')
const { USER_TABLE, UserSchema } = require('../models/userModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(AGENCY_TABLE, AgencySchema);
    await queryInterface.createTable(CLIENT_TABLE, ClientSchema);
    await queryInterface.createTable(SELLER_TABLE, SellerSchema)
    await queryInterface.createTable(BRANCH_TABLE, BranchSchema)
    await queryInterface.createTable(RETURN_TABLE, ReturnSchema)
    await queryInterface.createTable(RETURN_PRODUCT_TABLE, ReturnProductSchema)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(AGENCY_TABLE);
    await queryInterface.dropTable(CLIENT_TABLE);
    await queryInterface.dropTable(SELLER_TABLE)
    await queryInterface.dropTable(BRANCH_TABLE)
    await queryInterface.dropTable(RETURN_TABLE)
    await queryInterface.dropTable(RETURN_PRODUCT_TABLE)
  },
};
