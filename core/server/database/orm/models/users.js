"use strict";

import Sequelize from 'sequelize';

export default function(sequelize) {
  return sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: 'createdAt'
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: 'updatedAt'
    }
  }, {
    indexes: [{
      name: 'email',
      unique: true,
      fields: ['email']
    }]
  });
}
