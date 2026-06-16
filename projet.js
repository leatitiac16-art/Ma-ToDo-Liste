function getEnergieLabel(energie) {
    const map = { JD: "Compliquée", FE: "Pas facile", EN: "Facile", PE: "Très facile" };
    return map[energie] || energie;
}

function getPrioriteLabel(priorite) {
    const map = { haute: "Haute", moyenne: "Moyenne", basse: "Basse" };
    return map[priorite] || priorite;
}

const projetLocal = JSON.parse(localStorage.getItem('projetActif'));

if (!projetLocal || !projetLocal.id) {
    console.warn("Aucun projet actif trouvé.");
    window.location.href = 'index.html';
}

async function chargerProjet() {
    try {
        const response = await fetch(`http://localhost:3000/projets/${projetLocal.id}`);
        if (!response.ok) { window.location.href = 'index.html'; return; }
        const projet = await response.json();
        afficherProjet(projet);
    } catch (error) {
        console.error('Erreur chargement projet:', error);
        window.location.href = 'index.html';
    }
}

function afficherProjet(projet) {
    document.getElementById('page-title').textContent = projet.nom || 'Détails du Projet';
    document.getElementById('titre-projet').textContent = projet.nom || 'Projet sans nom';
    document.getElementById('desc-projet-page').textContent = projet.description || 'Aucune description';
    document.getElementById('dates-projet').textContent = `${projet.dateDebut || '?'} → ${projet.dateFin || '?'}`;
    document.getElementById('projet-header').style.borderLeftColor = projet.couleur || '#6dabd4';
    mettreAJourCercle(projet.couleur, projet.progression);

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

            // Accordion
            const header = li.querySelector('.tache-header');
            if (header) {
                header.addEventListener('click', (e) => {
                    if (e.target.type === 'checkbox') return;
                    li.classList.toggle('actif');
                });
            }

            // Checkbox tâche
            const checkbox = li.querySelector('.checkbox-tache');
            if (checkbox) {
                checkbox.addEventListener('change', async function() {
                    tache.terminee = this.checked;
                    const titrEl = li.querySelector('.tache-titre');
                    if (titrEl) titrEl.classList.toggle('complete', this.checked);

                    try {
                        await fetch(`http://localhost:3000/taches-projet/${tache.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ terminee: this.checked })
                        });
                    } catch (error) {
                        console.error('Erreur mise à jour tâche:', error);
                    }

                    const total = projet.taches.length;
                    const terminees = projet.taches.filter(t => t.terminee).length;
                    const progression = Math.round((terminees / total) * 100);
                    mettreAJourCercle(projet.couleur, progression);

                    try {
                        await fetch(`http://localhost:3000/projets/${projet.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ progression })
                        });
                    } catch (error) {
                        console.error('Erreur mise à jour progression:', error);
                    }
                });
            }

            // Bouton ajouter sous-tâche
            const btnAjouterSous = li.querySelector('.btn-ajouter-sous-tache');
            const formSous = li.querySelector('.form-sous-tache');
            const btnValiderSous = li.querySelector('.btn-valider-sous-tache');
            const btnAnnulerSous = li.querySelector('.btn-annuler-sous-tache');
            const inputSous = li.querySelector('.input-sous-tache');

            if (btnAjouterSous && formSous) {
                btnAjouterSous.addEventListener('click', (e) => {
                    e.stopPropagation();
                    formSous.style.display = 'block';
                    btnAjouterSous.style.display = 'none';
                });
            }

            if (btnValiderSous) {
                btnValiderSous.addEventListener('click', async () => {
                    const titre = inputSous.value.trim();
                    if (titre === '') { alert('Le titre est obligatoire !'); return; }

                    try {
                        const response = await fetch(`http://localhost:3000/taches-projet/${tache.id}/sous-taches`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ titre })
                                
                        });
                        const sousTache = await response.json();

                        const ulSous = li.querySelector('.sous-taches');
                        const liSous = document.createElement('li');
                        liSous.classList.add('sous-tache-item');
                        liSous.innerHTML = `
                            <input type="checkbox">
                            <div class="sous-tache-texte">
                            <span class="sous-tache-titre">${sousTache.titre}</span>
                            </div>
                        `;
                        ulSous.appendChild(liSous);

                        inputSous.value = '';
                        if (formSous) formSous.style.display = 'none';
                        if (btnAjouterSous) btnAjouterSous.style.display = 'block';

                    } catch (error) {
                        console.error('Erreur ajout sous-tâche:', error);
                    }
                });
            }

            if (btnAnnulerSous) {
                btnAnnulerSous.addEventListener('click', () => {
                    inputSous.value = '';
                    if (formSous) formSous.style.display = 'none';
                    if (btnAjouterSous) btnAjouterSous.style.display = 'block';
                });
            }

            ul.appendChild(li);
        });
    }
}

function mettreAJourCercle(couleur, progression) {
    const cercle = document.getElementById('cercle-projet');
    if (cercle) {
        cercle.style.background = `conic-gradient(${couleur || '#6dabd4'} ${progression}%, #eee 0%)`;
    }
    document.getElementById('pourcentage-projet').textContent = `${progression}%`;
}

function creerHTMLTache(tache, index) {
    return `
        <div class="tache-header">
            <input type="checkbox" class="checkbox-tache" data-id="${tache.id}" ${tache.terminee ? 'checked' : ''}>
            <span class="tache-fleche">▶</span>
            <span class="tache-titre ${tache.terminee ? 'complete' : ''}">${tache.titre || 'Sans titre'}</span>
            <div class="tache-badges">
                <span class="badge badge-energie-${tache.energie || 'aucune'}">${getEnergieLabel(tache.energie)}</span>
                <span class="badge badge-priorite-${tache.priorite || 'aucune'}">${getPrioriteLabel(tache.priorite)}</span>
            </div>
        </div>
        <div class="accordion-contenu">
            <p class="tache-description">${tache.description ? tache.description : 'Pas de description'}</p>
            <p class="tache-date">${tache.date ? tache.date : ''}</p>
            <ul class="sous-taches" id="sous-taches-${index}">
                ${(tache.sousTaches || []).map(st => `
                    <li class="sous-tache-item">
                        <input type="checkbox" ${st.terminee ? 'checked' : ''}>
                        <div class="sous-tache-texte">
                            <span class="sous-tache-titre ${st.terminee ? 'complete' : ''}">${st.titre}</span>
                        </div>
                    </li>
                `).join('')}
            </ul>
            <button class="btn-ajouter-sous-tache" data-index="${index}">+ Ajouter une sous-tâche</button>
            <div class="form-sous-tache" id="form-sous-tache-${index}" style="display: none;">
                <input type="text" class="input-sous-tache" placeholder="Titre de la sous-tâche..." />
                <div class="form-sous-tache-btns">
                    <button class="btn-valider-sous-tache" data-index="${index}">Ajouter</button>
                    <button class="btn-annuler-sous-tache" data-index="${index}">Annuler</button>
                </div>
            </div>
        </div>
    `;
}

const btnAjouterTacheProjet = document.getElementById('btn-ajouter-tache-projet');
if (btnAjouterTacheProjet) {
    btnAjouterTacheProjet.addEventListener('click', () => {
        alert("Fonctionnalité en cours de développement.");
    });
}

const btnRetour = document.getElementById('btn-retour');
if (btnRetour) {
    btnRetour.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

const btnSupprimerProjet = document.getElementById('btn-supprimer-projet');
if (btnSupprimerProjet) {
    btnSupprimerProjet.addEventListener('click', async () => {
        if (confirm('Supprimer ce projet définitivement ?')) {
            try {
                await fetch(`http://localhost:3000/projets/${projetLocal.id}`, {
                    method: 'DELETE'
                });
                localStorage.removeItem('projetActif');
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Erreur suppression projet:', error);
                alert('Erreur lors de la suppression');
            }
        }
    });
}

chargerProjet();