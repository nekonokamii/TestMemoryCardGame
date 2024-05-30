const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Vérifier si l'utilisateur existe
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
        alert('L\'email ou le mot de passe est incorrect.');
        return;
    }

    // Redirection vers la page de profil
    window.location.href = 'profil.html';
});