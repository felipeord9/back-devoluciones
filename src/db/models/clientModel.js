const { Model, DataTypes, Sequelize } = require("sequelize");

const CLIENT_TABLE = "clients";

const ClientSchema = {
  nit: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    field: 'id'
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'description'
  },
};

class Client extends Model {
  static associate(models) {
    this.hasMany(models.Branch, {
      as: 'sucursales',
      foreignKey: 'clientId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: 'Client',
      timestamps: false
    }
  }
}

module.exports = {
  CLIENT_TABLE,
  ClientSchema,
  Client
}