const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../middlewares/auth');

// Rota de login
router.post('/login', authController.login);

// Rota de cadastro
router.post('/register', authController.register);

// Rota de login com Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Redirecionar para o frontend com o token
        res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${req.user.token}`);
    }
);

// Rota de recuperação de senha
router.post('/forgot-password', authController.forgotPassword);

// Rota de redefinição de senha
router.post('/reset-password', authController.resetPassword);

// Rota para verificar se o usuário está autenticado
router.get('/check', ensureAuthenticated, (req, res) => {
    res.json({ user: req.user });
});

// Rota de logout
router.post('/logout', ensureAuthenticated, authController.logout);

module.exports = router;