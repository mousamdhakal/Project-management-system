const { Router } = require('express');

const { fetchAll, fetchById, create, update, remove } = require('../controllers/taskController');
const { findTask, taskValidator } = require('../validators/taskValidator');

const authorize = require('../middlewares/authorize');
const roles = require('../utils/roles');

const router = Router();

/**
 * GET /api/tasks
 */
router.get('/', authorize([roles[0]]), fetchAll);

/**
 * GET /api/tasks/:id
 */
router.get('/:id', authorize([roles[0]]), fetchById);

/**
 * POST /api/tasks
 */
router.post('/', authorize([roles[0]]), taskValidator, create);

/**
 * PUT /api/tasks/:id
 */
router.put('/:id', authorize([roles[0]]), findTask, taskValidator, update);

/**
 * DELETE /api/tasks/:id
 */
router.delete('/:id', authorize([roles[0]]), findTask, remove);

module.exports = router;
