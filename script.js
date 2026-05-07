    const track = document.getElementById('slider-track');
    const window_ = document.querySelector('.themes-ctn');
    const dotsContainer = document.getElementById('slider-dots');
    const cards = document.querySelectorAll('.theme-card');

    let current = 0;
    let startX = 0;
    let dragging = false;
    let dist = 0;

    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        current = index;
        track.style.transition = 'transform 0.4s ease';
        track.style.transform = `translateX(-${current * 100}%)`;
        document.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    setInterval(() => {
        const next = (current + 1) % cards.length;
        goTo(next);
    }, 5000);

    function onDragEnd() {
        dragging = false;
        window_.classList.remove('grabbing');
        if (dist < -80 && current < cards.length - 1) current++;
        else if (dist > 80 && current > 0) current--;
        dist = 0;
        goTo(current);
    }

    window_.addEventListener('mousedown', (e) => {
        e.preventDefault();      
        dragging = true;
        startX = e.clientX;
        track.style.transition = 'none';
        window_.classList.add('grabbing');
    });

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        dist = e.clientX - startX;
        track.style.transform = `translateX(calc(-${current * 100}% + ${dist}px))`;
    });

    document.addEventListener('mouseup', () => {
        if (!dragging) return;
        onDragEnd();
    });

    // ----------------------------------------------------------- COUNTDOWN ---------------------------------------------------------
    const EVENT_DATE = new Date("2026-05-11T00:00:00");

    function updateCountdown() {
        const now = new Date();
        const diff = EVENT_DATE - now;

        if (diff <= 0) {
            document.getElementById("days").textContent    = "00";
            document.getElementById("hours").textContent   = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            return;
        }

        const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").textContent    = String(days).padStart(2, "0");
        document.getElementById("hours").textContent   = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ----------------------------------------------------------- PARALLAX -----------------------------------------------------------
    const spacer = document.getElementById("parallax-spacer");
    const car    = document.querySelector(".car-img");

    function updateParallax() {
        if (!spacer || !car) return;
        const spacerTop = spacer.getBoundingClientRect().top + window.scrollY;
        const scrollY   = window.scrollY;
        const start     = spacerTop;
        const end       = spacerTop + spacer.offsetHeight - window.innerHeight;
        const progress  = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

        const startX = -180;
        const endX   = window.innerWidth + 180;
        car.style.left = (startX + (endX - startX) * progress) + "px";
    }

    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
    updateParallax();

    // -------------------------------- BOTÃO VOLTAR AO TOPO -----------------------------------------------------------

    const backToTop = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        const start = window.scrollY;
        const duration = 1200;
        const startTime = performance.now();

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            window.scrollTo(0, start * (1 - ease));
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    });

    // ----------------------------------------------------------- CARROSSEL -----------------------------------------------------------
    (function () {
        const track = document.getElementById('carousel-track');
        const dotsContainer = document.getElementById('carousel-dots');
        if (!track) return;

        const slides = track.querySelectorAll('.carousel-slide');
        const total = slides.length;
        let current = 0;

        // Criar dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function goTo(index) {
            current = (index + total) % total;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[current].classList.add('active');
        }

        document.querySelector('.carousel-prev').addEventListener('click', () => goTo(current - 1));
        document.querySelector('.carousel-next').addEventListener('click', () => goTo(current + 1));

        // Swipe em dispositivos móveis
        let startX = 0;
        track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
        track.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
        });
    })();

    // -------------------------------- MENU SANDUÍCHE --------------------------------------------
    const menuToggle  = document.getElementById("menu-toggle");
    const mainNav     = document.getElementById("main-nav");
    const navOverlay  = document.getElementById("nav-overlay");
    const navLinks    = document.querySelectorAll(".a-menu");

    function openMenu() {
        menuToggle.classList.add("open");
        mainNav.classList.add("open");
        navOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        menuToggle.classList.remove("open");
        mainNav.classList.remove("open");
        navOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    menuToggle.addEventListener("click", () => {
        mainNav.classList.contains("open") ? closeMenu() : openMenu();
    });

    navOverlay.addEventListener("click", closeMenu);

    navLinks.forEach(link => link.addEventListener("click", closeMenu));

    // ----------------------------------------------------------- GALERIA -----------------------------------------------------------
(function () {
    const track = document.getElementById('gallery-track');
    const dotsContainer = document.getElementById('gallery-dots');
    if (!track) return;

    // Todas as imagens em ordem
    const allImages = [
        { src: 'assets/img-evento.jpg',  alt: 'Foto do evento 1' },
        { src: 'assets/img-evento2.jpg', alt: 'Foto do evento 2' },
        { src: 'assets/img-evento3.jpg', alt: 'Foto do evento 3' },
        { src: 'assets/img-evento4.jpg', alt: 'Foto do evento 4' },
        { src: 'assets/img-evento5.jpg', alt: 'Foto do evento 5' },
        { src: 'assets/img-evento6.jpg', alt: 'Foto do evento 6' },
    ];

    let current = 0;
    let autoplayTimer;
    let allImgElements = [];

    function getPerPage() {
        return window.innerWidth <= 768 ? 2 : 3;
    }

    function buildGallery() {
        const perPage = getPerPage();
        track.innerHTML = '';
        dotsContainer.innerHTML = '';
        allImgElements = [];
        current = 0;

        for (let i = 0; i < allImages.length; i += perPage) {
            const page = document.createElement('div');
            page.classList.add('gallery-page');

            allImages.slice(i, i + perPage).forEach(data => {
                const slide = document.createElement('div');
                slide.classList.add('gallery-slide');
                const img = document.createElement('img');
                img.src = data.src;
                img.alt = data.alt;
                slide.appendChild(img);
                page.appendChild(slide);
                allImgElements.push(img);
            });

            track.appendChild(page);
        }

        const pages = track.querySelectorAll('.gallery-page');
        pages.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Página ${i + 1}`);
            dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
            dotsContainer.appendChild(dot);
        });

        setupLightbox();
        resetAutoplay();
    }

    function goTo(index) {
        const pages = track.querySelectorAll('.gallery-page');
        const dots = dotsContainer.querySelectorAll('.gallery-dot');
        current = (index + pages.length) % pages.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        const pages = track.querySelectorAll('.gallery-page');
        autoplayTimer = setInterval(() => goTo(current + 1), 6000);
    }

    document.querySelector('.gallery-prev').addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
    document.querySelector('.gallery-next').addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    track.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { goTo(current + (diff > 0 ? 1 : -1)); resetAutoplay(); }
    });

    // Reconstruir ao redimensionar
    let resizeTimer;
    let lastPerPage = getPerPage();
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (getPerPage() !== lastPerPage) {
                lastPerPage = getPerPage();
                buildGallery();
            }
        }, 200);
    });

    // ---- LIGHTBOX ----
    const lightbox      = document.getElementById('lightbox');
    const lightboxImg   = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev  = document.getElementById('lightbox-prev');
    const lightboxNext  = document.getElementById('lightbox-next');
    let lightboxIndex   = 0;

    function setupLightbox() {
        allImgElements.forEach((img, i) => {
            img.addEventListener('click', () => openLightbox(i));
        });
    }

    function openLightbox(index) {
        lightboxIndex = index;
        lightboxImg.src = allImgElements[lightboxIndex].src;
        lightboxImg.alt = allImgElements[lightboxIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function lightboxGoTo(index) {
        lightboxIndex = (index + allImgElements.length) % allImgElements.length;
        lightboxImg.src = allImgElements[lightboxIndex].src;
        lightboxImg.alt = allImgElements[lightboxIndex].alt;
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => lightboxGoTo(lightboxIndex - 1));
    lightboxNext.addEventListener('click', () => lightboxGoTo(lightboxIndex + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxGoTo(lightboxIndex - 1);
        if (e.key === 'ArrowRight') lightboxGoTo(lightboxIndex + 1);
    });

    buildGallery();
})();

function updateParallax() {
    if (!spacer || !car) return;
    const spacerTop = spacer.getBoundingClientRect().top + window.scrollY;
    const scrollY   = window.scrollY;
    const start     = spacerTop;
    const end       = spacerTop + spacer.offsetHeight - window.innerHeight;

    if (end <= start) return; // evita divisão por zero em telas pequenas

    const progress  = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
    const startX = -180;
    const endX   = window.innerWidth + 180;
    car.style.left = (startX + (endX - startX) * progress) + "px";
}