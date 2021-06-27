'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.follows, {
        as: 'followers',
        foreignKey: {
          name: 'followingId'
        }
      }),
      user.hasMany(models.follows, {
        as: 'following',
        foreignKey: {
          name: 'followersId'
        }
      }),
      user.hasMany(models.feed, {
        as: 'feed',
        foreignKey: {
          name: 'userId'
        }
      }),
      user.hasMany(models.message, {
        as: 'sender',
        foreignKey: {
          name: 'receiverMessageId'
        }
      })
    }
  };

  user.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};