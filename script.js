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