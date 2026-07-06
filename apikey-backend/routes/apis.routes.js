const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// GET /api/apis — catalogue des API disponibles (public, pas besoin d'être connecté)
router.get("/", async (req, res) => {
  try {
    const [apis] = await pool.query(
      "SELECT * FROM apis WHERE statut = 'disponible' ORDER BY nom"
    );
    res.json(apis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération du catalogue." });
  }
});

module.exports = router;
