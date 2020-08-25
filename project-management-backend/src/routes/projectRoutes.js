const { Router } = require('express');

const { fetchAll, fetchById, create, update, remove } = require('../controllers/projectController');
const { findProject, projectValidator } = require('../validators/projectValidator');

const router = Router();

/**
 * GET /api/users
 */
router.get('/', fetchAll);

/**
 * GET /api/users/:id
 */
router.get('/:id', fetchById);

/**
 * POST /api/users
 */
router.post('/', projectValidator, create);

/**
 * PUT /api/users/:id
 */
router.put('/:id', findProject, projectValidator, update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findProject, remove);

module.exports = router;
