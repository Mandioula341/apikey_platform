const express = require('express');
const routeur = express.Router();
const controleurLogs = require('../controllers/logsController');

routeur.get('/', controleurLogs.obtenirLogs);
routeur.get('/:cleId', controleurLogs.obtenirLogsParCle);

module.exports = routeur;