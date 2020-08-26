const HttpStatus = require('http-status-codes');
const Boom = require('@hapi/boom');

const {
  getAllProjects,
  getProject,
  getRelatedProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectByTitle,
} = require('../services/projectService');

const { v4: uuidv4 } = require('uuid');

/**
 * Get all projects.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchAll(req, res, next) {
  getAllProjects()
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Get a project by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchById(req, res, next) {
  getProject(req.params.id)
    .then((data) => {
      data.relations.projectManager.attributes.password = undefined;
      data.relations.users.models = data.relations.users.models.map((model) => {
        model.attributes.password = undefined;
        return model;
      });
      res.json(data);
    })
    .catch((err) => next(err));
}

/**
 * Get all related projects.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function fetchRelatedProjects(req, res, next) {
  getRelatedProjects(req.user)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

/**
 * Create a new project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function create(req, res, next) {
  const body = req.body;

  // Get unique id for the project
  body.id = uuidv4();

  // Check if the project with that title already exists
  getProjectByTitle(body.title)
    .then((result) => {
      next(Boom.conflict(`Project with title ${body.title} already exists`));
    })
    .catch((err) => {
      createProject(req.body)
        .then((data) => res.status(HttpStatus.CREATED).json({ data }))
        .catch((err) => next(err));
    });
}

/**
 * Update a project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function update(req, res, next) {
  updateProject(req.params.id, req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

/**
 * Delete a project.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function remove(req, res, next) {
  deleteProject(req.params.id)
    .then((data) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err) => next(err));
}

module.exports = {
  fetchAll,
  fetchById,
  fetchRelatedProjects,
  create,
  update,
  remove,
};
