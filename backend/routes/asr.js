const express = require('express');
const routeur = express.Router();
const multer = require('multer');
const controleurASR = require('../controllers/asrController');

const stockage = multer.diskStorage({
  destination: (requete, fichier, callback) => {
    callback(null, 'uploads/');
  },
  filename: (requete, fichier, callback) => {
    callback(null, Date.now() + '-' + fichier.originalname);
  }
});

const telechargement = multer({ storage: stockage });

routeur.post('/transcrire', telechargement.single('audio'), controleurASR.transcrireAudio);

module.exports = routeur;