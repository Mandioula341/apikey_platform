const axios = require('axios');
const { enregistrerLog } = require('./logsController');
const { incrementerCompteur } = require('./compteurController');
require('dotenv').config();

const traduireTexte = async (requete, reponse) => {
  const { texte, langueSource, langueCible } = requete.body;
  const cleId = requete.body.cleId || null;
  const apiId = requete.body.apiId || 3; // 3 = Traduction dans la table apis

  if (!texte || !langueSource || !langueCible) {
    return reponse.status(400).json({
      message: 'Le texte, la langue source et la langue cible sont obligatoires'
    });
  }

  const debut = Date.now();

  try {
    const resultat = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: texte,
        langpair: `${langueSource}|${langueCible}`
      }
    });

    const tempsExecution = (Date.now() - debut) / 1000;

    const donnéesReponse = {
      message: 'Traduction réussie',
      texteOriginal: texte,
      langueSource: langueSource,
      langueCible: langueCible,
      traduction: resultat.data.responseData.translatedText
    };

    await enregistrerLog(cleId, apiId, tempsExecution, 'reussi');
    await incrementerCompteur(cleId);

    reponse.status(200).json(donnéesReponse);

  } catch (erreur) {
    const tempsExecution = (Date.now() - debut) / 1000;
    await enregistrerLog(cleId, apiId, tempsExecution, 'echoue');
    reponse.status(500).json({
      message: 'Erreur lors de la traduction',
      erreur: erreur.message
    });
  }
};

module.exports = { traduireTexte };