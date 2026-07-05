const express = require('express');
const routeur = express.Router();
const controleurTTS = require('../controllers/ttsController');

routeur.post('/convertir', controleurTTS.convertirTexteEnAudio);

module.exports = routeur;