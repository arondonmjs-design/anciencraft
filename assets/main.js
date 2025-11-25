// 🔥 Partículas de fuego del dragón
function createFireParticle() {
  const container = document.getElementById('fire-particles');
  if (!container) return;

  const particle = document.createElement('div');
  particle.classList.add('fire-particle');
  
  const startX = window.innerWidth - 120;
  const startY = 90 + Math.random() * 80;
  particle.style.left = `${startX}px`;
  particle.style.top = `${startY}px`;
  
  const size = 12 + Math.random() * 25;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  container.appendChild(particle);
  
  const duration = 1600 + Math.random() * 1200;
  particle.style.transition = `all ${duration}ms cubic-bezier(0.2, 0.8, 0.4, 1)`;
  
  setTimeout(() => {
    particle.style.opacity = '0.95';
    particle.style.transform = `translateX(-350px) translateY(${80 + Math.random() * 120}px) scale(0.2)`;
  }, 10);
  
  setTimeout(() => particle.remove(), duration);
}

setInterval(createFireParticle, 750);

// 📊 Contador en vivo
async function updatePlayerCount() {
  const el = document.getElementById('player-count');
  if (!el) return;

  try {
    const res = await fetch('https://api.mcsrvstat.us/3/anciencraft');
    if (!res.ok) throw new Error('Offline');
    const data = await res.json();
    el.textContent = data.online ? (data.players?.online || 0) : "⚠️ Offline";
  } catch {
    el.textContent = "—";
  }
}

updatePlayerCount();
setInterval(updatePlayerCount, 30000);

// 📋 Copiar IP
function copyIP(text = "anciencraft") {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2500);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copy-btn');
  const copyIpBtn = document.getElementById('copy-ip-btn');
  
  if (copyBtn) copyBtn.addEventListener('click', () => copyIP());
  if (copyIpBtn) copyIpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    copyIP();
  });

  // 🎮 Mini-juego: Rompe la obsidiana
  const block = document.getElementById('obsidian-block');
  const scoreEl = document.getElementById('score');
  
  if (block && scoreEl) {
    let score = 0;
    let hp = 100;

    block.addEventListener('click', () => {
      if (block.classList.contains('broken')) return;
      
      hp -= 25;
      block.style.opacity = hp / 100;
      
      if (hp <= 0) {
        block.classList.add('broken');
        score++;
        scoreEl.textContent = score;
        setTimeout(() => {
          block.className = '';
          hp = 100;
          block.style.opacity = '1';
        }, 1300);
      } else {
        block.classList.add('cracked');
        setTimeout(() => {
          if (!block.classList.contains('broken')) {
            block.classList.remove('cracked');
          }
        }, 300);
      }
    });

    setInterval(() => {
      if (!block.classList.contains('broken') && hp < 100) {
        block.className = '';
        hp = 100;
      }
    }, 5000);
  }
});