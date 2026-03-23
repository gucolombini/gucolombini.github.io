async function loadLanguage(lang = 'en') {
  try {
    const res = await fetch(`/lang/${lang}.json`);
    const translations = await res.json();

    // Caso especial para o título da página
    const headerTitle = document.querySelector('.maintitle');
    if (headerTitle) headerTitle.innerHTML = translations.title;

    // Tradução das descrições de cada jogo
    Object.keys(translations.desc).forEach(gameKey => {
      const container = document.querySelector(`.gameinfo-desc-text.${gameKey}`);
      if (!container) return;

      // Insere cada linha da array como parágrado individual
      container.innerHTML = translations.desc[gameKey]
        .map(p => `<p>${p}</p>`)
        .join('');
    });

    // Tradução das labelzinhas (2D Art, Game Design, etc.)
    Object.keys(translations.label).forEach(labelClass => {
      document.querySelectorAll(`.label.${labelClass}`).forEach(el => {
        el.textContent = translations.label[labelClass];
      });
    });

    // Tradução dos botões de download (Download in Itch.io, etc.)
    Object.keys(translations.downloadbutton).forEach(btnClass => {
      document.querySelectorAll(`.downloadbutton.${btnClass}`).forEach(el => {
        el.innerHTML = translations.downloadbutton[btnClass];
      });
    });

    // Guarda preferência do usuário
    localStorage.setItem('language', lang);

  } catch (err) {
    console.error('Failed to load language:', err);
  }
}

// Lógica básica dos botões de idioma
langButtons = document.querySelectorAll('.languages button')

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    langButtons.forEach(b => {
      b.classList.remove("active");
    })
    const lang = btn.dataset.lang;
    btn.classList.add("active");
    loadLanguage(lang);
  });
});

// Carrega idioma salvo
const savedLang = localStorage.getItem('language') || 'en';
loadLanguage(savedLang);
langButtons.forEach(btn => {
  if (btn.dataset.lang === savedLang) {
    btn.classList.add("active");
  }  
})