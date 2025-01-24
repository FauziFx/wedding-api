"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bankaccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bankaccount.belongsTo(models.user, {
        as: "created_by_user",
        foreignKey: "userId",
      });
    }
  }
  bankaccount.init(
    {
      name: DataTypes.STRING,
      bank: DataTypes.STRING,
      number: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "bankaccount",
    }
  );
  return bankaccount;
};
