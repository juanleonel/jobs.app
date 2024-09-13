const { db } = require('../config/db');
const CategoryDTO = require('../dto/categoryDto');

/**
 * Gets all categories.
 * @returns {Promise<Array<CategoryDTO>>} Array of categories as response.
 */
async function getAllCategories() {
  const queryResult = await db('category')
    .select();

  if (queryResult.length) {
    return queryResult.map(item => {
      return mapCategory(item);
    });
  }

  return [];
}

/**
 * Create a new instance of category dto.
 * @param {CategoryDTO} data - Category info from knex result.
 * @returns {CategoryDTO} The category object mapped.
 */
function mapCategory(data) {
 const item = new CategoryDTO();
 item.id = data.id;
 item.name = data.name;
 item.description = data.description;

 return user;
}

module.exports = {
  getAllCategories
}
