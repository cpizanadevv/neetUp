"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.Attendance, { foreignKey: "eventId" });
      Event.hasMany(models.EventImage, { foreignKey: "eventId" });
      Event.belongsTo(models.Group, { foreignKey: "groupId" });
      Event.belongsTo(models.Venue, { foreignKey: "venueId" });
    }
  }
  Event.init(
    {
      venueId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Venue",
          key: "id",
        },
      },
      groupId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Group",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          min: 5,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      type: {
        type: DataTypes.ENUM("In Person", "Online"),
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER(4, 2),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            args: Sequelize.literal("CURRENT_TIMESTAMP"),
            msg: "Start date must be in the future",
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            args: this.startDate,
            msg: "End date is less than start date",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
