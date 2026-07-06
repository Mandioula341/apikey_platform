# Installation dans ton projet CRA

1. Installe axios (react-router-dom est déjà installé) :
   ```bash
   cd ~/apikey_platform/frontend
   npm install axios
   ```

2. Copie tout le contenu de ce zip dans ton dossier `src/`, en remplaçant
   `App.js` et en fusionnant le contenu avec `index.css` (remplace-le
   entièrement, il contient déjà `App.css` de CRA n'est plus utilisé).

3. Dans `src/index.js`, vérifie que tu importes bien `./index.css`
   (c'est déjà le cas par défaut avec create-react-app) — tu peux
   supprimer l'import de `./App.css` s'il existe encore.

4. Crée un fichier `.env` à la racine du frontend pour pointer vers
   l'API de Membre 2/3 :
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   (adapte le port/l'URL à ce qu'ils utilisent réellement)

5. Lance :
   ```bash
   npm start
   ```

## ⚠️ Points à confirmer avec le backend (Membre 2 & 3)

Tous les chemins d'API sont centralisés dans **un seul fichier** :
`src/services/api.js`. Si les routes réelles ont des noms différents,
c'est le SEUL fichier à modifier.

Routes supposées à vérifier :
- `POST /api/auth/register`, `POST /api/auth/login`
- `GET/POST /api/cles`, `PUT /api/cles/:id/revoquer`
- `GET /api/logs` (historique)
- `GET /api/facturation`
- `GET /api/apis` (catalogue)
- `POST /api/demandes` — **cette route n'existe pas dans le dump SQL
  fourni** (pas de table `demandes`). À clarifier avec Membre 4, qui
  gère l'approbation/rejet des demandes côté admin — il faudra
  peut-être une table `demandes_api` dédiée.

## Structure livrée

```
src/
├── App.js
├── index.css
├── context/AuthContext.js
├── services/api.js
├── components/
│   ├── Navbar.jsx + .css
│   ├── PrivateRoute.jsx
│   ├── StatCard.jsx
│   └── ApiKeyCard.jsx + .css
└── pages/
    ├── Auth.css
    ├── Login.jsx
    ├── Register.jsx
    ├── DashboardUser.jsx + .css
    └── DemandeAPI.jsx + .css
```
