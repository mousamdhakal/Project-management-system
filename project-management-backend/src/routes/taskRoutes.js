const { Router } = require('express');

const { fetchAll, fetchRelatedTasks, fetchById, create, update, remove } = require('../controllers/taskController');
const {
  taskValidator,
  taskAuthorizer,
  taskCreationAuthorizer,
  assignUpdateValidator,
  updateValidator,
  validateAssignUpdate,
} = require('../validators/taskValidator');

const authorize = require('../middlewares/authorize');
const roles = require('../utils/roles');

const router = Router();

/**
 * GET /api/tasks/
 */
router.get('/', fetchRelatedTasks);

/**
 * GET /api/tasks/all
 */
router.get('/all', authorize([roles[0]]), fetchAll);

/**
 * GET /api/tasks/:id
 */
router.get('/:id', authorize([roles[0], roles[1], roles[2]]), taskAuthorizer, fetchById);

/**
 * POST /api/tasks
 */
router.post('/', authorize([roles[0], roles[1], roles[2]]), taskCreationAuthorizer, taskValidator, create);

/**
 * PUT /api/tasks/assigned/:id
 */
router.put('/assigned/:id', authorize([roles[3]]), assignUpdateValidator, validateAssignUpdate, update);

/**
 * PUT /api/tasks/:id
 */
router.put('/:id', authorize([roles[0], roles[1], roles[2], roles[3]]), taskAuthorizer, updateValidator, update);

/**
 * DELETE /api/tasks/:id
 */
router.delete('/:id', authorize([roles[0], roles[1], roles[2]]), taskAuthorizer, remove);

module.exports = router;
