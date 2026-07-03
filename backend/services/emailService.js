const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuration du transporteur Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Fonction d'envoi d'email de confirmation
const envoyerEmailConfirmation = (email, nom, token) => {
    const lienConfirmation = `http://localhost:5000/api/auth/verify/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Confirmez votre inscription sur apikey platform',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1a7a52;">Bienvenue sur SenAPI IA !</h2>
                <p>Bonjour <strong>${nom}</strong>,</p>
                <p>Merci de vous être inscrit(e) sur SenAPI IA.</p>
                <p>Pour activer votre compte, cliquez sur le bouton ci-dessous :</p>
                <a href="${lienConfirmation}" 
                   style="background-color: #1a7a52; color: white; padding: 12px 24px; 
                          text-decoration: none; border-radius: 5px; display: inline-block;">
                    Confirmer mon compte
                </a>
                <p style="margin-top: 20px; color: #666;">
                    Ce lien expire dans 15 minutes.
                </p>
                <p style="color: #666;">
                    Si vous n'êtes pas à l'origine de cette inscription, 
                    ignorez cet email.
                </p>
                <hr style="border-color: #1a7a52;">
                <p style="color: #999; font-size: 12px;">
                    SenAPI IA · ESP/UCAD · Dakar, Sénégal
                </p>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { envoyerEmailConfirmation };