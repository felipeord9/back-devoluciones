const { Model, DataTypes, Sequelize } = require("sequelize");
const { CLIENT_TABLE } = require("./clientModel");
const { SELLER_TABLE } = require("./sellerModel");
const { BRANCH_TABLE } = require("./branchModel");
const { USER_TABLE } = require("./userModel")

const RETURN_TABLE = "return";

const ReturnSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  associatedDocument: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'associated_document'
  },
  typeApplicant:{
    type: DataTypes.STRING,
    allowNull: true,
    field: 'type_applicant'
  },
  authorizationDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'authorization_date'
  },
  colletedDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'colleted_date'
  },
  endDate:{
    type: DataTypes.DATE,
    allowNull: true,
    field: 'end_date'
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  state: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  reasonForRejection: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'reason_for_rejection'
  },
  reasonForReturn: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'reason_for_return'
  },
  coId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'co_id'
  },
  coDescription: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'co_description'
  },
  clientId: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: "client_id",
    /* references: {
      model: CLIENT_TABLE,
      key: "id",
    }, */
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  clientDescription: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'client_description'
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "seller_id",
    /* references: {
      model: SELLER_TABLE,
      key: "id",
    }, */
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  sellerDescription: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'seller_description'
  },
  branchId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "branch_id",
    /* references: {
      model: BRANCH_TABLE,
      key: "id",
    }, */
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  branchDescription: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "branch_description"
  },
  nameDriver: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "name_driver"
  },
  nameReceiver: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "name_receiver"
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  evidence: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  cancelReason: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "cancel_reason",
  },
  cancelDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "cancel_date",
  },
  supervisorComments: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "supervisor_comments",
  },
};

class Return extends Model {
  static associate(models) {
    //this.belongsTo(models.Client, { as: "client" });
    //this.belongsTo(models.Seller, { as: "seller" });
    //this.belongsTo(models.Branch, { as: "branch" });
    this.belongsTo(models.User, { as: 'user'})
    this.belongsToMany(models.Product, {
      as: "items",
      through: models.ReturnProduct,
      foreignKey: "returnId",
      otherKey: "productId",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: RETURN_TABLE,
      modelName: "Return",
      timestamps: false,
    };
  }
}

module.exports = {
  RETURN_TABLE,
  ReturnSchema,
  Return,
};
