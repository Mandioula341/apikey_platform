const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/logs — historique des appels de l'utilisateur connecté (toutes ses clés)
router.get("/", auth, async (req, res) => {
  try {
    const [logs] = await pool.query(
      `SELECT lc.id, lc.dateAppel, lc.tempsExecution, lc.statut, a.nom AS nomApi
       FROM log_consommation lc
       INNER JOIN cles_api c ON c.id = lc.cle_id
       INNER JOIN apis a ON a.id = lc.api_id
       WHERE c.utilisateur_id = ?
       ORDER BY lc.dateAppel DESC
       LIMIT 100`,
      [req.utilisateurId]
    );
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération de l'historique." });
  }
});

module.exports = router;
