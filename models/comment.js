"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.hasMany(models.comment, {
        foreignKey: "parentId",
        as: "replies",
        onDelete: "CASCADE",
        hooks: true,
      });
      comment.belongsTo(models.comment, {
        foreignKey: "parentId",
        as: "parent",
      });
      comment.belongsTo(models.user, {
        as: "created_by_user",
        foreignKey: "userId",
      });
    }
  }
  comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      uuid: DataTypes.UUID,
      name: DataTypes.STRING,
      text: DataTypes.STRING,
      presence: DataTypes.STRING,
      parentId: DataTypes.UUID,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
