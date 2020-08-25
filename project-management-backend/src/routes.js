const router = require('express').Router();

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authenticate = require('./middlewares/authenticate');

/**
 * GET /api
 */
router.get('/', (req, res) => {
  res.json({
    app: process.env.APP_NAME || 'Project Management API',
    apiVersion: process.env.APP_VERSION || '1.0.0',
  });
});

router.use('/users', userRoutes);
router.use('/projects', authenticate, projectRoutes);
router.use('/tasks', authenticate, taskRoutes);
router.use('/comments', authenticate, commentRoutes);

module.exports = router;
