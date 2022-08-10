const Sequelize = require('sequelize');

const users = (sequelize, Sequelize) => {
  
    const Users = sequelize.define("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refresh_token:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      forgotPassword:{
        type: Sequelize.TEXT,
        allowNull: true,
      }

    });
  
    return Users;
  };
  
  module.exports = users;