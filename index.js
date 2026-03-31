let taches = [];                    
let tachesProjetTemp = [];          
document.addEventListener('DOMContentLoaded', () => {

    console.log(" JavaScript chargé avec succès");
   
const citations = [
    "Aujourd'hui, une seule tâche suffit. C'est déjà beaucoup.",
    "Tu n'as pas à tout faire. Juste le prochain petit pas.",
    "Sois doux·ce avec toi-même, tu fais de ton mieux.",
    "Les petites victoires comptent autant que les grandes.",
    "Ce n'est pas la vitesse qui compte, c'est le mouvement.",
    "Respire. Tu as plus de temps que tu ne le crois.",
    "Chaque tâche cochée est une victoire, même la plus petite.",
    "Tu as déjà surmonté des journées difficiles. Celle-ci aussi.",
    "Il n'y a pas de bonne ou mauvaise façon d'avancer.",
    "Commence par ce qui te semble possible aujourd'hui.",
    "Le repos fait partie du travail. Accorde-toi cette pause.",
    "Tu n'es pas en retard. Tu es exactement où tu dois être.",
    "Une chose à la fois. C'est suffisant.",
    "Ton cerveau fonctionne différemment, pas moins bien.",
    "Les mauvaises journées ne durent pas. Tiens bon.",
    "Tu mérites de la bienveillance, surtout de toi-même.",
    "Avancer lentement vaut mieux que ne pas avancer du tout.",
    "Célèbre chaque petit progrès, il compte vraiment.",
    "Tu fais de ton mieux avec l'énergie que tu as. C'est assez.",
    "Aujourd'hui tu as ouvert cette app. C'est déjà un début."
];

// Choisit une citation aléatoire
const indexAleatoire = Math.floor(Math.random() * citations.length);
document.getElementById('quote').textContent = citations[indexAleatoire];

    // ==================== ÉLÉMENTS DU DOM ====================
    const overlay = document.getElementById('overlay');

    // Drawer Nouvelle Tâche
    const btnNouvelleTache = document.getElementById('btn-nouvelle-tache');
    const drawerNouvelleTache = document.getElementById('drawer-nouvelle-tache');
    const btnFermerTache = document.getElementById('btn-fermer-tache');
    const btnValiderTache = document.getElementById('btn-valider-tache');

    const energieBtns = document.querySelectorAll('.energie-options .energie-btn');
    const prioriteBtns = document.querySelectorAll('.priorite-options .priorite-btn');

    const listeTaches = document.getElementById('liste-taches');

    let energieChoisie = '';
    let prioriteChoisie = '';

    // Drawer Projet Étape 1
    const btnProjet = document.getElementById('btn-projet');
    const drawerProjetEtape1 = document.getElementById('drawer-projet-etape1');
    const btnFermerProjet = document.getElementById('btn-fermer-projet');
    const btnContinuerProjet = document.getElementById('btn-continuer-projet');

    const dateDebutProjet = document.getElementById('date-debut-projet');
    const dateFinProjet = document.getElementById('date-fin-projet');

    // Drawer Projet Étape 2
    const drawerProjetEtape2 = document.getElementById('drawer-projet-etape2');
    const btnRetourEtape1 = document.getElementById('btn-retour-etape1');
    const btnFermerProjetEtape2 = document.getElementById('btn-fermer-projet-etape2');
    const btnAjouterTacheProjet = document.getElementById('btn-ajouter-tache-projet');
    
    // ==================== NOUVELLE TÂCHE ====================

    btnNouvelleTache.addEventListener('click', () => {
        drawerNouvelleTache.classList.add('actif');
        overlay.classList.add('actif');
    });

    function fermerDrawerNouvelleTache() {
        drawerNouvelleTache.classList.remove('actif');
        overlay.classList.remove('actif');
    }

    btnFermerTache.addEventListener('click', fermerDrawerNouvelleTache);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) fermerDrawerNouvelleTache();
    });

    energieBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            energieBtns.forEach(b => b.classList.remove('actif'));
            btn.classList.add('actif');
            energieChoisie = btn.dataset.energie;
        });
    });

    prioriteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            prioriteBtns.forEach(b => b.classList.remove('actif'));
            btn.classList.add('actif');
            prioriteChoisie = btn.dataset.priorite;
        });
    });

    btnValiderTache.addEventListener('click', () => {
        const titre = document.getElementById('titre-tache').value.trim();

        if (titre === '') {
            alert("Le titre est obligatoire !");
            return;
        }
        if (!energieChoisie) {
            alert("Veuillez choisir un niveau d'énergie");
            return;
        }
        if (!prioriteChoisie) {
            alert("Veuillez choisir une priorité");
            return;
        }

        const nouvelleTache = {
            id: Date.now(),
            titre: titre,
            description: document.getElementById('desc-tache').value.trim(),
            date: document.getElementById('date-tache').value,
            energie: energieChoisie,
            priorite: prioriteChoisie,
            complete: false
        };

        taches.push(nouvelleTache);
        afficherTache(nouvelleTache);

        fermerDrawerNouvelleTache();
        reinitialiserFormulaire();
    });

    function afficherTache(tache) {
        const li = document.createElement('li');
        li.classList.add('tache-item');
        if (tache.complete) li.classList.add('complete');
        li.dataset.id = tache.id;

        li.innerHTML = `
            <input type="checkbox" ${tache.complete ? 'checked' : ''}>
            <div class="tache-contenu">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="tache-titre">${tache.titre}</span>
                    <div class="tache-badges">
                        <span class="badge badge-energie-${tache.energie}">${getEnergieLabel(tache.energie)}</span>
                        <span class="badge badge-priorite-${tache.priorite}">${getPrioriteLabel(tache.priorite)}</span>
                    </div>
                </div>
                <div class="tache-details">
                    ${tache.description ? `<p><strong>Description :</strong> ${tache.description}</p>` : ''}
                    ${tache.date ? `<p><strong>Date :</strong> 📅 ${tache.date}</p>` : ''}
                </div>
            </div>
            <div class="tache-actions">
                <button class="btn-supprimer" title="Supprimer">🗑</button>
            </div>
        `;

        li.addEventListener('click', (e) => {
            if (e.target.type === 'checkbox' || e.target.classList.contains('btn-supprimer')) return;
            li.classList.toggle('actif');
        });

        li.querySelector('input[type="checkbox"]').addEventListener('change', function(e) {
            e.stopPropagation();
            tache.complete = this.checked;
            li.classList.toggle('complete', this.checked);
        });

        li.querySelector('.btn-supprimer').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Supprimer "${tache.titre}" ?`)) {
                taches = taches.filter(t => t.id !== tache.id);
                li.remove();
            }
        });

        listeTaches.appendChild(li);
    }

    function reinitialiserFormulaire() {
        document.getElementById('titre-tache').value = '';
        document.getElementById('desc-tache').value = '';
        document.getElementById('date-tache').value = '';
        energieBtns.forEach(b => b.classList.remove('actif'));
        prioriteBtns.forEach(b => b.classList.remove('actif'));
        energieChoisie = '';
        prioriteChoisie = '';
    }

    function getEnergieLabel(energie) {
        const map = { JD: "Compliquée", FE: "Pas facile", EN: "Facile", PE: "Très facile" };
        return map[energie] || energie;
    }

    function getPrioriteLabel(priorite) {
        const map = { haute: "Haute", moyenne: "Moyenne", basse: "Basse" };
        return map[priorite] || priorite;
    }
    
    // Étape 1
    btnProjet.addEventListener('click', () => {
        drawerProjetEtape1.classList.add('actif');
        overlay.classList.add('actif');
    });

    btnFermerProjet.addEventListener('click', () => {
        drawerProjetEtape1.classList.remove('actif');
        overlay.classList.remove('actif');
    });

    dateDebutProjet.addEventListener('change', () => {
        if (!dateDebutProjet.value) return;
        const debut = new Date(dateDebutProjet.value);
        debut.setMonth(debut.getMonth() + 3);
        dateFinProjet.value = debut.toISOString().split('T')[0];
    });

    btnContinuerProjet.addEventListener('click', () => {
        const nom = document.getElementById('nom-projet').value.trim();
        if (nom === '') {
            alert("Le nom du projet est obligatoire !");
            return;
        }
        drawerProjetEtape1.classList.remove('actif');
        drawerProjetEtape2.classList.add('actif');
    });

    // Étape 2
    btnRetourEtape1.addEventListener('click', () => {
        drawerProjetEtape2.classList.remove('actif');
        drawerProjetEtape1.classList.add('actif');
    });

    btnFermerProjetEtape2.addEventListener('click', () => {
        drawerProjetEtape2.classList.remove('actif');
        overlay.classList.remove('actif');
        tachesProjetTemp = [];
        document.getElementById('compteur-taches-projet').textContent = '0';
    });

    // Sélection énergie et priorité étape 2
    document.querySelectorAll('#drawer-projet-etape2 .energie-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#drawer-projet-etape2 .energie-btn').forEach(b => b.classList.remove('actif'));
            btn.classList.add('actif');
        });
    });

    document.querySelectorAll('#drawer-projet-etape2 .priorite-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#drawer-projet-etape2 .priorite-btn').forEach(b => b.classList.remove('actif'));
            btn.classList.add('actif');
        });
    });

    btnAjouterTacheProjet.addEventListener('click', () => {
        const titre = document.getElementById('titre-tache-projet').value.trim();
        if (titre === '') {
            alert("Le titre de la tâche est obligatoire");
            return;
        }

        tachesProjetTemp.push({
            titre: titre,
            description: document.getElementById('desc-tache-projet').value.trim(),
            date: document.getElementById('date-tache-projet').value,
            energie: document.querySelector('#drawer-projet-etape2 .energie-btn.actif')?.dataset.energie || '',
            priorite: document.querySelector('#drawer-projet-etape2 .priorite-btn.actif')?.dataset.priorite || ''
        });

        document.getElementById('compteur-taches-projet').textContent = tachesProjetTemp.length;

        // Réinitialiser
        document.getElementById('titre-tache-projet').value = '';
        document.getElementById('desc-tache-projet').value = '';
        document.getElementById('date-tache-projet').value = '';
    });

   
    const btnCreerProjetFinal = document.getElementById('btn-creer-projet-final');

    if (btnCreerProjetFinal) {
    btnCreerProjetFinal.addEventListener('click', () => {
        const nom = document.getElementById('nom-projet').value.trim();

        if (nom === '') {
            alert("Le nom du projet est obligatoire !");
            return;
        }

        const projet = {
            id: Date.now(),
            nom: nom,
            description: document.getElementById('desc-projet').value.trim() || '',
            dateDebut: document.getElementById('date-debut-projet').value,
            dateFin: document.getElementById('date-fin-projet').value,
            couleur: '#6dabd4',
            taches: [...tachesProjetTemp],
            progression: 0,
            dateCreation: new Date().toISOString().split('T')[0]
        };

        // Sauvegarde
        let projets = JSON.parse(localStorage.getItem('projets')) || [];
        projets.push(projet);
        localStorage.setItem('projets', JSON.stringify(projets));
       
        // Fermeture des drawers
        const drawer2 = document.getElementById('drawer-projet-etape2');
        const overlayEl = document.getElementById('overlay');
        if (drawer2) drawer2.classList.remove('actif');
        if (overlayEl) overlayEl.classList.remove('actif');

        // Réinitialisation
        tachesProjetTemp = [];
        const compteur = document.getElementById('compteur-taches-projet');
        if (compteur) compteur.textContent = '0';

        // Nettoyage formulaire étape 1
        ['nom-projet', 'desc-projet', 'date-debut-projet', 'date-fin-projet'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

        // Redirection
            localStorage.setItem('projetActif', JSON.stringify(projet));
            window.location.href = 'projet.html';
        
    });
}

});