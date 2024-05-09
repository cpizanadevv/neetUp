'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupImage.belongsTo(models.Group, { foreignKey: 'groupId'});

    }
  }
  GroupImage.init({
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Group',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING,
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'GroupImage',
  });
  return GroupImage;
};