const { Model, DataTypes, Sequelize } = require("sequelize");
const { SELLER_TABLE} = require('./sellerModel')
const {CLIENT_TABLE} = require('./clientModel')

const BRANCH_TABLE = "branches"

const BranchSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  branch: {
    type: DataTypes.STRING(3),
    allowNull: false,
    validate: {
      is: /^\d{3}$/
    }
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "description"
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "seller_id",
    references: {
      model: SELLER_TABLE,
      key: "id"
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "client_id",
    references: {
      model: CLIENT_TABLE,
      key: "id"
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Branch extends Model {
  static associate(models) {
    this.belongsTo(models.Client, {
      as: 'client',
      foreignKey: 'clientId'
    })
    this.belongsTo(models.Seller, {
      as: 'vendedor',
      foreignKey: 'sellerId'
    })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: BRANCH_TABLE,
      modelName: "Branch",
      timestamps: false
    }
  }
}

module.exports = {
  BRANCH_TABLE,
  BranchSchema,
  Branch
}