// Typewriter effect para IP
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

// Copiar IP con feedback animado
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

// Simulación de jugadores online
const playerCountEl = document.getElementById('player-count');
let players = 1240;

setInterval(() => {
  const change = Math.floor(Math.random() * 5) - 2;
  players = Math.max(1200, Math.min(1300, players + change));
  playerCountEl.textContent = players.toLocaleString();
}, 3000);