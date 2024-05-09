'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SavePost.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id', as: 'post' })
      SavePost.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
    }
  }
  SavePost.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SavePost',
  });
  return SavePost;
};