const Boom = require('@hapi/boom');

const Task = require('../models/task.js');

/**
 * Get all projects.
 *
 * @returns {Promise}
 */
function getAllTasks() {
  return Task.fetchAll();
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
 * Get a task.y title.
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
  return new Task({
    id: task.id,
    title: task.title,
    description: task.description,
    assigned_user: task.assigned_user,
    associated_project: task.associated_project,
    deadline: task.deadline,
  }).save(null, { method: 'insert' });
}

/**
 * Update a task.
 *
 * @param   {String}  id
 * @param   {Object}  task
 * @returns {Promise}
 */
function updateTask(id, task) {
  return new Task({ id }).save({
    title: task.title,
    description: task.description,
    assigned_user: task.assigned_user,
    associated_project: task.associated_project,
    deadline: task.deadline,
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
};
