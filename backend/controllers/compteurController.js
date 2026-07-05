const baseDeDonnees = require('../config/db');

const incrementerCompteur = async (cleId) => {
  try {
    await baseDeDonnees.execute(
      `UPDATE cles_api 
       SET nombreAppelsUtilises = nombreAppelsUtilises + 1
       WHERE id = ?`,
      [cleId]
    );
  } catch (erreur) {
    console.log('Erreur incrémentation compteur :', erreur.message);
  }
};

const obtenirCompteurs = async (requete, reponse) => {
  try {
    const [lignes] = await baseDeDonnees.execute(
      `SELECT c.*, u.nom, u.prenom 
       FROM cles_api c
       JOIN utilisateurs u ON c.utilisateur_id = u.id`
    );
    reponse.status(200).json({
      message: 'Compteurs récupérés avec succès',
      compteurs: lignes
    });
  } catch (erreur) {
    reponse.status(500).json({
      message: 'Erreur lors de la récupération des compteurs',
      erreur: erreur.message
    });
  }
};

module.exports = { incrementerCompteur, obtenirCompteurs };