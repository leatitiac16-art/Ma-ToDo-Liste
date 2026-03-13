const projet = JSON.parse(localStorage.getItem('projetActif'));

if (projet) {
    document.getElementById('titre-projet').textContent = projet.nom;
    document.getElementById('desc-projet-page').textContent = projet.description;
    document.getElementById('dates-projet').textContent = projet.dateDebut + ' → ' + projet.dateFin;
    document.getElementById('projet-header').style.borderLeftColor = projet.couleur;
    document.getElementById('cercle-projet').style.background = 'conic-gradient(' + projet.couleur + ' 0%, #eee 0%)';
}

document.getElementById('btn-retour').addEventListener('click', function() {
    window.location.href = 'index.html';
});