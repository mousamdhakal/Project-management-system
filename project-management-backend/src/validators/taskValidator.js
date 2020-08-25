const Joi = require('@hapi/joi');

const validate = require('../utils/validate');
const { getTask } = require('../services/taskService');

// Validation schema
const schema = Joi.object({
  title: Joi.string().max(90).required(),
  description: Joi.string().max(500).required(),
  assigned_user: Joi.string().max(90).required(),
  associated_project: Joi.string().max(90).required(),
  deadline: Joi.date(),
});

/**
 * Validate create/update task request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function taskValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate task's existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findTask(req, res, next) {
  return getTask(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

module.exports = { findTask, taskValidator };
