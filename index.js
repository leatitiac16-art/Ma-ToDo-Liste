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

//PROJET

// Drawer Projet
const btnProjet = document.getElementById('Projet');
//getElementById → cherche un id (sans # ni point)
const drawerProjet = document.getElementById('drawer-projet');
const btnFermerProjet = document.querySelector('.btn-fermer-projet');
//querySelector('.maClasse') → cherche une classe (avec un point)
const dateDebut = document.getElementById('date-debut-projet');
const dateFin = document.getElementById('date-fin-projet');
//il n'y a pas de ligne overlay car la constante est déjà déclaréé tout en haut
//querySelector('#monId') → cherche un id (avec un #

btnProjet.addEventListener('click', function() {
    drawerProjet.classList.add('actif');
    overlay.classList.add('actif'); // on ne précise pas "projet" car on réutilse la constante déjà existante
});

btnFermerProjet.addEventListener('click', function () {
    drawerProjet.classList.remove('actif');
    overlay.classList.remove('actif');
});

// Calculer la durée du projet (3 mois)
dateDebut.addEventListener('change', function() { //quand la date est choisie, la fonction s déclanche
    const debut = new Date(dateDebut.value); //la date choisie se transforme en objet,
    // JS peut manipuler cet objet mathématiquement
    debut.setMonth(debut.getMonth() + 3);// debut.getMonth(), Récupère le mois de début, puis ajoute les 3mois
    // debut.setMonth(), Applique le nouveau mois (la date butoire)
    const finFormatee = debut.toISOString().split('T')[0];// tiISOString(), transforme la date en texte: "2024-09-15T00:00:00.000Z"
    // split('T')[0], sépare la date et l'heure, et ne prend que la partie date "2024-09-15"
    dateFin.value = finFormatee; // met la date calculée dans le champ "Date de fin" automatiquement
});

// Sélection de la couleur
const couleurBtns = document.querySelectorAll('.couleur-btn');
let couleurChoisie = '#6dadb4'; //couleur par défaut A CHNAGER

couleurBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        couleurBtns.forEach(b => b.classList.remove('actif-couleur'));
        btn.classList.add('actif-couleur');
        couleurChoisie = btn.dataset.couleur;
    });
});

// Créer le projet
const listeProjets = [];

// Afficher un projet dans la page
function afficherProjet(projet) {
    const ul = document.getElementById('liste-taches');

    const li = document.createElement('li');
    li.classList.add('projet-card');
    li.style.borderLeftColor = projet.couleur;

    li.innerHTML = `
    <h4>${projet.nom}</h4>
    <p>${projet.description}</p>
    <p class="projet-dates">${projet.dateDebut} → ${projet.dateFin}</p>
    <div class="cercle-progression">
        <div class="cercle" style="background: conic-gradient(${projet.couleur} 0%, #eee 0%)">
            0%
        </div>
    </div>
    <button class="btn-voir-projet">Voir le projet →</button>`;

    li.querySelector('.btn-voir-projet').addEventListener('click', function() {
        localStorage.setItem('projetActif', JSON.stringify(projet));
        window.location.href = 'projet.html';
    });

    ul.appendChild(li);
}
// RAPPEL: Une constante stocke une valeur fixe (elle est exécutée une seule fois);
// Une fonction est un bloc de code réutilisable

// Drawer étape 2: création des tâches
const drawerTachesProjet = document.getElementById('drawer-taches-projet');
const btnFermerTachesProjet = document.querySelector('.btn-fermer-taches-projet');
const btnContinuerProjet = document.getElementById('btn-continuer-projet');
const btnAjouterTacheProjet = document.getElementById('btn-ajouter-tache-projet');
const btnCreerProjet = document.getElementById('btn-creer-projet');
let tachesTemp = []; // tableau temporaire pour stocker les tâches avant création du projet

// Passer de l'étape 1 à l'étape 2
btnContinuerProjet.addEventListener('click', function() {
    const nom = document.getElementById('nom-projet').value.trim();

    if (nom === '') {
        alert('Le nom du projet est obligatoire !');
        return;
    }

    drawerProjet.classList.remove('actif');
    drawerTachesProjet.classList.add('actif');
    //Il y a un seul overlay dans le HTML pour tous les drawer
});

// Sélection énergie tâches projet
//On récupère tous les boutons d'énergie
const energieTacheBtns = document.querySelectorAll('.energie-tache-btn');
// Création d'une variable vide pour stocker l'énergie choisie par l'utilisateur
let energieTacheChoisie = '';

// Création "d'une boucle" qui représente chacun des 4 boutons
energieTacheBtns.forEach(function(btn) {
    // Quand l'utilisateur clique sue un bouton, les instructons à l'intérieur s'exécutent
    btn.addEventListener('click', function() {
        // On retire d'abord la classe actif-energie de tous les boutons. Ça évite d'avoir plusieurs boutons sélectionnés en même temps.
        energieTacheBtns.forEach(b => b.classList.remove('actif-energie'));
        //Maintenant on ajoute la classe actif-energie uniquement sur le bouton sur lequel on vient de cliquer.
        btn.classList.add('actif-energie');
        //On sauvegarde la valeur du bouton cliqué dans notre variable. dataset.energie récupère 
        // la valeur de l'attribut data-energie dans le HTML :
        //<button class="energie-tache-btn" data-energie="JD">🔴 Journée Difficile</button>
        energieTacheChoisie = btn.dataset.energie;
    });
});

// Sélection priorité dans le drawer tâches projet
const prioriteTacheBtns = document.querySelectorAll('.priorite-tache-btn');
let prioriteTacheChoisie = '';

prioriteTacheBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        prioriteTacheBtns.forEach(b => b.classList.remove('actif-priorite'));
        btn.classList.add('actif-priorite');
        prioriteTacheChoisie = btn.dataset.priorite;
    });
});

// Bouton "Ajouter tâche"
btnAjouterTacheProjet.addEventListener('click', function() {
    const titre = document.getElementById('titre-tache-projet').value.trim();

    if (titre === '') {
        alert('Le nom de la tâche est obligatoire !');
        return;
    }

    // Crée l'objet tâche
    const tache = {
        titre: titre,
        description: document.getElementById('desc-tache-projet').value.trim(),
        date: document.getElementById('date-tache-projet').value,
        energie: energieTacheChoisie,
        priorite: prioriteTacheChoisie,
        soustaches: [],
        complete: false
    };

    tachesTemp.push(tache);

const ul = document.getElementById('liste-taches-temp');
const li = document.createElement('li');


const couleurEnergie = {
        'JD': '#e74c3c',
        'FE': '#e67e22',
        'EN': '#3d9551',
        'PE': '#1b54a4'
    };

    li.style.borderLeftColor = couleurEnergie[tache.energie] || '#6dabd4';
    li.textContent = tache.titre + ' — ' + (tache.priorite || 'pas de priorité');
    ul.appendChild(li);/*  */
    document.getElementById('compteur').textContent = tachesTemp.length;

    document.getElementById('titre-tache-projet').value = '';
    document.getElementById('desc-tache-projet').value = '';
    document.getElementById('date-tache-projet').value = '';
    energieTacheBtns.forEach(b => b.classList.remove('actif-energie'));
    prioriteTacheBtns.forEach(b => b.classList.remove('actif-priorite'));
    energieTacheChoisie = '';
    prioriteTacheChoisie = '';
});

btnCreerProjet.addEventListener('click', function() {
    const nom = document.getElementById('nom-projet').value.trim();
    const desc = document.getElementById('desc-projet').value.trim();
    const debut = document.getElementById('date-debut-projet').value;
    const fin = document.getElementById('date-fin-projet').value;

    const projet = {
        nom: nom,
        description: desc,
        dateDebut: debut,
        dateFin: fin,
        couleur: '#6dabd4',
        taches: tachesTemp,
        progression: 0
    };

    listeProjets.push(projet);
    afficherProjet(projet);

    drawerTachesProjet.classList.remove('actif');
    overlay.classList.remove('actif');
    tachesTemp = [];
    document.getElementById('liste-taches-temp').innerHTML = '';
    document.getElementById('compteur').textContent = '0';
    document.getElementById('nom-projet').value = '';
    document.getElementById('desc-projet').value = '';
    document.getElementById('date-debut-projet').value = '';
    document.getElementById('date-fin-projet').value = '';
});

// Fermer le drawer étape 2
btnFermerTachesProjet.addEventListener('click', function() {
    drawerTachesProjet.classList.remove('actif');
    overlay.classList.remove('actif');
    tachesTemp = []; // vide les tâches temporaires
    document.getElementById('liste-taches-temp').innerHTML = '';
    document.getElementById('compteur').textContent = '0';
});


