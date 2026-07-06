const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/demandes — l'utilisateur demande l'accès à une API du catalogue
// ⚠️ Nécessite la table `demandes_api` (voir sql/demandes_api.sql)
router.post("/", auth, async (req, res) => {
  const { apiId, message } = req.body;

  if (!apiId || !message) {
    return res.status(400).json({ message: "L'API et le message sont requis." });
  }

  try {
    await pool.query(
      `INSERT INTO demandes_api (utilisateur_id, api_id, message, statut)
       VALUES (?, ?, ?, 'en_attente')`,
      [req.utilisateurId, apiId, message]
    );
    res.status(201).json({ message: "Demande envoyée." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de l'envoi de la demande." });
  }
});

module.exports = router;
