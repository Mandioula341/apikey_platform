const express = require('express');
const routeur = express.Router();
const controleurTraduction = require('../controllers/traductionController');

routeur.post('/traduire', controleurTraduction.traduireTexte);

module.exports = routeur;