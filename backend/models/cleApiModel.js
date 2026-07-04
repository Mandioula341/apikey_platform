const db = require('../config/db');
const crypto = require('crypto');

// Générer une clé API unique
const genererValeurCle = () => {
    return 'sk_' + crypto.randomBytes(32).toString('hex');
};

// Créer une nouvelle clé API
const creerCle = (utilisateur_id, quotaMax, callback) => {
    const valeurCle = genererValeurCle();
    const sql = `INSERT INTO cles_api 
                 (utilisateur_id, valeurCle, quotaMax) 
                 VALUES (?, ?, ?)`;
    db.query(sql, [utilisateur_id, valeurCle, quotaMax], callback);
};

// Lister les clés d'un utilisateur
const listerCles = (utilisateur_id, callback) => {
    const sql = `SELECT id, valeurCle, dateCreation, 
                 quotaMax, nombreAppelsUtilises, statut 
                 FROM cles_api 
                 WHERE utilisateur_id = ?`;
    db.query(sql, [utilisateur_id], callback);
};

// Révoquer une clé API
const revoquerCle = (id, utilisateur_id, callback) => {
    const sql = `UPDATE cles_api 
                 SET statut = 'revoquee' 
                 WHERE id = ? AND utilisateur_id = ?`;
    db.query(sql, [id, utilisateur_id], callback);
};

// Vérifier le quota d'une clé
const verifierQuota = (valeurCle, callback) => {
    const sql = `SELECT * FROM cles_api 
                 WHERE valeurCle = ? 
                 AND statut = 'active' 
                 AND nombreAppelsUtilises < quotaMax`;
    db.query(sql, [valeurCle], callback);
};

module.exports = { creerCle, listerCles, revoquerCle, verifierQuota };