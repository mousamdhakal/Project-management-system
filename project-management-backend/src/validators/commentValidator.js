const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const validate = require('../utils/validate');
const { getComment } = require('../services/commentService');
const { getProject } = require('../services/projectService');
const { getTask } = require('../services/taskService');

// Validation schema
const schema = Joi.object({
  text: Joi.string().max(500).required(),
  task: Joi.string().max(90).required(),
});

// Validation schema
const updateSchema = Joi.object({
  text: Joi.string().max(500).required(),
});

/**
 * Validate create comment request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function commentValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate update comment request.
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
 * Validate comment's ownership.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function validateCommentOwnership(req, res, next) {
  return getComment(req.params.id)
    .then((comment) => {
      if (comment.attributes.username === req.user.username) {
        return next();
      }
      return next(Boom.unauthorized('Comment does not belong to the user'));
    })
    .catch((err) => next(err));
}

/**
 * Validate comment's is in a involved project.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function validateProjectInvolvement(req, res, next) {
  return getTask(req.body.task)
    .then((task) => {
      return getProject(task.relations.project.attributes.id)
        .then((project) => {
          let isInvolved = false;
          project.relations.users.models.forEach((modal) => {
            if (modal.attributes.id === req.user.id) {
              isInvolved = true;
            }
          });
          if (project.attributes.project_manager === req.user.username) {
            isInvolved = true;
          }
          if (isInvolved) return next();
          return next(Boom.unauthorized('User is not involved in the project of the task'));
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => next(Boom.notFound('Task being commented on does not exists')));
}

module.exports = { commentValidator, updateValidator, validateCommentOwnership, validateProjectInvolvement };
