const Boom = require('@hapi/boom');

const User = require('../models/user.js');
const Comment = require('../models/comment');

/**
 * Get all comments.
 *
 * @returns {Promise}
 */
function getAllComments() {
  return Comment.fetchAll({ withRelated: ['user', 'task'] });
}

/**
 * Get related comments.
 *
 *  @param   {Object}  currentUser
 * @returns {Promise}
 */
function getRelatedComments(currentUser) {
  return new Promise((resolve, reject) => {
    User.where({ id: currentUser.id })
      .fetch({ withRelated: ['comments'] })
      .then((data) => resolve(data.relations))
      .catch((err) => reject(err));
  });
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
  return new Comment({ id }).save(comment, { method: 'update', patch: true });
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
  getRelatedComments,
  updateComment,
  deleteComment,
};
