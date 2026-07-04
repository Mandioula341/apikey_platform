# apikey_platform
Plateforme web de gestion et consommation d'APIs IA (TTS, ASR, Traduction)

# Cloner le répertoire sur votre bureau
git clone https://github.com/Mandioula341/apikey_platform.git
cd apikey-platform

# Structure du projet
apikey-platform/
├── frontend/
│   ├── login.html
│   ├── dashboard-user.html
│   ├── dashboard-admin.html
│   └── assets/
│       ├── css/
│       │   └── style.css
│       ├── js/
│       │   └── main.js
│       └── img/
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   └── admin.js
│   └── middleware/
│       └── verifyToken.js
├── database/
│   └── apikey_db.sql
├── data/
│   └── test-data.json
└── README.md
