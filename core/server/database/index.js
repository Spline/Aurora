"use strict";

/*
async function findOne() {
  let query = await new SQL().query("SELECT 1+1 AS Result");
  console.log(query[0]);
}
*/

let ORM = require(`${__ROOT}/core/server/database/orm/connector`);
ORM.sync = require(`${__ROOT}/core/server/database/orm/sync`);

import DatabaseConnectionRefusedException from '../exceptions/Database-Connection-Refused';

let config = require(__ROOT + '/config');

export default class SQL {
  static sync() {
    return ORM.sync();
  }
  static async connect() {
    try {
      await ORM.authenticate();
    } catch (ex) {
      throw new DatabaseConnectionRefusedException(ex);
    }
  }
  async query(queryString, queryParams = {}) {
    let connection = await getConnection();
    let result = await processQuery(connection, queryString, queryParams);
    return result;
  }
}
