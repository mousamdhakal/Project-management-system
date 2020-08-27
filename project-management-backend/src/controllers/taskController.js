const HttpStatus = require('http-status-codes');
const Boom = require('@hapi/boom');

const {
  getAllTasks,
  getRelatedTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../services/taskService');

const { v4: uuidv4 } = require('uuid');

/**
 * Get all tasks.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchAll(req, res, next) {
  getAllTasks()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Get all tasks.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchRelatedTasks(req, res, next) {
  getRelatedTasks(req.user)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Get a task by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchById(req, res, next) {
  getTask(req.params.id)
    .then((data) => {
      data.relations.assignedUser.attributes.password = undefined;
      data.relations.taggedUsers.models = data.relations.taggedUsers.models.map((model) => {
        model.attributes.password = undefined;
        return model;
      });
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

  createTask(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}

/**
 * Update a task.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function update(req, res, next) {
  updateTask(req.params.id, req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete a task.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function remove(req, res, next) {
  deleteTask(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}

module.exports = {
  fetchAll,
  fetchRelatedTasks,
  fetchById,
  create,
  update,
  remove,
};
