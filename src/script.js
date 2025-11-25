// ✦ Anciencraft — Script Completo (Registro + Mini-juego)
document.addEventListener('DOMContentLoaded', () => {
  // 🔑 Supabase (¡CAMBIA ESTOS VALORES!)
  const SUPABASE_URL = 'https://qhehwdnzpifbeqayheud.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_secret_7bYm6cESDr7qOjsrcIoOFA_geo8knIW'; // ← TU KEY

  // Inicializar cliente
  const { createClient } = Supabase;
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ── 1. Contador de jugadores ─────────────────────────────────────────
  const playerDisplay = document.getElementById('playerDisplay');
  let playerCount = 24;

  function updatePlayerCount() {
    playerCount = Math.floor(18 + Math.random() * 15);
    playerDisplay.textContent = `${playerCount} en línea`;
    playerDisplay.style.color = playerCount > 30 ? '#e74c3c' : '#2ecc71';
  }

  updatePlayerCount();
  setInterval(updatePlayerCount, 30000);

  // ── 2. Modal de Registro ─────────────────────────────────────────────
  const registerModal = document.getElementById('registerModal');
  const openRegisterBtn = document.getElementById('openRegisterBtn');
  const closeRegisterBtn = document.getElementById('closeRegisterModal');
  const registerForm = document.getElementById('registerForm');
  const formMessage = document.getElementById('formMessage');

  if (openRegisterBtn) openRegisterBtn.onclick = () => registerModal.style.display = 'block';
  if (closeRegisterBtn) closeRegisterBtn.onclick = () => registerModal.style.display = 'none';
  window.onclick = (e) => { if (e.target === registerModal) registerModal.style.display = 'none'; };

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const mcName = document.getElementById('mcName').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!mcName || mcName.length < 3 || mcName.length > 16) {
        showMessage('❌ Nombre de Minecraft inválido (3-16 caracteres).', 'error');
        return;
      }

      try {
        const { error } = await supabase
          .from('registrations')
          .insert([{ minecraft_name: mcName, email: email || null }]);

        if (error) throw error;

        showMessage(`✅ ¡Bienvenido, ${mcName}! 🎉`, 'success');
        registerForm.reset();
        setTimeout(() => registerModal.style.display = 'none', 2000);
      } catch (err) {
        console.error('Error:', err);
        showMessage('❌ Hubo un problema. Intenta más tarde.', 'error');
      }
    });
  }

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = type;
  }

  // ── 3. Mini-juego: Tiro al Dragón ───────────────────────────────────
  const gameModal = document.getElementById('gameModal');
  const startGameBtn = document.getElementById('startGameBtn');
  const closeGameBtn = document.getElementById('closeGameModal');
  const gameArea = document.getElementById('gameArea');
  const dragon = document.getElementById('dragon');
  const pointsEl = document.getElementById('points');

  let points = 0;
  let dragonMoving = false;

  if (startGameBtn) startGameBtn.onclick = () => {
    gameModal.style.display = 'block';
    points = 0;
    pointsEl.textContent = points;
    startDragonMovement();
  };

  if (closeGameBtn) closeGameBtn.onclick = () => {
    gameModal.style.display = 'none';
    dragonMoving = false;
  };

  function startDragonMovement() {
    dragonMoving = true;
    moveDragon();
  }

  function moveDragon() {
    if (!dragonMoving) return;

    const maxX = gameArea.clientWidth - 100;
    const maxY = gameArea.clientHeight - 100;
    const newX = Math.random() * maxX;
    const newY = 50 + Math.random() * (maxY - 100);

    dragon.style.left = `${newX}px`;
    dragon.style.top = `${newY}px`;

    // Escalar al hacer clic
    dragon.style.transform = 'scale(1)';
    setTimeout(() => {
      if (dragonMoving) dragon.style.transform = 'scale(1.1)';
    }, 100);

    setTimeout(moveDragon, 1200 + Math.random() * 800);
  }

  if (dragon) {
    dragon.addEventListener('click', () => {
      if (!dragonMoving) return;
      points += 10;
      pointsEl.textContent = points;
      dragon.style.transform = 'scale(0.8)';
      setTimeout(() => {
        if (dragonMoving) dragon.style.transform = 'scale(1.1)';
      }, 100);

      // Efecto de flecha (opcional: añadir partícula)
      createArrowEffect(dragon.offsetLeft + 30, dragon.offsetTop + 30);
    });