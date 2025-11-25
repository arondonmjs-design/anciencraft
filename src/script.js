// Copiar IP al portapapeles
document.getElementById('copy-ip').addEventListener('click', () => {
  const ip = document.getElementById('server-ip').textContent;
  navigator.clipboard.writeText(ip).then(() => {
    const btn = document.getElementById('copy-ip');
    btn.textContent = '✅ ¡Copiada!';
    setTimeout(() => btn.textContent = '📋 Copiar IP', 2000);
  }).catch(err => {
    console.error('Error al copiar:', err);
  });
});

// Simulación de jugadores en línea (puedes reemplazar con API real)
const playerCount = document.getElementById('player-count');
let count = 27;
playerCount.textContent = count;

// Simulación suave de cambio de jugadores
setInterval(() => {
  const diff = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
  count = Math.max(0, count + diff);
  playerCount.textContent = count;
}, 5000);

// Efecto de partículas (simple, sin librería externa)
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const particle = document.createElement('div');
  particle.style.position = 'absolute';
  particle.style.width = '4px';
  particle.style.height = '4px';
  particle.style.backgroundColor = '#4a9e3d';
  particle.style.borderRadius = '50%';
  particle.style.opacity = '0.6';
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.animation = `float ${15 + Math.random() * 15}s infinite ease-in-out`;
  particle.style.animationDelay = `${Math.random() * 5}s`;
  particlesContainer.appendChild(particle);
}

document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes float {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) rotate(10deg); }
      50% { transform: translate(${(Math.random() - 0.5) * 150}px, ${(Math.random() - 0.5) * 150}px) rotate(-10deg); }
      75% { transform: translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 200}px) rotate(5deg); }
    }
  </style>
`);

// Botones de login/register (placeholder)
document.getElementById('btn-login').addEventListener('click', () => {
  alert('Función de inicio de sesión (próximamente con base de datos)');
});

document.getElementById('btn-register').addEventListener('click', () => {
  alert('Formulario de registro (próximamente con validación y BD)');
});