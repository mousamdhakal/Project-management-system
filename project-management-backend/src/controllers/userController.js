const HttpStatus = require('http-status-codes');
const Boom = require('@hapi/boom');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByUserName,
} = require('../services/userService');
const roles = require('../utils/roles');

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchAll(req, res, next) {
  getAllUsers()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Get a user by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchById(req, res, next) {
  getUser(req.params.id)
    .then((data) => {
      data.attributes.password = undefined;
      res.json({ data });
    })
    .catch((err) => next(err));
}

/**
 * Get a user by the token provided in the authenticated user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchByToken(req, res, next) {
  getUser(req.user.id)
    .then((data) => {
      data.attributes.password = undefined;
      res.json({ data });
    })
    .catch((err) => next(err));
}

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function create(req, res, next) {
  const body = req.body;

  if (!roles.includes(req.body.role) || req.body.role === 'admin') {
    return next(Boom.notAcceptable('Role not allowed'));
  }

  // Hash the password to store in database
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);

  // Get unique id for the user
  body.id = uuidv4();

  // Check if the user with that email already exists
  getUserByUserName(body.username)
    .then((result) => {
      next(Boom.conflict(`User with username ${body.username} already exists`));
    })
    .catch((err) => {
      createUser(req.body)
        .then((data) => {
          data.attributes.password = undefined;
          res.status(HttpStatus.CREATED).json({ data });
        })
        .catch((err) => next(err));
    });
}

/**
 * Login a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function login(req, res, next) {
  const body = req.body;
  // Get user by the username
  getUserByUserName(body.username)
    .then((results) => {
      let user = results.attributes;
      const result = compareSync(body.password, user.password);
      if (result) {
        user.password = undefined;
        console.log(result);
        // Create new jsonwebtoken for user authorization
        // Expire in 10 seconds for testing purpose
        const jsonwebtoken = sign({ user: user }, process.env.JWTSECRETKEY, { expiresIn: '10s' });
        return res.status(HttpStatus.OK).json({
          token: jsonwebtoken,
          user: user,
        });
      } else {
        throw error('Unauthorized');
      }
    })
    .catch((err) => {
      next(Boom.unauthorized('Invalid Username or Password'));
    });
}

/**
 * Update a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function update(req, res, next) {
  updateUser(req.params.id, req.body)
    .then((data) => {
      data.attributes.password = undefined;
      res.json({ data });
    })
    .catch((err) => next(err));
}

/**
 * Delete a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function remove(req, res, next) {
  deleteUser(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}

module.exports = {
  fetchAll,
  fetchById,
  fetchByToken,
  create,
  update,
  remove,
  login,
};
