document.addEventListener('DOMContentLoaded', () = {
    
     Variables del juego
    let score = 0;
    const scoreDisplay = document.getElementById('score');
    const block = document.getElementById('block-target');
    const resetBtn = document.getElementById('reset-btn');

     Función principal Picar el bloque
    block.addEventListener('click', (event) = {
         Aumentar puntuación
        score++;
        scoreDisplay.innerText = score;

         Crear efecto visual (partícula)
        createParticle(event.clientX, event.clientY);

         Evento especial cada 20 clicks
        if (score % 20 === 0) {
            triggerSpecialEvent();
        }
    });

     Función para reiniciar el juego
    resetBtn.addEventListener('click', () = {
        score = 0;
        scoreDisplay.innerText = 0;
    });

     Crear partículas flotantes
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.classList.add('particles');
        particle.innerText = '+1';
        
         Posicionamiento
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'fixed';
        
        document.body.appendChild(particle);

         Eliminar partícula después de la animación (1 segundo)
        setTimeout(() = {
            particle.remove();
        }, 1000);
    }

     Evento especial (Bonus)
    function triggerSpecialEvent() {
         Añadimos puntos extra
        score += 5;
        scoreDisplay.innerText = score;
        
         Creamos una notificación visual temporal
        const msg = document.createElement('div');
        msg.innerText = ¡CRÍTICO! +5 Puntos;
        msg.style.position = fixed;
        msg.style.top = 50%;
        msg.style.left = 50%;
        msg.style.transform = translate(-50%, -50%);
        msg.style.color = #FFAA00;
        msg.style.fontSize = 3rem;
        msg.style.textShadow = 3px 3px 0 #000;
        msg.style.pointerEvents = none;
        
        document.body.appendChild(msg);

        setTimeout(() = {
            msg.remove();
        }, 1500);
    }
});