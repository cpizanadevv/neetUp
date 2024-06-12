"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Group, { foreignKey: "groupId" });
      Event.belongsTo(models.Venue, { foreignKey: "venueId" });
      Event.hasMany(models.Attendance, { foreignKey: "eventId", onDelete:"CASCADE", hooks:true });
      Event.hasMany(models.EventImage, { foreignKey: "eventId", onDelete:"CASCADE", hooks:true });
    }
  }
  Event.init(
    {
      venueId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE(6),
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE(6),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", "description", "capacity"],
          include: [
            "id"
          ]
        },
      },
    }
  );
  return Event;
};
