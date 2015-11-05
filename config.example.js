"use strict";

const config = {
  ports: {
    http: 1337
  },
  defaultTitle: 'App',
  database: {
    dialect:  'mysql', // Supported: mysql, postgres, sqlite, mariadb and mssql
    host:     '',
    port:     '3306',
    user:     '',
    pass:     '',
    name:     ''
  },
  cache: {
    enabled: true
  },
  theme: {
    frontend: 'australis',
    backend: 'borealis'
  }
};

export default config;
