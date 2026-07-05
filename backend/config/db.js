const mysql2 = require('mysql2');
require('dotenv').config();

const baseDeDonnees = mysql2.createPool({
  host: process.env.DB_HOTE,
  user: process.env.DB_UTILISATEUR,
  password: process.env.DB_MOT_DE_PASSE,
  database: process.env.DB_NOM
});

module.exports = baseDeDonnees.promise();