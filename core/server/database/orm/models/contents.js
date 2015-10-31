"use strict";

import Sequelize from 'sequelize';

export default function(sequelize) {
  return sequelize.define('contents', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.TEXT
    },
    author_id: {
      type: Sequelize.INTEGER,
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
  });
}
