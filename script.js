const track = document.getElementById('slider-track');
const window_ = document.querySelector('.themes-ctn');
const dotsContainer = document.getElementById('slider-dots');
const cards = document.querySelectorAll('.theme-card');

let current = 0;
let startX = 0;
let dragging = false;
let dist = 0;

// Gera dots
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

function onDragEnd() {
    dragging = false;
    window_.classList.remove('grabbing');
    if (dist < -80 && current < cards.length - 1) current++;
    else if (dist > 80 && current > 0) current--;
    dist = 0;
    goTo(current);
}

// Mouse
window_.addEventListener('mousedown', (e) => {
    e.preventDefault();         // impede o drag nativo do navegador
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

// COUNTDOWN ---------------------------------------------------------
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

// PARALLAX
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

// BOTÃO VOLTAR AO TOPO
const backToTop = document.getElementById("back-to-top");

// mostrar/esconder botão
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}, { passive: true });

// ação ao clicar (scroll suave)
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});