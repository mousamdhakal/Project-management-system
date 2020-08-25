const jwt = require('jsonwebtoken');

const { getUserByUserName } = require('../services/userService');
const Boom = require('@hapi/boom');

/**
 * Check the authentication token for protected routes and if found decode and embed the user info on request body
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let authenticate = function (req, res, next) {
  let token;
  // Get token from one of the headers
  if (req.headers['authorization']) token = req.headers['authorization'];
  if (req.headers['x-access-token']) token = req.headers['x-access-token'];
  if (req.headers['token']) token = req.headers['token'];

  // If token not found restrict access
  if (!token) {
    return next(Boom.unauthorized('Token not provided'));
  }

  // Verify and decode the token
  jwt.verify(token, process.env.JWTSECRETKEY, function (err, decoded) {
    if (err) {
      return next(Boom.unauthorized('Invalid token'));
    }
    // Get user from the decoded data of the token to check if the user still exists or not
    getUserByUserName(decoded.user.username)
      .then((result) => {
        // If user exists on the system, embed the data on the request body
        req.user = decoded.user;
        next();
      })
      .catch((err) => {
        next(Boom.unauthorized('User removed from the system, try logging in again.'));
      });
  });
};

module.exports = authenticate;
