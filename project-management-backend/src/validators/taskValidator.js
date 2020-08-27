const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const validate = require('../utils/validate');

const { getTask } = require('../services/taskService');
const { getProject } = require('../services/projectService');
const { getUserByUserName } = require('../services/userService');
const roles = require('../utils/roles');

// Validation schema
const schema = Joi.object({
  title: Joi.string().max(90).required(),
  description: Joi.string().max(500).required(),
  assigned_user: Joi.string().max(90).required(),
  previously_assigned_user: Joi.string().max(90),
  associated_project: Joi.string().max(90).required(),
  deadline: Joi.date(),
  users: Joi.array(),
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
function taskAuthorizer(req, res, next) {
  return getTask(req.params.id)
    .then((task) => {
      // Check if task is assigned to valid user
      let invalid = false;
      getUserByUserName(req.body.assigned_user)
        .then((data) => {
          if (data.attributes.role === roles[0] || data.attributes.role === roles[1]) {
            invalid = true;
          }

          if (invalid) {
            return next(Boom.notAcceptable('Not allowed to assign task to the user of given role'));
          }

          // Set previously assigned user
          req.body.previously_assigned_user = task.attributes.assigned_user;

          // Only allow admin or the project manager who is assigned the project to update the project
          if (req.user.role === roles[0]) {
            return next();
          }
          if (req.user.role === roles[1] && task.relations.project.attributes.project_manager === req.user.username) {
            return next();
          }
          if (req.user.role === roles[2]) {
            let isInvolved = false;
            getProject(task.relations.project.attributes.id)
              .then((project) => {
                project.relations.users.models.forEach((modal) => {
                  if (modal.attributes.id === req.user.id) {
                    isInvolved = true;
                  }
                });
              })
              .catch((err) => {
                throw err;
              });
            if (isInvolved) return next();
          }
          if (req.user.role === roles[2] || req.user.role === roles[3]) {
            if (task.attributes.assigned_user === req.user.username) {
              return next();
            }
          }

          return next(Boom.unauthorized('Access to the task unauthorized'));
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => next(err));
}

function taskCreationAuthorizer(req, res, next) {
  if (req.user.role === roles[0]) {
    return next();
  }

  getProject(req.body.associated_project)
    .then((project) => {
      if (req.user.role === roles[1] && project.relations.projectManager.attributes.id === req.user.id) {
        return next();
      }
      if (req.user.role === roles[2]) {
        let involved = false;
        project.relations.users.models.forEach((modal) => {
          if (modal.attributes.id === req.user.id) {
            involved = true;
          }
        });
        if (involved) return next();
      }
      next(Boom.unauthorized('Can not create tasks in uninvolved project'));
    })
    .catch((err) => next(Boom.notFound('Associated project does not exists')));
}

module.exports = { taskValidator, taskAuthorizer, taskCreationAuthorizer };
