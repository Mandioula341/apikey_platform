const axios = require('axios');
const fs = require('fs');
const chemin = require('path');
const { enregistrerLog } = require('./logsController');
const { incrementerCompteur } = require('./compteurController');
require('dotenv').config();

const convertirTexteEnAudio = async (requete, reponse) => {
  const { texte, langue } = requete.body;
  const cleId = requete.body.cleId || null;
  const apiId = requete.body.apiId || 1; // 1 = TTS dans la table apis

  if (!texte || !langue) {
    return reponse.status(400).json({
      message: 'Le texte et la langue sont obligatoires'
    });
  }

  const debut = Date.now();

  try {
    const resultat = await axios.get('https://api.voicerss.org/', {
      params: {
        key: process.env.VOICERSS_CLE_API,
        hl: langue,
        src: texte,
        c: 'MP3',
        f: '44khz_16bit_stereo'
      },
      responseType: 'arraybuffer'
    });

    const nomFichier = `audio_${Date.now()}.mp3`;
    const cheminFichier = chemin.join('uploads', nomFichier);
    fs.writeFileSync(cheminFichier, resultat.data);

    const tempsExecution = (Date.now() - debut) / 1000;

    const donnéesReponse = {
      message: 'Conversion réussie',
      fichierAudio: `http://localhost:3000/uploads/${nomFichier}`
    };

    await enregistrerLog(cleId, apiId, tempsExecution, 'reussi');
    await incrementerCompteur(cleId);

    reponse.status(200).json(donnéesReponse);

  } catch (erreur) {
    const tempsExecution = (Date.now() - debut) / 1000;
    await enregistrerLog(cleId, apiId, tempsExecution, 'echoue');
    reponse.status(500).json({
      message: 'Erreur lors de la conversion texte en audio',
      erreur: erreur.message
    });
  }
};

module.exports = { convertirTexteEnAudio };