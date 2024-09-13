const { getAllTerms } = require('../services/term.service');

/**
 * Handle the request to find the terms.
 * @param {Request} req - Request make from client.
 * @param {Response} res - Response for client.
 * @returns {Response}
 */
async function getTermsController(req, res) {
  try {
    const items = await getAllTerms();

    return res.json(items);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  getTermsController
}
