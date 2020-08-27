const Boom = require('@hapi/boom');

const roles = require('../utils/roles');
const User = require('../models/user.js');
const Project = require('../models/project.js');

/**
 * Get all projects.
 *
 * @returns {Promise}
 */
function getAllProjects() {
  return Project.fetchAll({ withRelated: ['users', 'projectManager'] });
}

/**
 * Get related projects.
 *
 *  @param   {Object}  currentUser
 * @returns {Promise}
 */
function getRelatedProjects(currentUser) {
  let related = [];
  if (currentUser.role === roles[1]) {
    related = ['managedProjects'];
  } else {
    related = ['projects'];
  }

  return new Promise((resolve, reject) => {
    User.where({ id: currentUser.id })
      .fetch({ withRelated: related })
      .then((data) => resolve(data.relations))
      .catch((err) => reject(err));
  });
}

/**
 * Get a project.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function getProject(id) {
  return new Project({ id })
    .fetch({ withRelated: ['projectManager', 'users', 'tasks'] })
    .then((project) => project)
    .catch(Project.NotFoundError, () => {
      throw Boom.notFound('Project not found');
    });
}

/**
 * Get a project by title.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function getProjectByTitle(title) {
  return new Project({ title })
    .fetch()
    .then((project) => project)
    .catch(Project.NotFoundError, () => {
      throw Boom.notFound('Project not found');
    });
}

/**
 * Create new project.
 *
 * @param   {Object}  project
 * @returns {Promise}
 */
function createProject(project) {
  return new Promise((resolve, reject) => {
    new Project({
      id: project.id,
      title: project.title,
      description: project.description,
      project_manager: project.project_manager,
    })
      .save(null, { method: 'insert' })
      .then((data) => {
        data
          .users()
          .attach(project.users)
          .then((result) => resolve(data))
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => reject(Boom.notAcceptable('Invalid data for creating project')));
  });
}

/**
 * Update a project.
 *
 * @param   {String}  id
 * @param   {Object}  project
 * @returns {Promise}
 */
function updateProject(id, project) {
  return new Promise((resolve, reject) => {
    new Project({ id })
      .save({
        title: project.title,
        description: project.description,
        project_manager: project.project_manager,
      })
      .then((data) => {
        data
          .users()
          .detach()
          .then((result) => {
            data
              .users()
              .attach(project.users)
              .then((result) => resolve(data))
              .catch((err) => {
                throw err;
              });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => reject(Boom.notAcceptable('Invalid data for updating project')));
  });
}

/**
 * Delete a project.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
function deleteProject(id) {
  return new Project({ id }).fetch().then((project) => project.destroy());
}

module.exports = {
  getAllProjects,
  getProject,
  getRelatedProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectByTitle,
};
