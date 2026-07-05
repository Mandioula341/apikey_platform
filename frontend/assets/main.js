// ══════════════════════════════════════════
//  main.js – Fonctions communes APIKëy
// ══════════════════════════════════════════

// Vérifier si l'utilisateur est connecté
function checkAuth() {
  const token = localStorage.getItem('apikey_token');
  const user  = localStorage.getItem('apikey_user');
  if (!token || !user) {
    window.location.href = 'login.html';
    return null;
  }
  return JSON.parse(user);
}

// Vérifier si l'utilisateur est admin
function checkAdmin() {
  const user = checkAuth();
  if (user && user.role !== 'admin') {
    window.location.href = 'dashboard-user.html';
    return null;
  }
  return user;
}

// Déconnexion
function logout() {
  localStorage.removeItem('apikey_token');
  localStorage.removeItem('apikey_user');
  window.location.href = 'login.html';
}

// Formater une date
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'numeric' });
}

// Formater un montant
function formatMontant(montant) {
  return parseFloat(montant).toFixed(2) + ' €';
}

// Masquer une clé API
function masquerCle(cle) {
  return cle.substring(0, 10) + '••••••••••••••••••';
}

// Copier dans le presse-papier
function copierDansClipboard(texte) {
  navigator.clipboard.writeText(texte).then(() => {
    showToast('Copié dans le presse-papier', 'success');
  }).catch(() => {
    showToast('Impossible de copier', 'danger');
  });
}

// Appel API backend (à utiliser quand le backend sera prêt)
async function apiCall(method, endpoint, body = null) {
  const token = localStorage.getItem('apikey_token');
  const opts  = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if (body) opts.body = JSON.stringify(body);
  try {
    const res  = await fetch(`http://localhost:3000${endpoint}`, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur serveur');
    return data;
  } catch (err) {
    showToast(err.message, 'danger');
    return null;
  }
}