const { Router } = require('express');

const { fetchAll, fetchById, create, update, remove } = require('../controllers/taskController');
const { findTask, taskValidator } = require('../validators/taskValidator');

const router = Router();

/**
 * GET /api/tasks
 */
router.get('/', fetchAll);

/**
 * GET /api/tasks/:id
 */
router.get('/:id', fetchById);

/**
 * POST /api/tasks
 */
router.post('/', taskValidator, create);

/**
 * PUT /api/tasks/:id
 */
router.put('/:id', findTask, taskValidator, update);

/**
 * DELETE /api/tasks/:id
 */
router.delete('/:id', findTask, remove);

module.exports = router;
