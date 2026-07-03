const db = require('../config/db');

// Créer un nouvel utilisateur
const createUser = (nom, prenom, email, motDePasse, role, token, callback) => {
    const sql = `INSERT INTO utilisateurs 
                 (nom, prenom, email, motDePasse, role, tokenVerification) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [nom, prenom, email, motDePasse, role, token], callback);
};

// Trouver un utilisateur par email
const findUserByEmail = (email, callback) => {
    const sql = `SELECT * FROM utilisateurs WHERE email = ?`;
    db.query(sql, [email], callback);
};

// Vérifier et activer le compte via token
const verifyUserToken = (token, callback) => {
    const sql = `UPDATE utilisateurs 
                 SET estVerifie = TRUE, tokenVerification = NULL 
                 WHERE tokenVerification = ?`;
    db.query(sql, [token], callback);
};

module.exports = { createUser, findUserByEmail, verifyUserToken };