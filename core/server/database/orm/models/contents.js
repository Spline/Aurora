"use strict";

import Sequelize from 'sequelize';

export default function(sequelize) {
  return sequelize.define('contents', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    layout: {
      type: Sequelize.STRING,
      defaultValue: 'index',
      allowNull: false
    },
    uri: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT
    },
    ownerId: {
      type: Sequelize.INTEGER,
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
      name: 'uri',
      unique: true,
      fields: ['uri']
    }]
  });
}
