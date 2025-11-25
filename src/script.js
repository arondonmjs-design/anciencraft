// ── Anciencraft - Script Principal ─────────────────────────────────────
// ✦ Contador de jugadores, interacciones y preparación para mini-juegos
// ✦ Compatible con futuras integraciones (Discord Rich Presence, etc.)

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎮 Anciencraft cargado — ¡Listo para la aventura!');

  // ── 1. Contador de jugadores (simulado) ──────────────────────────────
  const countEl = document.getElementById('count');
  if (countEl) {
    function updatePlayerCount() {
      // Rango realista: entre 18 y 32 jugadores
      const players = Math.floor(18 + Math.random() * 15);
      countEl.textContent = players;
      // Opcional: cambiar color si hay muchos jugadores
      countEl.style.color = players > 30 ? '#e74c3c' : '#2ecc71';
    }

    updatePlayerCount(); // Inicial
    setInterval(updatePlayerCount, 30000); // Actualiza cada 30s
  }

  // ── 2. Botón de Registro ──────────────────────────────────────────────
  const registerBtn = document.getElementById('registerBtn');
  if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // ✦ Mensaje personalizado (puedes cambiarlo)
      const messages = [
        '✨ ¡Preparando tu cuenta para Anciencraft!',
        '⛏️ Tu perfil se está creando... ¡Pronto podrás minar con nosotros!',
        '🐉 El dragón ha sido notificado: ¡un nuevo héroe se acerca!',
        '✅ Función de registro en desarrollo. ¡Próximamente!',
        '🔐 Vinculación con Minecraft en proceso. ¡Gracias por tu paciencia!'
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      alert(randomMsg);
    });
  }

  // ── 3. Efecto extra: Brillo en hover (mejora UX visual) ───────────────
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.filter = 'brightness(1.1) saturate(1.2)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.filter = 'brightness(1) saturate(1)';
    });
  });

  // ── 4. Soporte futuro para mini-juego (placeholder listo para usar) ───
  // ¡Descomenta y expande cuando quieras añadirlo!
  /*
  function initMiniGame() {
    console.log('🕹️ Mini-juego: "Defiende la Aldea" cargado.');

    // Ejemplo: detectar click en el dragón (área aproximada)
    document.body.addEventListener('click', (e) => {
      const dragonX = window.innerWidth * 0.75;
      const dragonY = window.innerHeight * 0.3;
      const dist = Math.hypot(e.clientX - dragonX, e.clientY - dragonY);
      if (dist < 100) {
        alert('🎯 ¡Le diste al dragón! +10 puntos');
      }
    });
  }

  // Llama a initMiniGame() cuando quieras activarlo
  // initMiniGame();
  */

  // ── 5. Tecla secreta: "M" para mostrar mensaje de staff ───────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
      alert('👑 Anciencraft es propiedad de:\n- Dueño: TheKingAJRH\n- Sub-dueño: AlproYT\n\n