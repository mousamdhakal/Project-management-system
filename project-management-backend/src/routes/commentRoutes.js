const { Router } = require('express');

const { fetchAll, fetchById, create, update, remove } = require('../controllers/commentController');
const { findComment, commentValidator } = require('../validators/commentValidator');

const router = Router();

/**
 * GET /api/comments
 */
router.get('/', fetchAll);

/**
 * GET /api/comments/:id
 */
router.get('/:id', fetchById);

/**
 * POST /api/comments
 */
router.post('/', commentValidator, create);

/**
 * PUT /api/comments/:id
 */
router.put('/:id', findComment, commentValidator, update);

/**
 * DELETE /api/tasks/:id
 */
router.delete('/:id', findComment, remove);

module.exports = router;
