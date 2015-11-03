"use strict";

import Sequelize from 'sequelize';

export default function(sequelize) {
  return sequelize.define('sessions', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'user_id'
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
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: 'updated_at'
    }
  }, {
    engine: 'MEMORY'
  });
}
