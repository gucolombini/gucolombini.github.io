langButtons = document.querySelectorAll('.languages button')

async function loadLanguage(lang = 'en') {
  try {
    const res = await fetch(`/lang/${lang}.json`);
    const translations = await res.json();

    const headerTitle = document.querySelector('.maintitle');
    if (headerTitle) headerTitle.innerHTML = translations.title;

    Object.keys(translations.desc).forEach(gameKey => {
      const container = document.querySelector(`.gameinfo-desc-text.${gameKey}`);
      if (!container) return;

      // Each paragraph can contain HTML, so use innerHTML
      container.innerHTML = translations.desc[gameKey]
        .map(p => `<p>${p}</p>`)
        .join('');
    });

    Object.keys(translations.label).forEach(labelClass => {
      document.querySelectorAll(`.label.${labelClass}`).forEach(el => {
        el.textContent = translations.label[labelClass];
      });
    });

    Object.keys(translations.downloadbutton).forEach(btnClass => {
      document.querySelectorAll(`.downloadbutton.${btnClass}`).forEach(el => {
        el.innerHTML = translations.downloadbutton[btnClass];
      });
    });

    // Store user preference
    localStorage.setItem('language', lang);

  } catch (err) {
    console.error('Failed to load language:', err);
  }
}

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

// Load saved language
const savedLang = localStorage.getItem('language') || 'en';
loadLanguage(savedLang);
langButtons.forEach(btn => {
  if (btn.dataset.lang === savedLang) {
    btn.classList.add("active");
  }  
})