'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Image, { foreignKey: 'postId', as: 'images' })
      Post.belongsTo(models.Category, {foreignKey: 'categoryId', targetKey: 'id', as: 'category'});
      Post.belongsTo(models.Price, {foreignKey: 'priceId', targetKey: 'id', as: 'price'});
      Post.belongsTo(models.Area, {foreignKey: 'areaId', targetKey: 'id', as: 'area'});
      Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
      Post.hasMany(models.SavePost, { foreignKey: 'postId', as: 'save' })
    }
  }
  Post.init({
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    shortDescription: DataTypes.STRING,
    detail: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    priceId: DataTypes.INTEGER,
    areaId: DataTypes.INTEGER,
    priceNumber: DataTypes.FLOAT,
    areaNumber: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    target: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};