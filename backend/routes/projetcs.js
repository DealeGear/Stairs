const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const { ensureAuthenticated } = require('../middlewares/auth');

// Middleware de internacionalização
const i18nMiddleware = require('../middlewares/i18n');
router.use(i18nMiddleware);

// Rotas de projetos
router.get('/', ensureAuthenticated, projectsController.getUserProjects);
router.get('/:id', ensureAuthenticated, projectsController.getProject);
router.post('/', ensureAuthenticated, projectsController.createProject);
router.put('/:id', ensureAuthenticated, projectsController.updateProject);
router.delete('/:id', ensureAuthenticated, projectsController.deleteProject);
router.post('/:id/share', ensureAuthenticated, projectsController.shareProject);
router.get('/shared/:token', projectsController.getSharedProject);

module.exports = router;