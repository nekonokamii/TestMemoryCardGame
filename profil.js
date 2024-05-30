// Récupérer les informations de l'utilisateur depuis le localStorage
const users = JSON.parse(localStorage.getItem('users') || '[]');
const user = users[users.length - 1];

// Afficher les informations de l'utilisateur sur la page
document.getElementById('username').textContent = user.username;
document.getElementById('email').textContent = user.email;

// Récupérer les mémoires favorites de l'utilisateur depuis le localStorage
const memories = JSON.parse(localStorage.getItem('memories') || '[]');
const userMemories = memories.filter((memory) => memory.userId === user.id);

// Afficher les mémoires favorites sur la page
const memoryList = document.getElementById('memory-list');
userMemories.forEach((memory) => {
    const memoryItem = document.createElement('li');
    memoryItem.textContent = memory.title;
    memoryList.appendChild(memoryItem);
});