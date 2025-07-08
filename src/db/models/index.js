const { User, UserSchema } = require('./userModel')
const { Product, ProductSchema } = require('./productModel')
const { Agency, AgencySchema } = require('./agencyModel')
const { Client, ClientSchema } = require('./clientModel')
const { Seller, SellerSchema } = require('./sellerModel')
const { Branch, BranchSchema } = require('./branchModel')
const { Return, ReturnSchema } = require('./returnModel')
const { ReturnProduct, ReturnProductSchema } = require('./return-productModel')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Agency.init(AgencySchema, Agency.config(sequelize))
  Client.init(ClientSchema, Client.config(sequelize))
  Seller.init(SellerSchema, Seller.config(sequelize))
  Branch.init(BranchSchema, Branch.config(sequelize))
  Return.init(ReturnSchema, Return.config(sequelize))
  ReturnProduct.init(ReturnProductSchema, ReturnProduct.config(sequelize))


  User.associate(sequelize.models)
  Product.associate(sequelize.models)
  Agency.associate(sequelize.models)
  Client.associate(sequelize.models)
  Seller.associate(sequelize.models)
  Branch.associate(sequelize.models)
  Return.associate(sequelize.models)
  ReturnProduct.associate(sequelize.models)

}

module.exports = setupModels