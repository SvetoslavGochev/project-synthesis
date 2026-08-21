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

  document.addEventListener('DOMContentLoaded', () => {
    registerHoloHoverTargets();

    const preloader = document.querySelector('.preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1500);
    }

    const yearNode = document.querySelector('[data-year]');
    if (yearNode) {
      yearNode.textContent = new Date().getFullYear();
    }
  });
}
