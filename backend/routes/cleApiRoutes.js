const express = require('express');
const router = express.Router();
const { creer, lister, revoquer, verifier } = require('../controllers/cleApiController');
const { verifierToken } = require('../middlewares/authMiddleware');

// Toutes ces routes nécessitent un token JWT
router.post('/creer', verifierToken, creer);
router.get('/lister', verifierToken, lister);
router.put('/revoquer/:id', verifierToken, revoquer);
router.get('/verifier/:valeurCle', verifierToken, verifier);

module.exports = router;