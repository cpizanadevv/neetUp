'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendance.belongsTo(models.Event, { foreignKey: 'eventId' });
      Attendance.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Attendance.init({
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Event',
        foreignKey: 'eventId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        foreignKey: 'userId'
      }
    },
    status: {
      type: DataTypes.ENUM('attending', 'waitlist'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};