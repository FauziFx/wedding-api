"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.guestbook, {
        as: "guestbook",
        foreignKey: "userId",
      });
      user.hasMany(models.bankaccount, {
        as: "bankaccount",
        foreignKey: "userId",
      });
      user.hasOne(models.general, {
        as: "general",
        foreignKey: "userId",
      });
      user.hasMany(models.person, {
        as: "person",
        foreignKey: "userId",
      });
      user.hasMany(models.gallery, {
        as: "gallery",
        foreignKey: "userId",
      });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
