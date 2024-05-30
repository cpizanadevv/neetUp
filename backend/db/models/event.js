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
        allowNull: true,
        references: {
          model: "Venue",
          key: "id",
        },
        onDelete: "cascade",
      },
      groupId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Group",
          key: "id",
        },
        onDelete: "cascade",
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
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            args: new Date().toISOString(),
            msg: "Start date must be in the future",
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfterStart(value) {
            if (new Date(value) <= new Date(this.startDate)) {
              throw new Error("End date must be after the start date.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Event",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", "description", "capacity"],
          include: [
            "id",
            [
              COUNT (sequelize.col("Attendances.id")),
              "numAttending",
            ],
            [sequelize.col("EventImages.url"), "previewImage"],
          ]
        },
      },
    }
  );
  return Event;
};
