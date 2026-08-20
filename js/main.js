if (!window.__synthesisMainInitialized) {
  window.__synthesisMainInitialized = true;

  function registerHoloHoverTargets() {
    const selectors = [
      'nav a',
      '.btn-primary',
      '.btn-secondary',
      '.module-card',
      '.hud-panel',
      '.connect',
      '.connect-form',
      '.info-panel',
      '.poster'
    ];

    document.querySelectorAll(selectors.join(', ')).forEach((element) => {
      element.classList.add('holo-hover');
    });
  }

  window.addEventListener('load', () => {
    console.log('Boot sequence initiated');

    const preloader = document.querySelector('.preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 3000);
    }
  });

  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    document.body.appendChild(trail);

    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;

    document.querySelectorAll('.holo-hover').forEach((element) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      element.style.setProperty('--mx', `${x}px`);
      element.style.setProperty('--my', `${y}px`);
    });

    setTimeout(() => {
      trail.style.opacity = '0';
    }, 150);

    setTimeout(() => {
      trail.remove();
    }, 400);
  });

  function spawnParticle() {
    const engine = document.getElementById('particle-engine');
    if (!engine) return;

    const particle = document.createElement('div');
    particle.classList.add('particle');

    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight + 20;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const duration = 2 + Math.random() * 3;
    particle.style.animationDuration = `${duration}s`;

    engine.appendChild(particle);

    setTimeout(() => particle.remove(), duration * 1000);
  }

  setInterval(spawnParticle, 120);

  const gridCanvas = document.getElementById('energy-grid');
  if (gridCanvas) {
    const gridContext = gridCanvas.getContext('2d');

    if (gridContext) {
      function resizeGrid() {
        gridCanvas.width = window.innerWidth;
        gridCanvas.height = window.innerHeight;
      }

      function drawGrid() {
        gridContext.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

        const spacing = 40;
        const time = Date.now() * 0.002;

        for (let x = 0; x < gridCanvas.width; x += spacing) {
          for (let y = 0; y < gridCanvas.height; y += spacing) {
            const pulse = Math.sin((x + y) * 0.01 + time) * 0.5 + 0.5;

            gridContext.fillStyle = `rgba(0, 170, 255, ${pulse * 0.35})`;
            gridContext.fillRect(x, y, 2, 2);
          }
        }

        requestAnimationFrame(drawGrid);
      }

      resizeGrid();
      window.addEventListener('resize', resizeGrid);
      requestAnimationFrame(drawGrid);
    }
  }

  const noiseCanvas = document.getElementById('quantum-noise');
  if (noiseCanvas) {
    const noiseContext = noiseCanvas.getContext('2d');

    if (noiseContext) {
      function resizeNoise() {
        noiseCanvas.width = window.innerWidth;
        noiseCanvas.height = window.innerHeight;
      }

      function renderNoise() {
        const imageData = noiseContext.createImageData(noiseCanvas.width, noiseCanvas.height);
        const buffer = imageData.data;
        const time = Date.now() * 0.0004;

        for (let index = 0; index < buffer.length; index += 4) {
          const value = Math.random() * 255;
          buffer[index] = value * 0.4;
          buffer[index + 1] = value * 0.8;
          buffer[index + 2] = 255;
          buffer[index + 3] = (Math.sin(index * 0.00002 + time) * 60) + 40;
        }

        noiseContext.putImageData(imageData, 0, 0);
        requestAnimationFrame(renderNoise);
      }

      resizeNoise();
      window.addEventListener('resize', resizeNoise);
      requestAnimationFrame(renderNoise);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const isAwakeningStage = document.body.classList.contains('awakening-stage');

    registerHoloHoverTargets();

    if (isAwakeningStage) {
      const sound = document.getElementById('awakening-sound');

      setTimeout(() => {
        try {
          if (sound) {
            sound.volume = 0.5;
            sound.play();
          }
        } catch (e) {
          console.log('Autoplay blocked, fallback visuals active');
        }

        console.log('Awakening sound pulse triggered');
      }, 4500);

      setTimeout(() => {
        console.log('Awakening complete — redirecting');
        window.location.href = 'index.html';
      }, 8200);
    }

    if (document.body.classList.contains('intro-body') && !isAwakeningStage) {
      setTimeout(() => {
        console.log('SYNTHESIS awakening sequence complete');
        window.location.href = 'index.html';
      }, 6000);
    }

    console.log('SYNTHESIS Interface Activated');

    setInterval(() => {
      console.log('SYNTHESIS heartbeat — system online');
    }, 5000);

    document.querySelectorAll('.module-card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        const title = card.querySelector('h3');
        if (title) {
          console.log(`Activated: ${title.innerText}`);
        }
      });
    });

    document.querySelectorAll('.hud-panel').forEach((panel) => {
      panel.addEventListener('mouseenter', () => {
        const title = panel.querySelector('h3');
        if (title) {
          console.log(`HUD Activated: ${title.innerText}`);
        }
      });
    });

    const connectForm = document.querySelector('.connect-form');
    if (connectForm) {
      connectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Signal sent to SYNTHESIS Network');
        connectForm.reset();
      });
    }

    const yearNode = document.querySelector('[data-year]');
    if (yearNode) {
      yearNode.textContent = new Date().getFullYear();
    }

    const form = document.querySelector('[data-contact-form]');
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        if (button) {
          const originalText = button.textContent;
          button.textContent = 'Signal Sent';
          button.disabled = true;

          setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            form.reset();
          }, 1800);
        }
      });
    }
  });
}
