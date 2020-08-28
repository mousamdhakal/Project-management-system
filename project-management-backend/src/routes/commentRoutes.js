const { Router } = require('express');

const { fetchAll, fetchRelated, fetchById, create, update, remove } = require('../controllers/commentController');
const {
  commentValidator,
  validateCommentOwnership,
  validateProjectInvolvement,
  updateValidator,
} = require('../validators/commentValidator');

const authorize = require('../middlewares/authorize');
const roles = require('../utils/roles');

const router = Router();

/**
 * GET /api/comments/
 */
router.get('/', fetchRelated);

/**
 * GET /api/comments/all
 */
router.get('/all', authorize([roles[0]]), fetchAll);

/**
 * GET /api/comments/:id
 */
router.get('/:id', authorize([roles[0]]), fetchById);

/**
 * POST /api/comments
 */
router.post(
  '/',
  authorize([roles[0], roles[1], roles[2], roles[3]]),
  commentValidator,
  validateProjectInvolvement,
  create
);

/**
 * PUT /api/comments/:id
 */
router.put(
  '/:id',
  authorize([roles[0], roles[1], roles[2], roles[3]]),
  validateCommentOwnership,
  updateValidator,
  update
);

/**
 * DELETE /api/comments/:id
 */
router.delete('/:id', authorize([roles[0], roles[1], roles[2], roles[3]]), validateCommentOwnership, remove);

module.exports = router;
