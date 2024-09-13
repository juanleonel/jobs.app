const { getAllCategories } = require('../services/category.service');

/**
 * Handle the request to find the categories.
 * @param {Request} req - Request make from client.
 * @param {Response} res - Response for client.
 * @returns {Response}
 */
async function getCategoriesController(req, res) {
  try {
    const items = await getAllCategories();

    return res.json(items);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  getCategoriesController
}
