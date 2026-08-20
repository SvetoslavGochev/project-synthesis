document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('awakening-stage')) {
    console.log('SYNTHESIS awakening sequence started');

    setTimeout(() => {
      console.log('SYNTHESIS awakening sequence complete');
      window.location.href = 'index.html';
    }, 8000);
  }

  if (document.body.classList.contains('intro-body')) {
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
