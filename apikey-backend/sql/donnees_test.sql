-- À exécuter dans phpMyAdmin (Laragon) sur `apikey_db`, APRÈS apikey_db.sql et demandes_api.sql
-- Ajoute des données de test : catalogue d'API + quelques logs + une facture,
-- pour que le dashboard de Nogaye (utilisateur id=1) ne soit pas vide au premier test.

INSERT INTO `apis` (`nom`, `url`, `statut`) VALUES
('Synthèse vocale (TTS)', 'https://api.exemple.com/tts', 'disponible'),
('Reconnaissance vocale (ASR)', 'https://api.exemple.com/asr', 'disponible'),
('Traduction automatique', 'https://api.exemple.com/traduction', 'disponible');

-- Quelques appels de test sur la clé active (id=2) de l'utilisateur Nogaye (id=1)
INSERT INTO `log_consommation` (`cle_id`, `api_id`, `tempsExecution`, `statut`) VALUES
(2, 1, 320.5, 'reussi'),
(2, 1, 410.2, 'reussi'),
(2, 2, 275.0, 'echoue'),
(2, 3, 190.8, 'reussi');

-- Une facture de test
INSERT INTO `facturation` (`utilisateur_id`, `dateDebut`, `dateFin`, `nombreRequetes`, `montantTotal`, `statut`) VALUES
(1, '2026-07-01 00:00:00', '2026-07-31 23:59:59', 4, 1200, 'en_attente');
