let dureeTravail = 25;
let dureePause = 5;
let tempsRestant = dureeTravail * 60;
let enCours = false;
let enPause = false;
let interval = null;
let nbSessions = 0;
let moodChoisi = '';
let messages = {
    'JD': "Doux et court, tu peux le faire 💙",
    'FE': "Un petit effort, une belle pause 🌱",
    'EN': "Le rythme classique, tu gères ! 🌿",
    'PE': "Tu es en feu aujourd'hui ! 🔥"
};

// Sélection du mood
const moodBtns = document.querySelectorAll('.mood-btn');
moodBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        moodBtns.forEach(b => b.classList.remove('actif'));
        btn.classList.add('actif');

        moodChoisi = btn.dataset.mood;
        dureeTravail = parseInt(btn.dataset.travail);
        dureePause = parseInt(btn.dataset.pause);
        tempsRestant = dureeTravail * 60;

        // Affiche le timer
        document.getElementById('pomodoro-timer').style.display = 'block';
        document.getElementById('pomodoro-message').textContent = messages[moodChoisi];
        
        mettreAJourAffichage();
        mettreAJourCercle(1);
        reinitialiserTimer();
    });
});

document.getElementById('btn-start').addEventListener('click', demarrer);
document.getElementById('btn-pause').addEventListener('click', pauseTimer);
document.getElementById('btn-reset').addEventListener('click', reinitialiserTimer);

function demarrer() {
    if (enCours) return;
    enCours = true;
    enPause = false;

    interval = setInterval(function() {
        tempsRestant--;

        mettreAJourAffichage();
        
        const dureeTotal = document.getElementById('timer-statut').textContent.includes('Travail')
            ? dureeTravail * 60
            : dureePause * 60;
        mettreAJourCercle(tempsRestant / dureeTotal);

        if (tempsRestant <= 0) {
            clearInterval(interval);
            enCours = false;
            passerEtapeSuivante();
        }
    }, 1000);
}

function pauseTimer() {
    if (!enCours) return;
    clearInterval(interval);
    enCours = false;
    enPause = true;
}

function reinitialiserTimer() {
    clearInterval(interval);
    enCours = false;
    enPause = false;
    tempsRestant = dureeTravail * 60;
    document.getElementById('timer-statut').textContent = 'Travail 💼';
    mettreAJourAffichage();
    mettreAJourCercle(1);
}

function passerEtapeSuivante() {
    const statut = document.getElementById('timer-statut').textContent;

    if (statut.includes('Travail')) {
        // Passe en pause
        tempsRestant = dureePause * 60;
        document.getElementById('timer-statut').textContent = 'Pause ☕';
        document.getElementById('pomodoro-message').textContent = 'Bravo ! Prends une pause bien méritée ☕';
    } else {
        // Passe en travail
        nbSessions++;
        document.getElementById('nb-sessions').textContent = nbSessions;
        tempsRestant = dureeTravail * 60;
        document.getElementById('timer-statut').textContent = 'Travail 💼';
        document.getElementById('pomodoro-message').textContent = 'Pause terminée ! On repart 💪';
    }

    mettreAJourAffichage();
    mettreAJourCercle(1);
    demarrer(); // reprend automatiquement
}

function mettreAJourAffichage() {
    const minutes = Math.floor(tempsRestant / 60);
    const secondes = tempsRestant % 60;
    document.getElementById('timer-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('timer-secondes').textContent = String(secondes).padStart(2, '0');
}

function mettreAJourCercle(progression) {
    const cercle = document.getElementById('timer-progress');
    const rayon = 90;
    const circonference = 2 * Math.PI * rayon;
    cercle.style.strokeDasharray = circonference;
    cercle.style.strokeDashoffset = circonference * (1 - progression);
}

// Bouton retour
document.getElementById('btn-retour').addEventListener('click', function() {
    window.location.href = 'index.html';
});