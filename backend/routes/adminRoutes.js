const express = require('express');
const router = express.Router();
const { getUtilisateurs, getCles, getLogs, 
        postFacturation, approuverDemande, 
        rejeterDemande } = require('../controllers/adminController');
const { verifierToken, verifierAdmin } = require('../middlewares/authMiddleware');

// Toutes ces routes nécessitent un token JWT + droits admin
router.get('/utilisateurs', verifierToken, verifierAdmin, getUtilisateurs);
router.get('/cles', verifierToken, verifierAdmin, getCles);
router.get('/logs', verifierToken, verifierAdmin, getLogs);
router.post('/facturation', verifierToken, verifierAdmin, postFacturation);
router.post('/demandes/:id/approuver', verifierToken, verifierAdmin, approuverDemande);
router.post('/demandes/:id/rejeter', verifierToken, verifierAdmin, rejeterDemande);

module.exports = router;