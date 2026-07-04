const { creerCle, listerCles, revoquerCle, verifierQuota } = require('../models/cleApiModel');

// Créer une nouvelle clé API
const creer = (req, res) => {
    const utilisateur_id = req.utilisateur.id;
    const { quotaMax } = req.body;

    creerCle(utilisateur_id, quotaMax || 200, (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });
        res.status(201).json({ 
            message: '✅ Clé API créée avec succès !',
            cleId: result.insertId
        });
    });
};

// Lister les clés d'un utilisateur
const lister = (req, res) => {
    const utilisateur_id = req.utilisateur.id;

    listerCles(utilisateur_id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });
        res.status(200).json({ cles: results });
    });
};

// Révoquer une clé API
const revoquer = (req, res) => {
    const utilisateur_id = req.utilisateur.id;
    const { id } = req.params;

    revoquerCle(id, utilisateur_id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Clé API non trouvée.' });
        }
        res.status(200).json({ message: '✅ Clé API révoquée avec succès !' });
    });
};

// Vérifier le quota d'une clé
const verifier = (req, res) => {
    const { valeurCle } = req.params;

    verifierQuota(valeurCle, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });
        if (results.length === 0) {
            return res.status(403).json({ message: '❌ Clé invalide, révoquée ou quota dépassé.' });
        }
        const cle = results[0];
        res.status(200).json({ 
            message: '✅ Clé valide !',
            appelsRestants: cle.quotaMax - cle.nombreAppelsUtilises
        });
    });
};

module.exports = { creer, lister, revoquer, verifier };