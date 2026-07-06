const { exec } = require('child_process');
const fs = require('fs');
const chemin = require('path');
const { enregistrerLog } = require('./logsController');
const { incrementerCompteur } = require('./compteurController');
require('dotenv').config();

const transcrireAudio = async (requete, reponse) => {
  if (!requete.file) {
    return reponse.status(400).json({ message: 'Aucun fichier audio fourni' });
  }

  const cheminFichier = requete.file.path;
  const langue = requete.body.langue || 'fr';
  const cleId = requete.body.cleId || null;
  const apiId = requete.body.apiId || 2; // 2 = ASR dans la table apis

  const debut = Date.now();
  const cheminAbsoluUploads = chemin.resolve('uploads');
  const commande = `whisper "${cheminFichier}" --model tiny --language ${langue} --output_format txt --output_dir "${cheminAbsoluUploads}"`;

  exec(commande, async (erreur, sortie, erreurSortie) => {
    if (erreur) {
      const tempsExecution = (Date.now() - debut) / 1000;
      await enregistrerLog(cleId, apiId, tempsExecution, 'echoue');
      return reponse.status(500).json({
        message: 'Erreur lors de la transcription',
        erreur: erreur.message
      });
    }

    const fichiersDansUploads = fs.readdirSync('uploads/');
    const fichierTexte = fichiersDansUploads.find(f => f.endsWith('.txt'));

    if (!fichierTexte) {
      const tempsExecution = (Date.now() - debut) / 1000;
      await enregistrerLog(cleId, apiId, tempsExecution, 'echoue');
      return reponse.status(500).json({ message: 'Fichier de transcription introuvable' });
    }

    const cheminTexte = chemin.join('uploads', fichierTexte);
    const transcription = fs.readFileSync(cheminTexte, 'utf8');

    fs.unlinkSync(cheminFichier);
    fs.unlinkSync(cheminTexte);

    const tempsExecution = (Date.now() - debut) / 1000;

    await enregistrerLog(cleId, apiId, tempsExecution, 'reussi');
    await incrementerCompteur(cleId);

    reponse.status(200).json({
      message: 'Transcription réussie',
      transcription
    });
  });
};

module.exports = { transcrireAudio };