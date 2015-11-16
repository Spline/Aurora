"use strict";

import Sequelize from 'sequelize';

export default function(sequelize) {
  return sequelize.define('sessions', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    sessionString: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'session_string'
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
    engine: 'MEMORY'
  });
}
