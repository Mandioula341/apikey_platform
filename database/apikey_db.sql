-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 04 juil. 2026 à 23:35
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `apikey_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `apis`
--

CREATE TABLE `apis` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `statut` enum('disponible','indisponible') NOT NULL DEFAULT 'disponible',
  `dateAjout` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cles_api`
--

CREATE TABLE `cles_api` (
  `id` int(11) NOT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `valeurCle` varchar(255) NOT NULL,
  `dateCreation` datetime DEFAULT current_timestamp(),
  `quotaMax` int(11) NOT NULL DEFAULT 200,
  `nombreAppelsUtilises` int(11) NOT NULL DEFAULT 0,
  `statut` enum('active','revoquee') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cles_api`
--

INSERT INTO `cles_api` (`id`, `utilisateur_id`, `valeurCle`, `dateCreation`, `quotaMax`, `nombreAppelsUtilises`, `statut`) VALUES
(1, 1, 'sk_633191cc1395c803c671b9b698e5c11ddaa8cfe2ab5725e553cc6b77321164e8', '2026-07-04 19:21:19', 200, 0, 'revoquee'),
(2, 1, 'sk_95e21a4d3e9232ae8f84569f1cf1c53f6ca47051fc415401a98712d465e4d4e6', '2026-07-04 19:21:24', 200, 0, 'active');

-- --------------------------------------------------------

--
-- Structure de la table `facturation`
--

CREATE TABLE `facturation` (
  `id` int(11) NOT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `dateDebut` datetime NOT NULL,
  `dateFin` datetime NOT NULL,
  `nombreRequetes` int(11) NOT NULL DEFAULT 0,
  `montantTotal` float NOT NULL DEFAULT 0,
  `statut` enum('en_attente','payee') NOT NULL DEFAULT 'en_attente',
  `dateGeneration` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `log_consommation`
--

CREATE TABLE `log_consommation` (
  `id` int(11) NOT NULL,
  `cle_id` int(11) NOT NULL,
  `api_id` int(11) NOT NULL,
  `dateAppel` datetime DEFAULT current_timestamp(),
  `tempsExecution` float DEFAULT NULL,
  `statut` enum('reussi','echoue') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `motDePasse` varchar(255) NOT NULL,
  `role` enum('developpeur','public','admin') NOT NULL DEFAULT 'public',
  `dateInscription` datetime DEFAULT current_timestamp(),
  `estVerifie` tinyint(1) DEFAULT 0,
  `tokenVerification` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `motDePasse`, `role`, `dateInscription`, `estVerifie`, `tokenVerification`) VALUES
(1, 'Diop', 'Nogaye', 'ndeyenogayesy0@gmail.com', '$2b$10$gMOyg8jhCYnE4ACqsjE5weU8VESE3ZdLdWdNj3O5sucELkjqZEGfe', 'developpeur', '2026-07-03 22:32:55', 1, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `apis`
--
ALTER TABLE `apis`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `cles_api`
--
ALTER TABLE `cles_api`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `valeurCle` (`valeurCle`),
  ADD KEY `utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `facturation`
--
ALTER TABLE `facturation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `log_consommation`
--
ALTER TABLE `log_consommation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cle_id` (`cle_id`),
  ADD KEY `api_id` (`api_id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `apis`
--
ALTER TABLE `apis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `cles_api`
--
ALTER TABLE `cles_api`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `facturation`
--
ALTER TABLE `facturation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `log_consommation`
--
ALTER TABLE `log_consommation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cles_api`
--
ALTER TABLE `cles_api`
  ADD CONSTRAINT `cles_api_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `facturation`
--
ALTER TABLE `facturation`
  ADD CONSTRAINT `facturation_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `log_consommation`
--
ALTER TABLE `log_consommation`
  ADD CONSTRAINT `log_consommation_ibfk_1` FOREIGN KEY (`cle_id`) REFERENCES `cles_api` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `log_consommation_ibfk_2` FOREIGN KEY (`api_id`) REFERENCES `apis` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
