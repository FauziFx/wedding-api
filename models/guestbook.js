"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class guestbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      guestbook.belongsTo(models.user, {
        as: "created_by_user",
        foreignKey: "userId",
      });
    }
  }
  guestbook.init(
    {
      name: DataTypes.STRING,
      whatsapp: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "guestbook",
    }
  );
  return guestbook;
};
