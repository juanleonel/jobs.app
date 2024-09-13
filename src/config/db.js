const { development, staging, production } = require('../../knexfile');
const { toBoolean } = require('../utils/utils.functions');

let config = development;

if (toBoolean(process.env.PRODUCTION)) {
  config = production
}

if (toBoolean(process.env.STAGING)) {
  config = staging
}

const db = require('knex')(config);

async function tryConnect() {
  try {
    const result = await db.raw('SELECT 1');
    console.log(result);
  } catch (error) {
    console.log('Cannot connect to data base ', error.message);
  }
}

module.exports = { tryConnect, db };
