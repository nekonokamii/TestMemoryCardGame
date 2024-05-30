const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let nbVictoires = 0
let nbEssais = 0


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    
nbEssais++
const nbEssaiText = document.getElementById("nbEssais")
nbEssaiText.textContent = "Nombre de cartes retournées : " + nbEssais

    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  secondCard = this;
  
nbEssais++
const nbEssaiText = document.getElementById("nbEssais")
nbEssaiText.textContent = "Nombre de cartes retournées : " + nbEssais

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}


// Combinaison gagnante + victoire
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  var audiowin = new Audio('audioWIN.mp3');
  audiowin.play();
  nbVictoires++
  if (nbVictoires === 6) {
    var audioTotalWin = new Audio('totalWIN.mp3');
    audioTotalWin.volume = 0.2;
    audioTotalWin.play();
    // Utiliser la fonction addScore()
    addScore(nbEssais);
  }
  else
  resetBoard();
}

// Combinaison perdante + lose
function unflipCards() {
  lockBoard = true;

  var audioLOSE = new Audio('audioLOSE.mp3');
  audioLOSE.play();

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function resetGame() {
  // Réinitialise les variables du jeu
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  nbVictoires = 0;
  nbEssais = 0;

  // Réinitialise le texte du nombre d'essais
  const nbEssaiText = document.getElementById("nbEssais");
  nbEssaiText.textContent = "Nombre de cartes retournées : 0";

  // Réinitialise les cartes
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  // Réinitialise le tableau
  resetBoard();
}

window.addEventListener('keydown', function(event) {
  if (event.key === ' ') {
    // Appui sur la barre d'espace
    resetGame();
    shuffle();
  }
  function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  }
});



particlesJS("particles-container", {
  "particles": {
    "number": {
      "value": 400,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#fff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 10,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 500,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 1.5782952832645452,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 0.5
        }
      },
      "bubble": {
        "distance": 400,
        "size": 4,
        "duration": 0.3,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
})