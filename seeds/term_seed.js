/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('term').del()
  await knex('term').insert([
    { name: 'Full-time', description: 'Full time job', created_at: new Date() },
    { name: 'Part-time', description: 'Part time job', created_at: new Date() },
    { name: 'Contract', description: 'Contract', created_at: new Date() },
    { name: 'Frelance', description: 'Freelance', created_at: new Date() }
  ]);
};
