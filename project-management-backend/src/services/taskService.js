const Boom = require('@hapi/boom');

const User = require('../models/user.js');
const Task = require('../models/task.js');

/**
 * Get all projects.
 *
 * @returns {Promise}
 */
function getAllTasks() {
  return Task.fetchAll({ withRelated: ['assignedUser', 'project', 'taggedUsers'] });
}

/**
 * Get a task by id.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function getTask(id) {
  return new Task({ id })
    .fetch({ withRelated: ['assignedUser', 'project', 'taggedUsers', 'comments'] })
    .then((task) => task)
    .catch(Task.NotFoundError, () => {
      throw Boom.notFound('Task not found');
    });
}

/**
 * Get related tasks.
 *
 *  @param   {Object}  currentUser
 * @returns {Promise}
 */
function getRelatedTasks(currentUser) {
  return new Promise((resolve, reject) => {
    User.where({ id: currentUser.id })
      .fetch({ withRelated: ['tasks', 'assignedTasks'] })
      .then((data) => resolve(data.relations))
      .catch((err) => reject(err));
  });
}

/**
 * Get a task by title.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function getTaskByTitle(title) {
  return new Task({ title })
    .fetch()
    .then((task) => task)
    .catch(Task.NotFoundError, () => {
      throw Boom.notFound('Task not found');
    });
}

/**
 * Create new task.
 *
 * @param   {Object}  task
 * @returns {Promise}
 */
function createTask(task) {
  return new Promise((resolve, reject) => {
    new Task({
      id: task.id,
      title: task.title,
      description: task.description,
      assigned_user: task.assigned_user,
      associated_project: task.associated_project,
      deadline: task.deadline,
    })
      .save(null, { method: 'insert' })
      .then((data) => {
        data
          .taggedUsers()
          .attach(task.users)
          .then((result) => resolve(data))
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => reject(Boom.notAcceptable('Invalid data for creating task')));
  });
}

/**
 * Update a task.
 *
 * @param   {String}  id
 * @param   {Object}  task
 * @returns {Promise}
 */
function updateTask(id, task) {
  return new Promise((resolve, reject) => {
    let users = task.users;
    task.users = undefined;
    new Task({ id })
      .save(task, { method: 'update', patch: true })
      .then((data) => {
        if (users) {
          data
            .taggedUsers()
            .detach()
            .then((result) => {
              data
                .taggedUsers()
                .attach(users)
                .then((result) => resolve(data))
                .catch((err) => {
                  throw err;
                });
            })
            .catch((err) => {
              throw err;
            });
        }
        resolve(data);
      })
      .catch((err) => reject(Boom.notAcceptable('Invalid data for updating task')));
  });
}

/**
 * Delete a task.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function deleteTask(id) {
  return new Task({ id }).fetch().then((task) => task.destroy());
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskByTitle,
  getRelatedTasks,
};
