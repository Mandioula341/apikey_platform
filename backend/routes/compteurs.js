const express = require('express');
const routeur = express.Router();
const controleurCompteur = require('../controllers/compteurController');

routeur.get('/', controleurCompteur.obtenirCompteurs);

module.exports = routeur;