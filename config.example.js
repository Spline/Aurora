"use strict";

const config = {
  ports: {
    http: 1337
  },
  defaultTitle: 'App',
  database: {
    dialect: 'mysql', // Supported: mysql, postgres, sqlite, mariadb and mssql
    mysql: {
      host: '',
      port: '3306',
      user: '',
      pass: '',
      name: ''
    },
    postgres: {
      host: '',
      port: '5432',
      user: '',
      pass: '',
      name: ''
    },
    mariadb: {},
    mssql: {},
    sqlite: {
      storage: './data.db'
    }
  },
  cache: {
    enabled: true
  },
  theme: {
    frontend: 'australis',
    backend: 'borealis'
  }
};

module.exports = config;
