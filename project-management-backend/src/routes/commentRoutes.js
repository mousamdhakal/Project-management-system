const { Router } = require('express');

const { fetchAll, fetchById, create, update, remove } = require('../controllers/commentController');
const { findComment, commentValidator } = require('../validators/commentValidator');

const authorize = require('../middlewares/authorize');
const roles = require('../utils/roles');

const router = Router();

/**
 * GET /api/comments
 */
router.get('/', authorize([roles[0]]), fetchAll);

/**
 * GET /api/comments/:id
 */
router.get('/:id', authorize([roles[0]]), fetchById);

/**
 * POST /api/comments
 */
router.post('/', authorize([roles[0]]), commentValidator, create);

/**
 * PUT /api/comments/:id
 */
router.put('/:id', authorize([roles[0]]), findComment, commentValidator, update);

/**
 * DELETE /api/comments/:id
 */
router.delete('/:id', authorize([roles[0]]), findComment, remove);

module.exports = router;
