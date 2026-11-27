/* GAMER-FREE-DEVELOPER · navegación y ciclo PWA · 1.0.3 */
'use strict';

(() => {
  const navButtons = [...document.querySelectorAll('[data-panel]')];
  const panels = [...document.querySelectorAll('.panel')];
  const gameDialog = document.getElementById('gameDialog');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const audio = window.GFDAudio;

  function showPanel(name) {
    const target = document.getElementById(`panel-${name}`);
    if (!target) return;
    panels.forEach((panel) => {
      const active = panel === target;
      panel.classList.toggle('is-active', active);
      panel.setAttribute('aria-hidden', String(!active));
    });
    navButtons.forEach((button) => {
      const active = button.dataset.panel === name;
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    audio?.playEffect('nav');
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }

  navButtons.forEach((button) => {
    button.addEventListener('click', () => showPanel(button.dataset.panel));
  });

  document.querySelectorAll('[data-open-game]').forEach((button) => {
    button.addEventListener('click', () => {
      if (gameDialog && typeof gameDialog.showModal === 'function') {
        gameDialog.showModal();
        audio?.playEffect('open');
      }
    });
  });

  if (gameDialog) {
    gameDialog.addEventListener('click', (event) => {
      if (event.target === gameDialog) gameDialog.close();
    });
    gameDialog.addEventListener('close', () => audio?.playEffect('close'));
  }

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch((error) => {
        console.warn('[GAMER-FREE-DEVELOPER] No se pudo registrar el modo offline.', error);
      });
    }, { once: true });
  }
})();
