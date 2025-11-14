
/* ===== MENU HAMBURGUESA ===== */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// abrir y cerrar menú
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileMenu.classList.toggle('show');
});

// cerrar al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('show');
  }
});


 
/* ===== CONTENEDOR DE BUSQUEDA (BARRA BUSCADORA) ===== */
const searchToggle = document.getElementById('search-toggle');
  const searchBar = document.querySelector('.search-bar');
  const searchInput = searchBar.querySelector('input');

  // Mostrar barra y ocultar lupa
  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    searchBar.classList.add('show');
    searchToggle.classList.add('hide');
    searchInput.focus();
  });

  // Evita cierre al hacer clic dentro
  searchBar.addEventListener('click', (e) => e.stopPropagation());

  // Cerrar barra al hacer clic fuera
  document.addEventListener('click', () => {
    if (searchBar.classList.contains('show')) {
      searchBar.classList.remove('show');
      searchToggle.classList.remove('hide');
    }
  });

  /* ===== FILTRO DE PRODUCTOS ===== */
const cards = document.querySelectorAll(".nuevo-card");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();

    if (text.includes(query)) {
      card.style.display = "flex";   // mostrar tarjeta
    } else {
      card.style.display = "none";   // ocultar tarjeta
    }
  });
});


// ENTER → aplicar búsqueda + bajar a resultados
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const query = searchInput.value.toLowerCase().trim();

    // Aplicar filtro inmediatamente
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      if (text.includes(query)) {
        card.style.removeProperty("display");
      } else {
        card.style.display = "none";
      }
    });

    // Bajar a los resultados
    document.getElementById("resultados").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    // (Opcional) cerrar barra de búsqueda
    searchBar.classList.remove("show");
    searchToggle.classList.remove("hide");
  }
});



/* ===== SLIDER INFINITO REAL ===== */
const bannerSlide = document.querySelector('.banner-slide');
let banners = document.querySelectorAll('.banner-slide img');
const prevBanner = document.querySelector('.banner-prev');
const nextBanner = document.querySelector('.banner-next');

let index = 1;
let size = banners[0].clientWidth;

/* ===== Clonar primer y último banner ===== */
const firstClone = banners[0].cloneNode(true);
const lastClone = banners[banners.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

bannerSlide.appendChild(firstClone);
bannerSlide.insertBefore(lastClone, banners[0]);

banners = document.querySelectorAll('.banner-slide img');

/* Posicionar correctamente al inicio */
bannerSlide.style.transform = `translateX(-${size * index}px)`;

/* ===== Función para moverse ===== */
function moveToSlide() {
  bannerSlide.style.transition = 'transform 0.5s ease-in-out';
  bannerSlide.style.transform = `translateX(-${size * index}px)`;
}

/* Botón siguiente */
nextBanner.addEventListener("click", () => {
  if (index >= banners.length - 1) return;
  index++;
  moveToSlide();
});

/* Botón anterior */
prevBanner.addEventListener("click", () => {
  if (index <= 0) return;
  index--;
  moveToSlide();
});

/* ===== Reset suave cuando llegamos a clones ===== */
bannerSlide.addEventListener("transitionend", () => {
  if (banners[index].id === "first-clone") {
    bannerSlide.style.transition = "none";
    index = 1;
    bannerSlide.style.transform = `translateX(-${size * index}px)`;
  }

  if (banners[index].id === "last-clone") {
    bannerSlide.style.transition = "none";
    index = banners.length - 2;
    bannerSlide.style.transform = `translateX(-${size * index}px)`;
  }
});

/* ===== Auto-slide ===== */
setInterval(() => {
  if (index >= banners.length - 1) return;
  index++;
  moveToSlide();
}, 8000);

/* ===== Ajuste si la ventana cambia tamaño ===== */
window.addEventListener("resize", () => {
  size = banners[0].clientWidth;
  bannerSlide.style.transition = "none";
  bannerSlide.style.transform = `translateX(-${size * index}px)`;
});

