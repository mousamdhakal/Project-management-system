const Boom = require('@hapi/boom');

let authorize = function (roles = []) {
  // roles can be a single role string or an array of roles that are authorized

  // Convert to array if it is single string
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // Unauthorized
        next(Boom.unauthorized('Access denied'));
      }
      // Authorized
      next();
    },
  ];
};

module.exports = authorize;
