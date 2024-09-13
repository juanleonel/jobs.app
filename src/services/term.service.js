const { db } = require('../config/db');
const TermDTO = require('../dto/termDto');

/**
 * Gets all terms.
 * @returns {Promise<Array<TermDTO>>} Array of terms as response.
 */
async function getAllTerms() {
  const queryResult = await db('term')
    .select();

    console.log(queryResult);
  if (queryResult.length) {
    return queryResult.map(item => {
      return mapTerm(item);
    });
  }

  return [];
}

/**
 * Create a new instance of term dto.
 * @param {TermDTO} data - Term info from knex result.
 * @returns {TermDTO} The term object mapped.
 */
function mapTerm(data) {
 const term = new TermDTO();
 term.id = data.id;
 term.name = data.name;
 term.description = data.description;

 return term;
}

module.exports = {
  getAllTerms
}
