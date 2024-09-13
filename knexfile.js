// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    debug: true,
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'jobdb',
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 7 }
  },
  staging: {
    client: 'mysql2',
    debug: false,
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'jobdb',
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 7 }
  },
  production: {
    client: 'mysql2',
    debug: false,
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'jobdb',
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 7 }
  }
};
