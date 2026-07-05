const db = require('../config/db');

// Lister tous les utilisateurs
const listerUtilisateurs = (callback) => {
    const sql = `SELECT id, nom, prenom, email, role, 
                 dateInscription, estVerifie 
                 FROM utilisateurs`;
    db.query(sql, callback);
};

// Lister toutes les clés API
const listerToutesCles = (callback) => {
    const sql = `SELECT c.id, c.valeurCle, c.dateCreation, 
                 c.quotaMax, c.nombreAppelsUtilises, c.statut,
                 u.nom, u.prenom, u.email
                 FROM cles_api c
                 JOIN utilisateurs u ON c.utilisateur_id = u.id`;
    db.query(sql, callback);
};

// Lister tous les logs
const listerLogs = (callback) => {
    const sql = `SELECT l.id, l.dateAppel, l.tempsExecution, l.statut,
                 a.nom AS nomAPI,
                 u.nom AS nomUtilisateur, u.prenom
                 FROM log_consommation l
                 JOIN cles_api c ON l.cle_id = c.id
                 JOIN utilisateurs u ON c.utilisateur_id = u.id
                 JOIN apis a ON l.api_id = a.id`;
    db.query(sql, callback);
};

// Générer une facture pour un utilisateur
const genererFacture = (utilisateur_id, dateDebut, dateFin, callback) => {
    const sqlCount = `SELECT COUNT(*) AS nombreRequetes 
                      FROM log_consommation l
                      JOIN cles_api c ON l.cle_id = c.id
                      WHERE c.utilisateur_id = ?
                      AND l.dateAppel BETWEEN ? AND ?
                      AND l.statut = 'reussi'`;

    db.query(sqlCount, [utilisateur_id, dateDebut, dateFin], (err, results) => {
        if (err) return callback(err);

        const nombreRequetes = results[0].nombreRequetes;
        const montantTotal = nombreRequetes * 20; // 20 FCFA par appel

        const sqlInsert = `INSERT INTO facturation 
                           (utilisateur_id, dateDebut, dateFin, nombreRequetes, montantTotal)
                           VALUES (?, ?, ?, ?, ?)`;

        db.query(sqlInsert, [utilisateur_id, dateDebut, dateFin, nombreRequetes, montantTotal], callback);
    });
};

module.exports = { listerUtilisateurs, listerToutesCles, listerLogs, genererFacture };