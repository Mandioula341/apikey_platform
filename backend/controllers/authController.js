const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const { createUser, findUserByEmail, verifyUserToken } = require('../models/userModel');
const { envoyerEmailConfirmation } = require('../services/emailService');

// ===== INSCRIPTION =====
const register = async (req, res) => {
    try {
        const { nom, prenom, email, motDePasse, role } = req.body;

        // 1. Vérifier que tous les champs sont remplis
        if (!nom || !prenom || !email || !motDePasse) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
        }

        // 2. Vérifier si l'email existe déjà
        findUserByEmail(email, async (err, results) => {
            if (err) return res.status(500).json({ message: 'Erreur serveur.' });
            if (results.length > 0) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
            }

            // 3. Hasher le mot de passe
            const hash = await bcrypt.hash(motDePasse, 10);

            // 4. Générer un token de vérification unique
            const token = crypto.randomBytes(32).toString('hex');

            // 5. Créer l'utilisateur en base de données
            createUser(nom, prenom, email, hash, role || 'public', token, (err, result) => {
                if (err) return res.status(500).json({ message: 'Erreur lors de la création du compte.' });

                // 6. Envoyer l'email de confirmation
                envoyerEmailConfirmation(email, prenom, token)
                    .then(() => {
                        res.status(201).json({
                            message: '✅ Compte créé ! Vérifiez votre email pour confirmer votre inscription.'
                        });
                    })
                    .catch((emailErr) => {
                        console.error('Erreur email:', emailErr);
                        res.status(201).json({
                            message: '✅ Compte créé mais erreur lors de l\'envoi de l\'email.'
                        });
                    });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// ===== VERIFICATION EMAIL =====
const verifyEmail = (req, res) => {
    const { token } = req.params;

    verifyUserToken(token, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur.' });
        if (results.length === 0) {
            return res.status(400).json({ message: 'Token invalide ou expiré.' });
        }

        res.status(200).json({ message: '✅ Compte confirmé ! Vous pouvez maintenant vous connecter.' });
    });
};

// ===== CONNEXION =====
const login = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;

        // 1. Vérifier que les champs sont remplis
        if (!email || !motDePasse) {
            return res.status(400).json({ message: 'Email et mot de passe requis.' });
        }

        // 2. Chercher l'utilisateur
        findUserByEmail(email, async (err, results) => {
            if (err) return res.status(500).json({ message: 'Erreur serveur.' });
            if (results.length === 0) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
            }

            const utilisateur = results[0];

            // 3. Vérifier si le compte est confirmé
            if (!utilisateur.estVerifie) {
                return res.status(401).json({ message: 'Veuillez confirmer votre email avant de vous connecter.' });
            }

            // 4. Vérifier le mot de passe
            const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
            if (!motDePasseValide) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
            }

            // 5. Générer le token JWT
            const token = jwt.sign(
                { id: utilisateur.id, email: utilisateur.email, role: utilisateur.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                message: '✅ Connexion réussie !',
                token,
                utilisateur: {
                    id: utilisateur.id,
                    nom: utilisateur.nom,
                    prenom: utilisateur.prenom,
                    email: utilisateur.email,
                    role: utilisateur.role
                }
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = { register, login, verifyEmail };