const projet = JSON.parse(localStorage.getItem('projetActif'));

if (!projet) {
    console.warn("Aucun projet actif trouvé dans le localStorage.");
    window.location.href = 'index.html';
}

document.getElementById('page-title').textContent = projet.nom || 'Détails du Projet';
document.getElementById('titre-projet').textContent = projet.nom || 'Projet sans nom';
document.getElementById('desc-projet-page').textContent = projet.description || 'Aucune description';
document.getElementById('dates-projet').textContent = 
    `${projet.dateDebut || '?'} → ${projet.dateFin || '?'}`;

document.getElementById('projet-header').style.borderLeftColor = projet.couleur || '#6dabd4';

const cercle = document.getElementById('cercle-projet');
if (cercle) {
    cercle.style.background = `conic-gradient(${projet.couleur || '#6dabd4'} ${projet.progression || 0}%, #eee 0%)`;
}
document.getElementById('pourcentage-projet').textContent = `${projet.progression || 0}%`;

// =============================================
//  Fonction qui génère le HTML d'une tâche
// =============================================
function creerHTMLTache(tache, index) {
    return `
        <div class="tache-header">
            <span class="tache-fleche">▶</span>
            <span class="tache-titre">${tache.titre || 'Sans titre'}</span>
            <div class="tache-badges">
                <span class="badge badge-energie-${tache.energie || 'aucune'}">
                    ${tache.energie || '?'}
                </span>
                <span class="badge badge-priorite-${tache.priorite || 'aucune'}">
                    ${tache.priorite || '?'}
                </span>
            </div>
        </div>

        <div class="tache-contenu">
            <p class="tache-description">
                ${tache.description ? tache.description : 'Pas de description'}
            </p>
            <p class="tache-date">
                ${tache.date ? `📅 ${tache.date}` : ''}
            </p>

            <ul class="sous-taches" id="sous-taches-${index}"></ul>
            
            <button class="btn-ajouter-sous-tache" data-index="${index}">
                + Ajouter une sous-tâche
            </button>

            <div class="form-sous-tache" id="form-sous-tache-${index}" style="display: none;">
                <input type="text" class="input-sous-tache" placeholder="Titre de la sous-tâche..." />
                <textarea class="desc-sous-tache" placeholder="Description (optionnel)..."></textarea>
                
                <div class="form-sous-tache-btns">
                    <button class="btn-valider-sous-tache" data-index="${index}">✅ Ajouter</button>
                    <button class="btn-annuler-sous-tache" data-index="${index}">Annuler</button>
                </div>
            </div>
        </div>
    `;
}

const ul = document.getElementById('liste-taches-projet');
const messageAucuneTache = document.getElementById('message-aucune-tache');

if (!projet.taches || projet.taches.length === 0) {
    if (ul) ul.style.display = 'none';
    if (messageAucuneTache) messageAucuneTache.style.display = 'block';
} else {
    if (ul) ul.style.display = 'block';
    if (messageAucuneTache) messageAucuneTache.style.display = 'none';

    projet.taches.forEach((tache, index) => {
        const li = document.createElement('li');
        li.classList.add('tache-accordion');
        li.innerHTML = creerHTMLTache(tache, index);

        // Ouvrir / fermer l'accordion
        const header = li.querySelector('.tache-header');
        if (header) {
            header.addEventListener('click', () => {
                li.classList.toggle('actif');
            });
        }

        // Gestion bouton ajouter sous-tâche
        const btnAjouterSous = li.querySelector('.btn-ajouter-sous-tache');
        const formSous = li.querySelector('.form-sous-tache');

        if (btnAjouterSous && formSous) {
            btnAjouterSous.addEventListener('click', (e) => {
                e.stopPropagation();
                formSous.style.display = 'block';
                btnAjouterSous.style.display = 'none';
            });
        }

        ul.appendChild(li);
    });
}

const btnAjouterTacheProjet = document.getElementById('btn-ajouter-tache-projet');
if (btnAjouterTacheProjet) {
    btnAjouterTacheProjet.addEventListener('click', () => {
        alert("Fonctionnalité 'Ajouter une tâche dans le projet' en cours de développement.\n\nPour l'instant, les tâches peuvent être créées depuis la page d'accueil.");
    });
}

const btnRetour = document.getElementById('btn-retour');
if (btnRetour) {
    btnRetour.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}