const express = require("express");
const crypto = require("crypto");
const pool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/cles — liste des clés de l'utilisateur connecté
router.get("/", auth, async (req, res) => {
  try {
    const [cles] = await pool.query(
      "SELECT * FROM cles_api WHERE utilisateur_id = ? ORDER BY dateCreation DESC",
      [req.utilisateurId]
    );
    res.json(cles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des clés." });
  }
});

// POST /api/cles — génère une nouvelle clé
router.post("/", auth, async (req, res) => {
  try {
    const valeurCle = "sk_" + crypto.randomBytes(32).toString("hex");
    const [resultat] = await pool.query(
      `INSERT INTO cles_api (utilisateur_id, valeurCle, quotaMax, nombreAppelsUtilises, statut)
       VALUES (?, ?, 200, 0, 'active')`,
      [req.utilisateurId, valeurCle]
    );
    const [[nouvelleCle]] = await pool.query(
      "SELECT * FROM cles_api WHERE id = ?",
      [resultat.insertId]
    );
    res.status(201).json(nouvelleCle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la génération de la clé." });
  }
});

// Note : la révocation d'une clé est réservée à l'admin (Membre 4) et n'est pas
// exposée ici — un utilisateur simple ne doit pas pouvoir révoquer une clé.

module.exports = router;
