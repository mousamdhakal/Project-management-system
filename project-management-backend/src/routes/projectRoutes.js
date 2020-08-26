const { Router } = require('express');

const {
  fetchAll,
  fetchById,
  fetchRelatedProjects,
  create,
  update,
  remove,
} = require('../controllers/projectController');
const { findAndValidateProject, findProject, projectValidator } = require('../validators/projectValidator');

const authorize = require('../middlewares/authorize');
const roles = require('../utils/roles');

const router = Router();

/**
 * GET /api/projects
 */
router.get('/', authorize([roles[0], roles[1]]), fetchAll);

/**
 * GET /api/projects/related
 */
router.get('/related', fetchRelatedProjects);

/**
 * GET /api/projects/:id
 */
router.get('/:id', authorize([roles[0], roles[1]]), findAndValidateProject, fetchById);

/**
 * POST /api/projects
 */
router.post('/', authorize([roles[0]]), projectValidator, create);

/**
 * PUT /api/projects/:id
 */
router.put('/:id', authorize([roles[0], roles[1]]), findAndValidateProject, projectValidator, update);

/**
 * DELETE /api/projects/:id
 */
router.delete('/:id', authorize([roles[0]]), findProject, remove);

module.exports = router;
