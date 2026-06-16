document.getElementById('btn-register').addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageErreur = document.getElementById('message-erreur');
    const messageSucces = document.getElementById('message-succes');

    // Cache les messages précédents
    messageErreur.style.display = 'none';
    messageSucces.style.display = 'none';

    // Vérifie que les champs ne sont pas vides
    if (email === '' || password === '') {
        messageErreur.textContent = 'Veuillez remplir tous les champs';
        messageErreur.style.display = 'block';
        return;
    }

    // Vérifie la longueur du mot de passe
    if (password.length < 6) {
        messageErreur.textContent = 'Le mot de passe doit faire au moins 6 caractères';
        messageErreur.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            messageErreur.textContent = data.erreur;
            messageErreur.style.display = 'block';
            return;
        }

        // Inscription réussie
        messageSucces.textContent = 'Compte créé ! Redirection...';
        messageSucces.style.display = 'block';

        // Redirige vers login après 2 secondes
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

    } catch (error) {
        messageErreur.textContent = 'Erreur de connexion au serveur';
        messageErreur.style.display = 'block';
    }
});