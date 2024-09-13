/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('lastName', 100).notNullable();
    table.string('email', 200).unique().notNullable();
    table.string('password', 200).notNullable();
    table.boolean('isActive').notNullable().defaultTo(true);
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user');
};
