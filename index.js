const btnNT = document.getElementById('NT');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
const btnFermer = document.getElementById('btn-fermer');

// Ouvrir le drawer
btnNT.addEventListener('click', function() {
    drawer.classList.add('actif');
    overlay.classList.add('actif');
});

// Fermer le drawer avec le bouton ✕
btnFermer.addEventListener('click', function() {
    drawer.classList.remove('actif');
    overlay.classList.remove('actif');
});

// Fermer le drawer en cliquant sur l'overlay
overlay.addEventListener('click', function() {
    drawer.classList.remove('actif');
    overlay.classList.remove('actif');
});