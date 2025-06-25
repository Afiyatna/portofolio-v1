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