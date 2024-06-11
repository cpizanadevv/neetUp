"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Venue.belongsTo(models.Group, { foreignKey: "groupId" });
      Venue.belongsTo(models.Event, { foreignKey: "venueId" });
    }
  }
  Venue.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Group",
          key: "id",
        },
        onDelete: 'cascade'
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len:[2,20],
        }
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len:[2,20],
        }
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len:[2,20],
        }
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: -180,
          max: 180,
        },
      },
    },
    {
      sequelize,
      modelName: "Venue",
    }
  );
  return Venue;
};
