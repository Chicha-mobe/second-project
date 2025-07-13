// Плавное появление секций
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {threshold: 0.1});
sections.forEach(section => observer.observe(section));

// Тема (сохранение в localStorage)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(theme) {
  if(theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    // Луна иконка
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"></path>';
  } else {
    document.documentElement.removeAttribute('data-theme');
    // Солнце иконка
    themeIcon.innerHTML = '<path d="M12 3v1M16.24 4.76l-.7.7M21 12h-1M16.24 19.24l-.7-.7M12 21v-1M7.76 19.24l.7-.7M3 12h1M7.76 4.76l.7.7M12 7a5 5 0 100 10 5 5 0 000-10z"></path>';
  }
  localStorage.setItem('theme', theme);
}

// Инициализация темы
let savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark') {
  setTheme('dark');
}

themeToggle.addEventListener('click', () => {
  let currentTheme = document.documentElement.getAttribute('data-theme');
  if(currentTheme === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Отправка формы с валидацией и отправкой в Telegram
const TOKEN = '7551886319:AAESFEAVKeaXHqUgOSrVc2p4CBkjZmRacUI';
const CHAT_ID = 5362730618;
const API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
      status.textContent = "❌ Заполните все поля.";
      status.style.color = "red";
      return;
    }

    const text = `📩 Новая заявка с сайта:\n\n👤 Имя и TG: ${name}\n📝 Сообщение: ${message}`;

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    })
      .then(res => {
        if (res.ok) {
          status.textContent = "✅ Заявка отправлена!";
          status.style.color = "#00ff99";
          form.reset();
        } else {
          status.textContent = "❌ Ошибка при отправке.";
          status.style.color = "red";
        }
      })
      .catch(err => {
        status.textContent = "⚠️ Ошибка: " + err.message;
        status.style.color = "orange";
      });
  });
});
