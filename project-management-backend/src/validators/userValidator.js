const Joi = require('@hapi/joi');

const validate = require('../utils/validate.js');
const { getUser } = require('../services/userService.js');

// Validation schema
const schema = Joi.object({
  username: Joi.string().max(90).required(),
  first_name: Joi.string().max(50).required(),
  last_name: Joi.string().max(50).required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
    .message('Password must contain at least 8 characters including one letter and one number')
    .max(90)
    .required(),
  role: Joi.string().max(50),
});

// Validation schema
const updateSchema = Joi.object({
  username: Joi.string().max(90).required(),
  first_name: Joi.string().max(50),
  last_name: Joi.string().max(50),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
    .message('Password must contain at least 8 characters including one letter and one number')
    .max(90),
  role: Joi.string().max(50),
});

/**
 * Validate create user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate update user request.
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
 * Validate users existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findUser(req, res, next) {
  return getUser(req.params.id)
    .then(() => next())
    .catch((err) => next(err));
}

module.exports = { findUser, userValidator, updateValidator };
