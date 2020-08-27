const { Router } = require('express');

const { fetchAll, fetchById, fetchByToken, create, update, remove, login } = require('../controllers/userController');
const { findUser, userValidator } = require('../validators/userValidator');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const roles = require('../utils/roles');

const router = Router();

/**
 * GET /api/users
 */
router.get('/', authenticate, authorize([roles[0]]), fetchAll);

/**
 * GET /api/users/this
 */
router.get('/this', authenticate, fetchByToken);

/**
 * GET /api/users/:id
 */
router.get('/:id', authenticate, authorize([roles[0]]), fetchById);

/**
 * POST /api/users
 */
router.post('/', authenticate, authorize([roles[0]]), userValidator, create);

/**
 * POST /api/users/login
 */
router.post('/login', login);

/**
 * PUT /api/users/:id
 */
router.put('/:id', authenticate, authorize([roles[0]]), findUser, userValidator, update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', authenticate, authorize([roles[0]]), findUser, remove);

module.exports = router;
