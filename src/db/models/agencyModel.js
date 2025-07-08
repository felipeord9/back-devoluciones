const { Model, DataTypes, Sequelize } = require("sequelize");

const AGENCY_TABLE = 'agencies'

const AgencySchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

class Agency extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: AGENCY_TABLE,
      modelName: 'Agency',
      timestamps: false
    }
  }
}

module.exports = {
  AGENCY_TABLE,
  AgencySchema,
  Agency
}