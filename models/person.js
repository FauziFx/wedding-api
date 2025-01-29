"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      person.belongsTo(models.user, {
        as: "created_by_user",
        foreignKey: "userId",
      });
    }
  }
  person.init(
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      child_number: DataTypes.INTEGER,
      father: DataTypes.STRING,
      mother: DataTypes.STRING,
      pos: DataTypes.INTEGER,
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "person",
    }
  );
  return person;
};
