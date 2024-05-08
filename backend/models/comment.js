'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id', as: 'post' })
      Comment.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
    }
  }
  Comment.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};