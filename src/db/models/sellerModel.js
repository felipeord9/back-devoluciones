const { Model, DataTypes, Sequelize } = require("sequelize");

const SELLER_TABLE = 'sellers'

const SellerSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  co: {
    type: DataTypes.STRING(3),
    allowNull: true,
    validate: {
      is: /^\d{3}$/
    }
  },
  agency: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mailAgency: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'mail_agency'
  },
  mailCommercial: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'mail_commercial'
  }
}

class Seller extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SELLER_TABLE,
      modelName: 'Seller',
      timestamps: false
    }
  }
}

module.exports = {
  SELLER_TABLE,
  SellerSchema,
  Seller
}