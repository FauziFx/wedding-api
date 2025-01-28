"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class general extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      general.belongsTo(models.user, {
        as: "created_by_user",
        foreignKey: "userId",
      });
    }
  }
  general.init(
    {
      time: DataTypes.TIME,
      date: DataTypes.DATE,
      address: DataTypes.STRING,
      maps: DataTypes.STRING,
      music: DataTypes.STRING,
      image: DataTypes.STRING,
      bg_image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "general",
    }
  );
  return general;
};
