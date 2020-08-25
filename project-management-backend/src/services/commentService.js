const Boom = require('@hapi/boom');

const Comment = require('../models/comment');

/**
 * Get all comments.
 *
 * @returns {Promise}
 */
function getAllComments() {
  return Comment.fetchAll();
}

/**
 * Get a comment.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function getComment(id) {
  return new Comment({ id })
    .fetch({ withRelated: ['user', 'task'] })
    .then((comment) => comment)
    .catch(Comment.NotFoundError, () => {
      throw Boom.notFound('Comment not found');
    });
}

/**
 * Create new comment.
 *
 * @param   {Object}  comment
 * @returns {Promise}
 */
function createComment(comment) {
  return new Comment({
    id: comment.id,
    text: comment.text,
    user: comment.user,
    task: comment.task,
  }).save(null, { method: 'insert' });
}

/**
 * Update a comment.
 *
 * @param   {String}  id
 * @param   {Object}  comment
 * @returns {Promise}
 */
function updateComment(id, comment) {
  return new Comment({ id }).save({
    text: comment.text,
    user: comment.user,
    task: comment.task,
  });
}

/**
 * Delete a comment.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function deleteComment(id) {
  return new Comment({ id }).fetch().then((comment) => comment.destroy());
}

module.exports = {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
