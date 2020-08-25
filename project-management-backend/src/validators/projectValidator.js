const Joi = require('@hapi/joi');

const validate = require('../utils/validate');
const { getProject } = require('../services/projectService');

// Validation schema
const schema = Joi.object({
  title: Joi.string().max(90).required(),
  description: Joi.string().max(500).required(),
  project_manager: Joi.string().max(90).required(),
  users: Joi.array(),
});

/**
 * Validate create/update project request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function projectValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate project's existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findProject(req, res, next) {
  return getProject(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

module.exports = { findProject, projectValidator };
