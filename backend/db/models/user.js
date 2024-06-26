"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Attendance, { foreignKey: "userId", onDelete:"CASCADE", hooks:true });
      User.hasMany(models.Membership, { foreignKey: "userId", onDelete:"CASCADE", hooks:true });
      User.hasMany(models.Group, { foreignKey: "organizerId", onDelete:"CASCADE", hooks:true });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [4, 30],
            msg: "Username must be between 4 and 30 characters.",
          },
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Email cannot be used as username.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 256],
            msg: "Email must be between 3 and 256 characters.",
          },
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "updatedAt", "createdAt"],
        },
      },
    }
  );
  return User;
};