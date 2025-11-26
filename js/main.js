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

// ===== MODAL DE AUTENTICACIÓN =====
const modal = document.getElementById('auth-modal');
const openBtn = document.getElementById('open-auth');
const closeBtn = document.getElementById('close-modal');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');

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
    localStorage.setItem('anciencraftUser', JSON.stringify({
      username: username,
      loggedIn: true,
      timestamp: Date.now()
    }));
    alert(`✅ Bienvenido, ${username}.\nHas accedido al búnker de ANCIENCRAFT.`);
    modal.style.display = 'none';
    document.body.style.overflow = '';
    updateAuthUI(username);
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
    localStorage.setItem('anciencraftUser', JSON.stringify({
      username: username,
      loggedIn: true,
      timestamp: Date.now()
    }));
    alert(`✅ Cuenta creada: ${username}.\n¡Bienvenido al apocalipsis!`);
    modal.style.display = 'none';
    document.body.style.overflow = '';
    updateAuthUI(username);
  } else {
    alert('❌ Usuario (≥3) y contraseña (≥6) requeridos.');
  }
});

function updateAuthUI(username) {
  const authBtn = document.getElementById('open-auth');
  authBtn.innerHTML = `<span class="nav-icon">${username[0].toUpperCase()}</span>`;
  authBtn.title = `Perfil: ${username}`;
}

// Verificar sesión al cargar
document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('anciencraftUser');
  if (user) {
    try {
      const data = JSON.parse(user);
      if (data.loggedIn && Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
        updateAuthUI(data.username);
      }
    } catch (e) {
      localStorage.removeItem('anciencraftUser');
    }
  }
});