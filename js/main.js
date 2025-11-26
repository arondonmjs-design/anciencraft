// Typewriter
document.addEventListener('DOMContentLoaded', () => {
  const ipText = "mc.ancientcraft.qzz.io";
  const typewriterEl = document.getElementById('typewriter-ip');
  typewriterEl.textContent = '';
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < ipText.length) {
      typewriterEl.textContent += ipText.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 80);
});

// Copiar IP
document.getElementById('copy-btn').addEventListener('click', async () => {
  const ip = "mc.ancientcraft.qzz.io";
  try {
    await navigator.clipboard.writeText(ip);
    const btn = document.getElementById('copy-btn');
    btn.innerHTML = '✓ ¡IP Copiada!';
    btn.style.backgroundColor = 'rgba(77, 255, 145, 0.2)';
    btn.style.borderColor = 'var(--toxic-neon)';
    setTimeout(() => {
      btn.innerHTML = '📋 Copiar IP';
      btn.style.backgroundColor = '';
      btn.style.borderColor = '';
    }, 2000);
  } catch (err) {
    alert('⚠️ No se pudo copiar. Usa Ctrl+C: mc.ancientcraft.qzz.io');
  }
});

// Jugadores
const playerCountEl = document.getElementById('player-count');
let players = 1240;
setInterval(() => {
  const change = Math.floor(Math.random() * 5) - 2;
  players = Math.max(1200, Math.min(1300, players + change));
  playerCountEl.textContent = players.toLocaleString();
}, 3000);

// ✅ UUID mapping real
const USERNAME_TO_UUID = {
  'TheKingAJRH': '3822c135-781e-4719-b69a-157b8cd3d0cc',
  'AlproYT': 'f48c2924-00ce-4d86-ac6d-b0e4b8a29582',
  'DominicanaOHIO': '76684784-fa7c-4f00-bebf-4efce6d31bb6'
};

// Modal y perfil
const modal = document.getElementById('auth-modal');
const openBtn = document.getElementById('open-auth');
const closeBtn = document.getElementById('close-modal');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');
const profileSection = document.getElementById('perfil');
const profileBtn = document.getElementById('profile-btn');
const logoutBtn = document.getElementById('logout-btn');

openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
});

function switchTab(isLogin) {
  if (isLogin) {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
  }
}

tabLogin.addEventListener('click', () => switchTab(true));
tabRegister.addEventListener('click', () => switchTab(false));
switchToRegister.addEventListener('click', (e) => { e.preventDefault(); switchTab(false); });
switchToLogin.addEventListener('click', (e) => { e.preventDefault(); switchTab(true); });

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  if (username) {
    const user = {
      username: username,
      loggedIn: true,
      timestamp: Date.now(),
      kills: Math.floor(Math.random() * 50),
      deaths: Math.floor(Math.random() * 20),
      level: Math.floor(Math.random() * 10) + 1
    };
    localStorage.setItem('anciencraftUser', JSON.stringify(user));
    alert(`✅ Bienvenido, ${username}.\nHas accedido al búnker de ANCIENCRAFT.`);
    modal.style.display = 'none';
    document.body.style.overflow = '';
    updateUI(user);
  } else {
    alert('❌ Nombre de usuario requerido.');
  }
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;

  if (password !== confirm) {
    alert('❌ Las contraseñas no coinciden.');
    return;
  }

  if (username && username.length >= 3 && password.length >= 6) {
    const user = {
      username: username,
      loggedIn: true,
      timestamp: Date.now(),
      kills: 0,
      deaths: 0,
      level: 1
    };
    localStorage.setItem('anciencraftUser', JSON.stringify(user));
    alert(`✅ Cuenta creada: ${username}.\n¡Bienvenido al apocalipsis!`);
    modal.style.display = 'none';
    document.body.style.overflow = '';
    updateUI(user);
  } else {
    alert('❌ Usuario (≥3) y contraseña (≥6) requeridos.');
  }
});

function updateUI(user) {
  if (user && user.loggedIn) {
    document.getElementById('open-auth').classList.add('hidden');
    document.getElementById('profile-btn').classList.remove('hidden');

    const uuid = USERNAME_TO_UUID[user.username] || user.username;
    const avatarUrl = `https://crafatar.com/avatars/${uuid}?size=128&overlay`;
    
    document.getElementById('profile-avatar-img').src = avatarUrl;
    document.getElementById('profile-username').textContent = user.username;
    document.getElementById('profile-joined').textContent = new Date(user.timestamp).toLocaleDateString('es-ES');
    document.getElementById('profile-kills').textContent = user.kills;
    document.getElementById('profile-deaths').textContent = user.deaths;
    document.getElementById('profile-level').textContent = user.level;

    if (window.location.hash === '#perfil') {
      document.getElementById('hero').classList.add('hidden');
      document.getElementById('leadership').classList.add('hidden');
      document.getElementById('top').classList.add('hidden');
      document.getElementById('arsenal').classList.add('hidden');
      document.getElementById('rules').classList.add('hidden');
      profileSection.classList.remove('hidden');
    }
  } else {
    document.getElementById('open-auth').classList.remove('hidden');
    document.getElementById('profile-btn').classList.add('hidden');
    profileSection.classList.add('hidden');
    restoreSections();
  }
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('anciencraftUser');
  alert('✅ Sesión cerrada. Vuelve pronto, superviviente.');
  updateUI(null);
  window.location.hash = '';
});

function restoreSections() {
  document.getElementById('hero').classList.remove('hidden');
  document.getElementById('leadership').classList.remove('hidden');
  document.getElementById('top').classList.remove('hidden');
  document.getElementById('arsenal').classList.remove('hidden');
  document.getElementById('rules').classList.remove('hidden');
  profileSection.classList.add('hidden');
}

window.addEventListener('hashchange', () => {
  const user = JSON.parse(localStorage.getItem('anciencraftUser') || '{}');
  if (user.loggedIn && window.location.hash === '#perfil') {
    restoreSections();
    profileSection.classList.remove('hidden');
  } else {
    restoreSections();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const userData = localStorage.getItem('anciencraftUser');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      if (user.loggedIn && Date.now() - user.timestamp < 30 * 24 * 60 * 60 * 1000) {
        updateUI(user);
      } else {
        localStorage.removeItem('anciencraftUser');
      }
    } catch (e) {
      localStorage.removeItem('anciencraftUser');
    }
  }
});