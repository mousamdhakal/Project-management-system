const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const validate = require('../utils/validate');
const { getProject } = require('../services/projectService');

const roles = require('../utils/roles');

// Validation schema
const schema = Joi.object({
  title: Joi.string().max(90).required(),
  description: Joi.string().max(500).required(),
  project_manager: Joi.string().max(90),
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

/**
 * Validate project's existence and otehr permission for update.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findAndValidateProject(req, res, next) {
  return getProject(req.params.id)
    .then((project) => {
      // Only allow admin or the project manager who is assigned the project to update the project
      if (req.user.role === roles[0]) {
        return next();
      }
      if (project.relations.projectManager.attributes.id === req.user.id) {
        // Restrict project manager from updating the project manager of the project
        if (req.body && req.body.project_manager !== undefined) {
          return next(Boom.unauthorized('Unauthorized to update project manager of the project'));
        }
        return next();
      }

      return next(Boom.unauthorized('Access to the project unauthorized'));
    })
    .catch((err) => next(err));
}

module.exports = { findProject, findAndValidateProject, projectValidator };
