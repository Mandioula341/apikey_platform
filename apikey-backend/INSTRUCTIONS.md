# Backend minimal APIKey Platform (pour tester avec Laragon)

⚠️ Ceci est un backend **de test**, pour que ta partie frontend fonctionne
de bout en bout en attendant que Membre 2/3 livrent le backend officiel.
Les routes correspondent exactement à `src/services/api.js` de ton frontend.

## 1. Placer le projet

Mets ce dossier `apikey-backend` à côté de ton dossier `frontend`, par exemple :
```
apikey_platform/
├── frontend/
└── apikey-backend/
```

## 2. Démarrer Laragon

Ouvre Laragon et clique sur **Démarrer tout** (Apache + MySQL doivent être verts).

## 3. Créer la base de données

1. Clique sur le bouton **Base de données** de Laragon (ou ouvre `http://localhost/phpmyadmin`)
2. Crée une base nommée exactement `apikey_db`
3. Importe **dans cet ordre** :
   - `apikey_db.sql` (ton fichier original, celui que tu m'as déjà envoyé)
   - `sql/demandes_api.sql` (ajoute la table manquante pour le formulaire de demande)
   - `sql/donnees_test.sql` (ajoute un catalogue d'API + quelques logs de test)

## 4. Installer les dépendances

Dans un terminal, à l'intérieur de `apikey-backend/` :
```bash
npm install
```

## 5. Configurer l'environnement

Copie `.env.example` en `.env` :
```bash
copy .env.example .env
```
Les valeurs par défaut (host `127.0.0.1`, user `root`, mot de passe vide) correspondent
à Laragon — tu n'as normalement rien à changer, sauf si tu as mis un mot de passe root.

## 6. Lancer le serveur

```bash
npm start
```

Tu dois voir :
```
Serveur démarré sur http://localhost:5000
```

## 7. Connecter le frontend

Dans `frontend/.env` :
```
REACT_APP_API_URL=http://localhost:5000/api
```
Redémarre `npm start` côté frontend après avoir créé/modifié ce fichier.

## 8. Tester

- Va sur `http://localhost:3000/register`, crée un compte
- Connecte-toi sur `/login`
- Le dashboard doit afficher les données de test (1 clé active, 4 appels, une facture)

## Compte existant dans le dump original

Un compte existe déjà dans `apikey_db.sql` (Nogaye Diop), mais son mot de passe
est déjà haché et tu n'en connais pas la valeur en clair — **crée plutôt un
nouveau compte via `/register`** pour tester facilement.
