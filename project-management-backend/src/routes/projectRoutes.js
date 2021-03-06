const { Router } = require('express');

const {
  fetchAll,
  fetchById,
  fetchRelatedProjects,
  create,
  update,
  remove,
} = require('../controllers/projectController');
const {
  projectAuthorizer,
  projectValidator,
  updateValidator,
  projectManagerValidator,
  convertNamesToIds,
} = require('../validators/projectValidator');

const authorize = require('../middlewares/authorize');
const roles = require('../utils/roles');

const router = Router();

/**
 * GET /api/projects/
 */
router.get('/', fetchRelatedProjects);

/**
 * GET /api/projects/all
 */
router.get('/all', authorize([roles[0], roles[1]]), fetchAll);

/**
 * GET /api/projects/:id
 */
router.get('/:id', authorize([roles[0], roles[1], roles[2], roles[3]]), projectAuthorizer, fetchById);

/**
 * POST /api/projects
 */
router.post('/', authorize([roles[0]]), projectValidator, projectManagerValidator, convertNamesToIds, create);

/**
 * PUT /api/projects/:id
 */
router.put(
  '/:id',
  authorize([roles[0], roles[1]]),
  projectAuthorizer,
  updateValidator,
  projectManagerValidator,
  convertNamesToIds,
  update
);

/**
 * DELETE /api/projects/:id
 */
router.delete('/:id', authorize([roles[0]]), projectAuthorizer, remove);

module.exports = router;
