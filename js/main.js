// Typewriter IP
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

// Jugadores simulados
const playerCountEl = document.getElementById('player-count');
let players = 1240;
setInterval(() => {
  const change = Math.floor(Math.random() * 5) - 2;
  players = Math.max(1200, Math.min(1300, players + change));
  playerCountEl.textContent = players.toLocaleString();
}, 3000);

// ===== MODAL DE AUTENTICACIÓN Y PERFIL =====
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

// Abrir modal
openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

// Cerrar modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
});

// Cambiar pestañas
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

// Login
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

// Registro
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

// Actualizar interfaz según estado de sesión
function updateUI(user) {
  if (user && user.loggedIn) {
    // Mostrar perfil, ocultar login
    document.getElementById('open-auth').classList.add('hidden');
    document.getElementById('profile-btn').classList.remove('hidden');
    
    // Actualizar avatar y datos
    const avatarUrl = `https://crafatar.com/avatars/${user.username}?size=128&overlay`;
    document.getElementById('profile-avatar-img').src = avatarUrl;
    document.getElementById('profile-username').textContent = user.username;
    document.getElementById('profile-joined').textContent = new Date(user.timestamp).toLocaleDateString('es-ES');
    document.getElementById('profile-kills').textContent = user.kills;
    document.getElementById('profile-deaths').textContent = user.deaths;
    document.getElementById('profile-level').textContent = user.level;
    
    // Mostrar sección de perfil si está en #perfil
    if (window.location.hash === '#perfil') {
      document.getElementById('hero').classList.add('hidden');
      document.getElementById('leadership').classList.add('hidden');
      document.getElementById('top').classList.add('hidden');
      document.getElementById('arsenal').classList.add('hidden');
      document.getElementById('rules').classList.add('hidden');
      profileSection.classList.remove('hidden');
    }
  } else {
    // Restaurar estado sin sesión
    document.getElementById('open-auth').classList.remove('hidden');
    document.getElementById('profile-btn').classList.add('hidden');
    profileSection.classList.add('hidden');
    restoreSections();
  }
}

// Cerrar sesión
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('anciencraftUser');
  alert('✅ Sesión cerrada. Vuelve pronto, superviviente.');
  updateUI(null);
  window.location.hash = '';
});

// Restaurar secciones principales
function restoreSections() {
  document.getElementById('hero').classList.remove('hidden');
  document.getElementById('leadership').classList.remove('hidden');
  document.getElementById('top').classList.remove('hidden');
  document.getElementById('arsenal').classList.remove('hidden');
  document.getElementById('rules').classList.remove('hidden');
  profileSection.classList.add('hidden');
}

// Navegación por hash (simula SPA)
window.addEventListener('hashchange', () => {
  const user = JSON.parse(localStorage.getItem('anciencraftUser') || '{}');
  if (user.loggedIn && window.location.hash === '#perfil') {
    restoreSections();
    profileSection.classList.remove('hidden');
  } else {
    restoreSections();
  }
});

// Verificar sesión al cargar
document.addEventListener('DOMContentLoaded', () => {
  const userData = localStorage.getItem('anciencraftUser');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      const now = Date.now();
      // Sesión válida por 30 días
      if (user.loggedIn && now - user.timestamp < 30 * 24 * 60 * 60 * 1000) {
        updateUI(user);
      } else {
        localStorage.removeItem('anciencraftUser');
      }
    } catch (e) {
      localStorage.removeItem('anciencraftUser');
    }
  }
});