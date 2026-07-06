const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/facturation — factures de l'utilisateur connecté, la plus récente en premier
router.get("/", auth, async (req, res) => {
  try {
    const [factures] = await pool.query(
      "SELECT * FROM facturation WHERE utilisateur_id = ? ORDER BY dateGeneration DESC",
      [req.utilisateurId]
    );
    res.json(factures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération de la facturation." });
  }
});

module.exports = router;
