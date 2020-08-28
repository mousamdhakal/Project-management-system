const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const validate = require('../utils/validate');
const { getProject } = require('../services/projectService');
const { getUserByUserName } = require('../services/userService');

const roles = require('../utils/roles');

// Validation schema
const schema = Joi.object({
  title: Joi.string().max(90).required(),
  description: Joi.string().max(500).required(),
  project_manager: Joi.string().max(90).required(),
  users: Joi.array().required(),
});

const updateSchema = Joi.object({
  title: Joi.string().max(90),
  description: Joi.string().max(500),
  project_manager: Joi.string().max(90),
  users: Joi.array(),
});

/**
 * Validate create project request.
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
 * Validate update project request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function updateValidator(req, res, next) {
  return validate(req.body, updateSchema)
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
function projectAuthorizer(req, res, next) {
  return getProject(req.params.id)
    .then((project) => {
      // Only allow admin or the project manager who is assigned the project to update the project
      if (req.user.role === roles[0]) {
        return next();
      }
      if (req.user.role === roles[1] && project.relations.projectManager.attributes.id === req.user.id) {
        // Restrict project manager from updating the project manager of the project
        if (req.body && req.body.project_manager !== undefined) {
          return next(Boom.unauthorized('Unauthorized to update project manager of the project'));
        }
        return next();
      }
      if (req.user.role === roles[2] || req.user.role === roles[3]) {
        return next();
      }

      return next(Boom.unauthorized('Access to the project unauthorized'));
    })
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
function involvementChecker(req, res, next) {
  return getProject(req.params.id)
    .then((project) => {
      if (req.user.role === roles[0] || req.user.role === roles[1]) {
        return next();
      }
      if (req.user.role === roles[2] || req.user.role === roles[3]) {
        let isInvolved = false;
        project.relations.users.models.forEach((modal) => {
          if (modal.attributes.id === req.user.id) {
            isInvolved = true;
          }
        });
        if (isInvolved) {
          return next();
        }
      }
    })
    .catch((err) => next(err));
}

/**
 * convert names for involved users to ids.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function convertNamesToIds(req, res, next) {
  if (req.body.users) {
    let promises = [];
    req.body.users.forEach((username) => {
      if (username) {
        promises.push(getUserByUserName(username));
      }
    });
    Promise.all(promises)
      .then((users) => {
        req.body.users = [];
        users.forEach((user, index) => {
          req.body.users.push(user.id);
        });
        next();
      })
      .catch((err) => {
        next(Boom.notAcceptable('Invalid list of users sent'));
      });
  } else {
    next();
  }
}

module.exports = {
  findProject,
  projectAuthorizer,
  projectValidator,
  updateValidator,
  involvementChecker,
  convertNamesToIds,
};
