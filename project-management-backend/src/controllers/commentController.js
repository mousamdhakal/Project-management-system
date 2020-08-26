const HttpStatus = require('http-status-codes');
const Boom = require('@hapi/boom');

const {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require('../services/commentService');

const { v4: uuidv4 } = require('uuid');

/**
 * Get all comments.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchAll(req, res, next) {
  getAllComments()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Get a comment by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchById(req, res, next) {
  getComment(req.params.id)
    .then((data) => {
      data.relations.user.attributes.password = undefined;
      res.json(data);
    })
    .catch((err) => next(err));
}

/**
 * Create a new task.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function create(req, res, next) {
  const body = req.body;

  // Get unique id for the task
  body.id = uuidv4();

  createComment(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

/**
 * Update a comment.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function update(req, res, next) {
  updateComment(req.params.id, req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete a comment.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function remove(req, res, next) {
  deleteComment(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}

module.exports = {
  fetchAll,
  fetchById,
  create,
  update,
  remove,
};
