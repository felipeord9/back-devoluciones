const { Model, DataTypes, Sequelize } = require("sequelize");
const { RETURN_TABLE } = require('./returnModel')
const { PRODUCT_TABLE } = require('./productModel')

const RETURN_PRODUCT_TABLE = 'return_products'

const ReturnProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  returnId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Return_id',
    references: {
      model: RETURN_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'product_id',
    /* references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL' */
  }
}

class ReturnProduct extends Model {
  static associate(models) {
    this.belongsTo(models.Return, { as: 'return'})
    //this.belongsTo(models.Product, { as: 'product'})
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: RETURN_PRODUCT_TABLE,
      modelName: 'ReturnProduct',
      timestamps: false
    }
  }
}

module.exports = {
  RETURN_PRODUCT_TABLE,
  ReturnProductSchema,
  ReturnProduct
}