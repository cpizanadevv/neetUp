'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.`
     */
    static associate(models) {
      // define association here
      Membership.belongsTo(models.User, { as: "memberId", foreignKey: 'userId'});
      Membership.belongsTo(models.Group, { foreignKey: 'groupId'});
    }
  }
  Membership.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Group',
        foreignKey: 'groupId'
      },
      onDelete: 'cascade'
    },
    status: {
      type: DataTypes.ENUM('co-host','member','pending'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};