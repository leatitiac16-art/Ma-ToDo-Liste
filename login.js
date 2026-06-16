document.getElementById('btn-login').addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageErreur = document.getElementById('message-erreur');

    // Vérifie que les champs ne sont pas vides
    if (email === '' || password === '') {
        messageErreur.textContent = 'Veuillez remplir tous les champs';
        messageErreur.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            // Le serveur a renvoyé une erreur
            messageErreur.textContent = data.erreur;
            messageErreur.style.display = 'block';
            return;
        }

        // Connexion réussie — on sauvegarde l'utilisateur
        localStorage.setItem('utilisateur', JSON.stringify({
            id: data.userId,
            email: data.email
        }));

        // Redirection vers l'app
        window.location.href = 'index.html';

    } catch (error) {
        messageErreur.textContent = 'Erreur de connexion au serveur';
        messageErreur.style.display = 'block';
    }
});