const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const routesTTS = require('./routes/tts');
const routesASR = require('./routes/asr');
const routesTraduction = require('./routes/traduction');

const application = express();

const routesLogs = require('./routes/logs');

const routesCompteurs = require('./routes/compteurs');

// Créer le dossier uploads s'il n'existe pas
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

application.use('/api/logs', routesLogs);

application.use('/api/compteurs', routesCompteurs);

application.use(cors());
application.use(express.json());

application.use('/api/tts', routesTTS);
application.use('/api/asr', routesASR);
application.use('/api/traduction', routesTraduction);
application.use('/uploads', express.static('uploads'));

application.get('/', (requete, reponse) => {
  reponse.json({ message: 'Backend Services IA opérationnel' });
});

const PORT = process.env.PORT || 3000;
application.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});