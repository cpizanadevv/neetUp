"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.GroupImage, { foreignKey: "groupId" });
      Group.hasMany(models.Venue, { foreignKey: "groupId" });
      Group.hasMany(models.Event, { foreignKey: "groupId" });
      Group.hasMany(models.Membership, { foreignKey: "groupId" });
      Group.belongsTo(models.User, {
        as: "Organizer",
        foreignKey: "organizerId",
      });
    }
  }
  Group.init(
    {
      organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [1, 60],
            msg: "Name must be 60 characters or less",
          },
        },
      },
      about: {
        type: DataTypes.TEXT,
        validate: {
          min: {
            args: 50,
            msg: "About must be 50 characters or more",
          },
        },
      },
      type: {
        type: DataTypes.ENUM("In Person", "Online"),
        allowNull: false,
        validate: {
          notIn: {
            args: ["In Person", "Online"],
            msg: "Type must be 'Online' or 'In Person'",
          },
        },
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          min: 2,
          max: 20,
          isInPerson(val) {
            if (this.type !== "Online" && !val) {
              throw new Error("City is required for In Person events.");
            }
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlpha: true,
          min: 2,
          max: 20,
          isInPerson(val) {
            if (this.type !== "Online" && !val) {
              throw new Error("State is required for In Person events.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Group",
      defaultScope: {
        attributes: {
          include: [
            "id",
            "updatedAt",
            "createdAt",
          ],
        }
    }
    }
  );
  return Group;
};
