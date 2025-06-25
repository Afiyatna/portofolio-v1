// Inisialisasi AOS
AOS.init();

// URL API Spreadsheet
const PROJECTS_API = 'https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6';

// Fetch Projects
document.addEventListener('DOMContentLoaded', () => {
  fetch(PROJECTS_API)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('projects-list');
      if (!data.length) {
        container.innerHTML = '<p class="text-gray-500 dark:text-gray-300">Belum ada projek.</p>';
        return;
      }
      data.forEach(proj => {
        container.innerHTML += `
          <div class="p-6 bg-white dark:bg-gray-700 rounded shadow" data-aos="fade-up">
            <h3 class="text-xl font-bold mb-2">${proj.Judul || ''}</h3>
            <p class="mb-2">${proj.Deskripsi || ''}</p>
            <a href="${proj.Link || '#'}" class="text-blue-500 hover:underline" target="_blank">Lihat</a>
            <div class="mt-2 text-sm text-gray-500 dark:text-gray-300">${proj.Teknologi || ''}</div>
          </div>
        `;
      });
    });
});

// Kontak Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    fetch(`https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/Contacts`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
      document.getElementById('form-message').textContent = 'Pesan terkirim!';
      contactForm.reset();
    })
    .catch(() => {
      document.getElementById('form-message').textContent = 'Gagal mengirim pesan.';
    });
  });
}

// Dark mode toggle
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
// Set theme on load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Smooth scroll
const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
    // Close mobile menu
    document.getElementById('mobile-menu').classList.add('hidden');
  });
});

// Responsive navbar
const menuToggle = document.getElementById('menu-toggle');
menuToggle.addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}); 