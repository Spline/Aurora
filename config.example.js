"use strict";

const config = {
  ports: {
    http: 1337
  },
  defaultTitle: 'App',
  database: {
    dialect:  '', // Supported: mysql, postgres, sqlite, mariadb and mssql
    host:     '',
    user:     '',
    pass:     '',
    name:     ''
  },
  cache: {
    enabled: true
  }
};

export default config;
