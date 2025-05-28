document.addEventListener('DOMContentLoaded', function () {
  const isDark = localStorage.getItem('darkMode') === 'true';

  const body = document.body;
  const icon = document.getElementById('modeIcon');
  const btn = document.getElementById('modeSwitchBtn');

  if (isDark) {
    body.classList.add('dark-mode');
    icon.className = 'bi bi-sun-fill fs-4';
    btn.classList.replace('btn-light', 'btn-dark');
  }

  btn.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    const isNowDark = body.classList.contains('dark-mode');

    icon.className = isNowDark ? 'bi bi-sun-fill fs-4' : 'bi bi-moon-fill fs-4';
    btn.classList.toggle('btn-light');
    btn.classList.toggle('btn-dark');

    localStorage.setItem('darkMode', isNowDark);
  });
});
