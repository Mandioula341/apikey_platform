const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifierToken = (req, res, next) => {
    // 1. Récupérer le token dans le header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Vérifier si le token existe
    if (!token) {
        return res.status(401).json({ 
            message: 'Accès refusé. Token manquant.' 
        });
    }

    // 3. Vérifier si le token est valide
    jwt.verify(token, process.env.JWT_SECRET, (err, utilisateur) => {
        if (err) {
            return res.status(403).json({ 
                message: ' Token invalide ou expiré.' 
            });
        }

        // 4. Token valide → on continue
        req.utilisateur = utilisateur;
        next();
    });
};

// Middleware pour vérifier si l'utilisateur est admin
const verifierAdmin = (req, res, next) => {
    if (req.utilisateur.role !== 'admin') {
        return res.status(403).json({ 
            message: ' Accès refusé. Droits administrateur requis.' 
        });
    }
    next();
};

module.exports = { verifierToken, verifierAdmin };