const Boom = require('@hapi/boom');

const User = require('../models/user.js');

/**
 * Get all users.
 *
 * @returns {Promise}
 */
function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function getUser(id) {
  return new User({ id })
    .fetch({ withRelated: ['managedProjects', 'projects', 'tasks', 'assignedTasks', 'comments'] })
    .then((user) => user)
    .catch(User.NotFoundError, () => {
      throw Boom.notFound('User not found');
    });
}

/**
 * Get a user.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function getUserByUserName(username) {
  return new User({ username })
    .fetch()
    .then((user) => user)
    .catch(User.NotFoundError, () => {
      throw Boom.notFound('User not found');
    });
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
function createUser(user) {
  return new User({
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    password: user.password,
  }).save(null, { method: 'insert' });
}

/**
 * Update a user.
 *
 * @param   {String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
function updateUser(id, user) {
  return new User({ id }).save(user, {
    method: 'update',
    patch: true,
  });
}

/**
 * Delete a user.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function deleteUser(id) {
  return new User({ id }).fetch().then((user) => user.destroy());
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByUserName,
};
