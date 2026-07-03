const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/authController');

// Route inscription
router.post('/register', register);

// Route connexion
router.post('/login', login);

// Route vérification email
router.get('/verify/:token', verifyEmail);

module.exports = router;
const { verifierToken } = require('../middlewares/authMiddleware');

// Route protégée (test)
router.get('/profil', verifierToken, (req, res) => {
    res.json({ 
        message: '✅ Accès autorisé !',
        utilisateur: req.utilisateur 
    });
});