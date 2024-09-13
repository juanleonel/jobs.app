const { db } = require('../config/db');
const PostDTO = require('../dto/postDto');

const POST_TABLE = 'post';

/**
 * Gets the specific post by identifier.
 * @param {number} id - The current Id.
 * @returns {Promise<PostDTO>} post found it.
 */
async function getPostById(id) {
  const queryResult = await db(POST_TABLE).select().where({
    'id': id
  });

  if (queryResult.length) {
    return mapPost(queryResult[0])
  }

  return null;
}

/**
 * Gets all posts.
 * @returns {Promise<Array<PostDTO>>} Array of posts as response.
 */
async function getAllPosts() {
  const queryResult = await db(POST_TABLE).select().where({
    'isActive': true
  });

  if (queryResult.length) {
    return queryResult.map(item => {
      return mapPost(item);
    })
  }

  return [];
}

/**
 * Create a new post data.
 * @param {PostDTO} post - Post to will be save.
 * @returns {Promise<PostDTO>} The Post object created.
 */
async function addPost(post) {
  const queryResult = await db(POST_TABLE).insert({
    title: post.title,
    summary: post.summary,
    salary: post.salary,
    image: post.image,
    categoryId: post.categoryId,
    termId: post.termId,
    userId: post.userId
  }).returning(['id']);

  if (queryResult.length) {
    return mapPost(queryResult[0]);
  }

  return null;
}

/**
 * Create a new instance of post dto.
 * @param {PostDTO} post - post info from knex result.
 * @returns {PostDTO} The post object mapped.
 */
function mapPost(data) {
  const post = new PostDTO();
  post.id = data.id;
  post.title = data.title;
  post.summary = data.summary;
  post.categoryId = data.categoryId;
  post.termId = data.termId;
  post.postId = data.postId;
  post.salary = data.salary;
  post.image = data.image;
  post.createdAt = data.created_at;
  post.updatedAt = data.updated_at;

  return post;
}

/**
 * Updates the post.
 * @param {PostDTO} post The post will be update.
 */
async function updatePost(post) {
  db(POST_TABLE)
  .where({ id: post.id })
  .update({
    title: post.title,
    summary: post.summary,
    categoryId: post.categoryId,
    termId: post.termId,
    salary: post.salary,
    image: post.image
  });
}

async function deletePost(id) {
  db(POST_TABLE).delete()
  .where({ 'id': id })
}

module.exports = {
  addPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost
}
