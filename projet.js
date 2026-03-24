const projet = JSON.parse(localStorage.getItem('projetActif'));

if (projet) {
    // Afficher les infos du projet
    document.getElementById('titre-projet').textContent = projet.nom;
    document.getElementById('desc-projet-page').textContent = projet.description;
    document.getElementById('dates-projet').textContent = projet.dateDebut + ' → ' + projet.dateFin;
    document.getElementById('projet-header').style.borderLeftColor = projet.couleur;
    document.getElementById('cercle-projet').style.background =
        'conic-gradient(' + projet.couleur + ' 0%, #eee 0%)';

    // Afficher les tâches en accordion
    const ul = document.getElementById('liste-taches-projet');
    
    if (projet.taches.length === 0) {
        ul.innerHTML = '<p style="color:#999; font-size:14px;">Aucune tâche pour ce projet.</p>';
    } else {
        projet.taches.forEach(function(tache, index) {
            const li = document.createElement('li');
            li.classList.add('tache-accordion');

            li.innerHTML = `
                <div class="tache-header">
                    <span class="tache-fleche">▶</span>
                    <span class="tache-titre">${tache.titre}</span>
                    <div class="tache-badges">
                        <span class="badge badge-energie-${tache.energie}">${tache.energie || '?'}</span>
                        <span class="badge badge-priorite-${tache.priorite}">${tache.priorite || '?'}</span>
                    </div>
                </div>
                <div class="tache-contenu">
                    <p class="tache-description">${tache.description || 'Pas de description'}</p>
                    <p class="tache-date">${tache.date ? '📅 ' + tache.date : ''}</p>
                    <ul class="sous-taches" id="sous-taches-${index}"></ul>
                    <button class="btn-ajouter-sous-tache" data-index="${index}">+ Ajouter une sous-tâche</button>
                </div>
            `;

            // Ouvrir/fermer l'accordion au clic
            li.querySelector('.tache-header').addEventListener('click', function() {
                li.classList.toggle('actif');
            });

            // Ajouter une sous-tâche
            li.querySelector('.btn-ajouter-sous-tache').addEventListener('click', function(e) {
                e.stopPropagation(); // empêche l'accordion de se fermer
                const texte = prompt('Nom de la sous-tâche :');
                if (texte && texte.trim() !== '') {
                    ajouterSousTache(index, texte.trim());
                }
            });

            ul.appendChild(li);
        });
    }
}

// Ajouter une sous-tâche
function ajouterSousTache(indexTache, texte) {
    const sousTacheUl = document.getElementById('sous-taches-' + indexTache);

    const li = document.createElement('li');
    li.classList.add('sous-tache-item');
    li.innerHTML = `
        <input type="checkbox" />
        <span>${texte}</span>
    `;

    // Cocher une sous-tâche
    li.querySelector('input').addEventListener('change', function() {
        if (this.checked) {
            li.classList.add('complete');
        } else {
            li.classList.remove('complete');
        }
    });

    sousTacheUl.appendChild(li);
}

// Bouton retour
document.getElementById('btn-retour').addEventListener('click', function() {
    window.location.href = 'index.html';
});