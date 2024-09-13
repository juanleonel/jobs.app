/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('post', (table) => {
    table.increments('id').primary();
    table.string('title', 100).notNullable();
    table.text('summary').notNullable();
    table.integer('categoryId').notNullable()
      .unsigned().references('category.id');
    table.integer('termId').notNullable()
      .unsigned().references('term.id');
    table.integer('userId').notNullable()
      .unsigned().references('user.id');
    table.double('salary').notNullable();
    table.string('image');
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('post');
};
