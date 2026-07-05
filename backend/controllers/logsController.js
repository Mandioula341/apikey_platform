const baseDeDonnees = require('../config/db');

const enregistrerLog = async (cleId, apiId, tempsExecution, statut) => {
  try {
    await baseDeDonnees.execute(
      `INSERT INTO log_consommation (cle_id, api_id, tempsExecution, statut) 
       VALUES (?, ?, ?, ?)`,
      [cleId, apiId, tempsExecution, statut]
    );
  } catch (erreur) {
    console.log('Erreur enregistrement log :', erreur.message);
  }
};

const obtenirLogs = async (requete, reponse) => {
  try {
    const [lignes] = await baseDeDonnees.execute(
      `SELECT l.*, c.valeurCle, a.nom as nomApi 
       FROM log_consommation l
       JOIN cles_api c ON l.cle_id = c.id
       JOIN apis a ON l.api_id = a.id
       ORDER BY l.dateAppel DESC`
    );
    reponse.status(200).json({
      message: 'Logs récupérés avec succès',
      logs: lignes
    });
  } catch (erreur) {
    reponse.status(500).json({
      message: 'Erreur lors de la récupération des logs',
      erreur: erreur.message
    });
  }
};

const obtenirLogsParCle = async (requete, reponse) => {
  const { cleId } = requete.params;
  try {
    const [lignes] = await baseDeDonnees.execute(
      `SELECT l.*, a.nom as nomApi 
       FROM log_consommation l
       JOIN apis a ON l.api_id = a.id
       WHERE l.cle_id = ?
       ORDER BY l.dateAppel DESC`,
      [cleId]
    );
    reponse.status(200).json({
      message: 'Logs récupérés avec succès',
      logs: lignes
    });
  } catch (erreur) {
    reponse.status(500).json({
      message: 'Erreur lors de la récupération des logs',
      erreur: erreur.message
    });
  }
};

module.exports = { enregistrerLog, obtenirLogs, obtenirLogsParCle };