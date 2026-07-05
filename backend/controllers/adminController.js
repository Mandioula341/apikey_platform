const { listerUtilisateurs, listerToutesCles, 
        listerLogs, genererFacture } = require('../models/adminModel');

// Lister tous les utilisateurs
const getUtilisateurs = (req, res) => {
    listerUtilisateurs((err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });
        res.status(200).json({ utilisateurs: results });
    });
};

// Lister toutes les clés API
const getCles = (req, res) => {
    listerToutesCles((err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });
        res.status(200).json({ cles: results });
    });
};

// Lister tous les logs
const getLogs = (req, res) => {
    listerLogs((err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });
        res.status(200).json({ logs: results });
    });
};

// Générer une facture
const postFacturation = (req, res) => {
    const { utilisateur_id, dateDebut, dateFin } = req.body;

    if (!utilisateur_id || !dateDebut || !dateFin) {
        return res.status(400).json({ 
            message: 'utilisateur_id, dateDebut et dateFin sont requis.' 
        });
    }

    genererFacture(utilisateur_id, dateDebut, dateFin, (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });
        res.status(201).json({ 
            message: '✅ Facture générée avec succès !',
            factureId: result.insertId
        });
    });
};

// Approuver une demande
const approuverDemande = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ 
        message: `✅ Demande ${id} approuvée avec succès !` 
    });
};

// Rejeter une demande
const rejeterDemande = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ 
        message: `✅ Demande ${id} rejetée avec succès !` 
    });
};

module.exports = { getUtilisateurs, getCles, getLogs, 
                   postFacturation, approuverDemande, rejeterDemande };