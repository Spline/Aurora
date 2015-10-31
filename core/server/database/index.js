"use strict";

/*
async function findOne() {
  let query = await new SQL().query("SELECT 1+1 AS Result");
  console.log(query[0]);
}
*/

let config = require(__ROOT + 'config');
let mysql = require('mysql');
let pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.pass,
  database: config.database.name
});

pool.getConnection((err, connection) => {
  console.log('Connected to the database');
});

let getConnection = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      else resolve(connection);
    });
  });
}

let processQuery = async (connection, queryString, queryParams) => {
  return new Promise((resolve, reject) => {
    connection.query(queryString, queryParams, (err, rows) => {
      connection.release();
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export default class SQL {
  async query(queryString, queryParams = {}) {
    let connection = await getConnection();
    let result = await processQuery(connection, queryString, queryParams);
    return result;
  }
}
