"use strict";

import Sequelize from 'sequelize';

export default function(sequelize) {
  return sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'first_name'
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: 'updated_at'
    }
  }, {
    indexes: [{
      name: 'email',
      unique: true,
      fields: ['email']
    }]
  });
}
