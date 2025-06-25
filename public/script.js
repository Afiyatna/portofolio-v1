// Inisialisasi AOS
// (AOS tidak digunakan lagi, jadi bisa dihapus jika tidak dipakai)

// URL API
const PROJECTS_API = 'https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/Projects';
const ARTICLES_API = 'https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/Articles';
const SKILLS_API = 'https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/Skills';
const ABOUT_API = 'https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/About';

// Render Projects
fetch(PROJECTS_API)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('projects-list');
    if (container) {
      container.innerHTML = '';
      if (!data.length) {
        container.innerHTML = '<p class="text-gray-500 dark:text-gray-300">Belum ada projek.</p>';
        return;
      }
      data.forEach(proj => {
        container.innerHTML += `
          <div class="swiper-slide">
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col h-full">
              <img src="${proj.Gambar || 'https://placehold.co/400x200'}" class="rounded mb-2 h-32 w-full object-cover">
              <h3 class="font-bold text-lg mb-1">${proj.Judul || ''}</h3>
              <p class="mb-2 text-sm text-gray-600 dark:text-gray-300 flex-grow">${proj.Deskripsi || ''}</p>
              <a href="${proj.Link || '#'}" class="text-purple-600 hover:underline mt-2" target="_blank">Lihat</a>
              <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">${proj.Teknologi || ''}</div>
            </div>
          </div>
        `;
      });
      if (window.projectsSwiper) window.projectsSwiper.destroy(true, true);
      window.projectsSwiper = new Swiper('.projects-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        navigation: { nextEl: '.projects-swiper .swiper-button-next', prevEl: '.projects-swiper .swiper-button-prev' },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
      });
      if (window.AOS) AOS.refresh();
    }
  });

// Render Articles
fetch(ARTICLES_API)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('articles-list');
    if (container) {
      container.innerHTML = '';
      if (!data.length) {
        container.innerHTML = '<p class="text-gray-500 dark:text-gray-300">Belum ada artikel.</p>';
        return;
      }
      data.forEach(article => {
        container.innerHTML += `
          <div class="swiper-slide">
            <div class="bg-purple-400 rounded-xl shadow p-4 text-white flex flex-col h-full">
              <img src="${article.Gambar || 'https://placehold.co/400x200/8b5cf6/fff?text=Article'}" class="rounded mb-2 h-32 w-full object-cover">
              <h3 class="font-bold text-lg mb-1">${article.Judul || ''}</h3>
              <p class="mb-2 text-sm flex-grow">${article.Deskripsi || ''}</p>
              <a href="${article.Link || '#'}" class="underline text-white mt-2" target="_blank">Read More</a>
            </div>
          </div>
        `;
      });
      if (window.articlesSwiper) window.articlesSwiper.destroy(true, true);
      window.articlesSwiper = new Swiper('.articles-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        navigation: { nextEl: '.articles-swiper .swiper-button-next', prevEl: '.articles-swiper .swiper-button-prev' },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
      });
      if (window.AOS) AOS.refresh();
    }
  });

// Render Skills
fetch(SKILLS_API)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('skills-list');
    if (container) {
      container.innerHTML = '';
      if (!data.length) {
        container.innerHTML = '<p class="text-gray-500 dark:text-gray-300">Belum ada skill.</p>';
        return;
      }
      data.forEach(skill => {
        container.innerHTML += `
          <div class="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-4">
            <img src="${skill.Icon || 'https://placehold.co/64x64'}" class="w-12 h-12 mb-2">
            <div class="font-bold">${skill.Nama || ''}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">${skill.Level || ''}</div>
          </div>
        `;
      });
      if (window.AOS) AOS.refresh();
    }
  });

// Render About (Hero)
fetch(ABOUT_API)
  .then(res => res.json())
  .then(data => {
    const about = data[0] || {};
    const tagline = document.querySelector('#home .text-xl.text-purple-600');
    const desc = document.querySelector('#home .mb-6');
    const foto = document.querySelector('#home img[alt="Foto Profil"]');
    if (tagline) tagline.textContent = about.Tagline || 'Semua tergantung mindset';
    if (desc) desc.textContent = about.Deskripsi || 'Web Developer';
    if (foto) foto.src = about.Foto || 'assets/profile.jpg';
    if (window.AOS) AOS.refresh();
  });

// Kontak Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    fetch('https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/Contacts', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
      const msg = document.getElementById('form-message');
      if (msg) msg.textContent = 'Pesan terkirim!';
      contactForm.reset();
    })
    .catch(() => {
      const msg = document.getElementById('form-message');
      if (msg) msg.textContent = 'Gagal mengirim pesan.';
    });
  });
}

// Dark mode toggle
const darkToggle = document.getElementById('dark-toggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    if (window.AOS) AOS.refresh();
  });
}
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
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
    // Close mobile menu
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.add('hidden');
  });
});

// Responsive navbar
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.toggle('hidden');
  });
} 