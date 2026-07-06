-- À exécuter dans phpMyAdmin (Laragon) sur la base `apikey_db`, APRÈS avoir importé apikey_db.sql
-- Ajoute la table manquante pour le formulaire "Demander une nouvelle API"

CREATE TABLE `demandes_api` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int(11) NOT NULL,
  `api_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `statut` enum('en_attente','approuvee','rejetee') NOT NULL DEFAULT 'en_attente',
  `dateDemande` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  KEY `api_id` (`api_id`),
  CONSTRAINT `demandes_api_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `demandes_api_ibfk_2` FOREIGN KEY (`api_id`) REFERENCES `apis` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
