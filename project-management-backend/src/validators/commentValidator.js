const Joi = require('@hapi/joi');

const validate = require('../utils/validate');
const { getComment } = require('../services/commentService');

// Validation schema
const schema = Joi.object({
  text: Joi.string().max(500).required(),
  user: Joi.string().max(90).required(),
  task: Joi.string().max(90).required(),
});

/**
 * Validate create/update task request.
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
 * Validate comment's existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findComment(req, res, next) {
  return getComment(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

module.exports = { findComment, commentValidator };
