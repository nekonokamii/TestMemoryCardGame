const form = document.getElementById('registration-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordStrengthElement = document.getElementById('password-strength');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (username.length < 3) {
        alert('Le nom d\'utilisateur doit contenir au moins 3 caractères.');
        return;
    }

    if (!validateEmail(email)) {
        alert('L\'email est invalide.');
        return;
    }

    if (password.length < 6 ||!hasSymbol(password) ||!hasNumber(password) ||!hasLetter(password)) {
        alert('Le mot de passe doit contenir au moins 6 caractères, un symbole, un chiffre et des lettres.');
        return;
    }

    if (password!== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    const passwordStrength = getPasswordStrength(password);
    passwordStrengthElement.textContent = `Force du mot de passe : ${passwordStrength}`;

    // Vérifier si l'email ou le nom d'utilisateur est déjà utilisé
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user) => user.email === email || user.username === username);
    if (existingUser) {
        alert('L\'email ou le nom d\'utilisateur est déjà utilisé.');
        return;
    }

    // Enregistrer l'utilisateur dans le localStorage
    const user = { username, email, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Redirection vers la page de connexion
    window.location.href = '/login.html';
});

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function hasSymbol(password) {
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return symbolRegex.test(password);
}

function hasNumber(password) {
    const numberRegex = /\d/;
    return numberRegex.test(password);
}

function hasLetter(password) {
    const letterRegex = /[a-zA-Z]/;
    return letterRegex.test(password);
}

function getPasswordStrength(password) {
    if (password.length < 6) {
        return 'Faible';
    }
}