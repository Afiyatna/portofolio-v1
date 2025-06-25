// Inisialisasi AOS
// (AOS tidak digunakan lagi, jadi bisa dihapus jika tidak dipakai)

// URL API Projects
const PROJECTS_API = 'https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/Projects';

// Fetch Projects dan render ke Swiper
fetch(PROJECTS_API)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('projects-list');
    container.innerHTML = '';
    if (!data.length) {
      container.innerHTML = '<p class="text-gray-500">Belum ada projek.</p>';
      return;
    }
    data.forEach(proj => {
      container.innerHTML += `
        <div class="swiper-slide">
          <div class="bg-white rounded-xl shadow p-4">
            <h3 class="font-bold text-lg mb-1">${proj.Judul || ''}</h3>
            <p class="mb-2 text-sm text-gray-600">${proj.Deskripsi || ''}</p>
            <a href="${proj.Link || '#'}" class="text-purple-600 hover:underline" target="_blank">Lihat</a>
            <div class="mt-2 text-sm text-gray-500">${proj.Teknologi || ''}</div>
          </div>
        </div>
      `;
    });
    // Inisialisasi ulang Swiper setelah data dimasukkan
    if (window.projectsSwiper) window.projectsSwiper.destroy(true, true);
    window.projectsSwiper = new Swiper('.projects-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: { nextEl: '.projects-swiper .swiper-button-next', prevEl: '.projects-swiper .swiper-button-prev' },
      breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
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
    fetch('https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/Contacts', {
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

// Dark mode toggle (jika masih digunakan)
const darkToggle = document.getElementById('dark-toggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
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

// URL API Tambahan
const ABOUT_API = 'https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/About';
const ARTICLES_API = 'https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/Articles';
const SKILLS_API = 'https://api.sheetbest.com/sheets/6836b365-b1b6-4996-81ed-5023ea3d5ec6/tabs/Skills';

// Fetch About
fetch(ABOUT_API)
  .then(res => res.json())
  .then(data => {
    const about = data[0] || {};
    const container = document.getElementById('about-content');
    container.innerHTML = `
      <div class="flex flex-col md:flex-row items-center gap-8">
        <img src="${about.Foto || 'assets/profile.jpg'}" alt="Foto Profil" class="w-40 h-40 object-cover rounded-2xl shadow mb-4">
        <div>
          <h3 class="text-2xl font-bold mb-2">${about.Judul || ''}</h3>
          <p class="mb-2 text-gray-700">${about.Deskripsi || ''}</p>
        </div>
      </div>
    `;
  });

// Fetch Articles
fetch(ARTICLES_API)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('articles-list');
    container.innerHTML = '';
    if (!data.length) {
      container.innerHTML = '<p class="text-gray-500">Belum ada artikel.</p>';
      return;
    }
    data.forEach(article => {
      container.innerHTML += `
        <div class="swiper-slide">
          <div class="bg-purple-400 rounded-xl shadow p-4 text-white">
            <img src="${article.Gambar || 'https://placehold.co/400x200/8b5cf6/fff?text=Article'}" class="rounded mb-2">
            <h3 class="font-bold text-lg mb-1">${article.Judul || ''}</h3>
            <p class="mb-2 text-sm">${article.Deskripsi || ''}</p>
            <a href="${article.Link || '#'}" class="underline text-white" target="_blank">Read More</a>
          </div>
        </div>
      `;
    });
    // Inisialisasi ulang Swiper setelah data dimasukkan
    if (window.articlesSwiper) window.articlesSwiper.destroy(true, true);
    window.articlesSwiper = new Swiper('.articles-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: { nextEl: '.articles-swiper .swiper-button-next', prevEl: '.articles-swiper .swiper-button-prev' },
      breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
  });

// Fetch Skills
fetch(SKILLS_API)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('skills-list');
    container.innerHTML = '';
    if (!data.length) {
      container.innerHTML = '<p class="text-gray-500">Belum ada skill.</p>';
      return;
    }
    data.forEach(skill => {
      container.innerHTML += `
        <div class="flex flex-col items-center bg-white rounded-xl shadow p-4">
          <img src="${skill.Icon || 'https://placehold.co/64x64'}" class="w-12 h-12 mb-2">
          <div class="font-bold">${skill.Nama || ''}</div>
          <div class="text-sm text-gray-500">${skill.Level || ''}</div>
        </div>
      `;
    });
  }); 