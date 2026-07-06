const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { nom, prenom, email, motDePasse, role } = req.body;

  if (!nom || !prenom || !email || !motDePasse) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const [existants] = await pool.query(
      "SELECT id FROM utilisateurs WHERE email = ?",
      [email]
    );
    if (existants.length > 0) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    const hash = await bcrypt.hash(motDePasse, 10);

    // Pas de système d'envoi d'email ici : on vérifie le compte directement (estVerifie = 1)
    await pool.query(
      `INSERT INTO utilisateurs (nom, prenom, email, motDePasse, role, estVerifie)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [nom, prenom, email, hash, role || "developpeur"]
    );

    return res.status(201).json({ message: "Compte créé avec succès." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, motDePasse } = req.body;

  if (!email || !motDePasse) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM utilisateurs WHERE email = ?",
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const utilisateur = rows[0];
    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!motDePasseValide) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.json({
      token,
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
});

module.exports = router;
