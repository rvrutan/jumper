var char = document.getElementById("char");
var object = document.getElementById("object");
var score = document.getElementById("score");
var sound = document.getElementById("sound");
var collisionSound = document.getElementById("collisionSound");
var playAgain = document.getElementById("playagain");
var gameover = document.getElementById("gameoverModal");
var modalTitle = document.getElementById("title-modal");
var modalBody = document.getElementById("modal-body");
var playButton = document.getElementById("play");
var highScores = document.getElementById("highscores");
var scoresBody = document.getElementById("scores-body");
var playerName;

function navPlay() {
    playButton.addEventListener("click", () => {
        location.reload();
    });
}

function jump() {
    char.classList.add("animateJump");
    char.addEventListener('animationend', () => {
        char.classList.remove('animateJump');
    });
}

window.onload = function start() {
    object.classList.add("animateSlide");
    navPlay();
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
        sound.play();
        score.innerText = Number(score.innerText) + 50;
    }
});


// Collision check
var checkCollision = setInterval(function () {
    var charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
    var objectLeft = parseInt(window.getComputedStyle(object).getPropertyValue("left"));

    if (objectLeft < 30 && objectLeft > 0 && charTop > 216) {
        object.style.animation = "none";
        object.classList.add('collided');
        char.classList.add('collided');
        collisionSound.play();
        gameOverModal();
    }
}, 10);

// Game over modal activated, final score saved and displayed
function gameOverModal() {
    let finalScore = parseInt(score.innerText);

    let storedScores = localStorage.getItem('scores');
    let scores = storedScores ? JSON.parse(storedScores) : [];

    // Add the current final score to the array of scores
    scores.push(finalScore);

    // Sort the scores (highest to lowest)
    scores.sort((a, b) => b - a);

    // Save the updated high scores back to localStorage
    localStorage.setItem('scores', JSON.stringify(scores));

    // Display the final score and the top high scores
    modalTitle.textContent = `Game Over ${playerName}! Your final score is:`;

    modalBody.innerHTML = `Your Score: ${finalScore}<br>High Scores:<br>`;
    scores.slice(0, 5).forEach((score, index) => {
        modalBody.innerHTML += `${index + 1}. ${score}<br>`;
    });

    // Show the game over modal
    var gameModal = new bootstrap.Modal(gameover);
    gameModal.show();

    // Add the event listener for play again
    playAgain.addEventListener("click", () => {
        location.reload();
    });
}
// high scores button
function showHighScores() {
    let storedScores = localStorage.getItem('scores');
    let scores = storedScores ? JSON.parse(storedScores) : [];

    scoresBody.innerHTML = `Your<br>High Scores:<br>`;
    scores.slice(0, 5).forEach((score, index) => {
        scoresBody.innerHTML += `${index + 1}. ${score}<br>`;
    });
    var scoresTable = new bootstrap.Modal(highScores);
    scoresTable.show();

}

// Mode switch for light/dark theme
const toggleMode = () => {
    const htmlNode = document.querySelector('html');
    const darkMode = document.querySelector('#darkMode');
    const lightMode = document.querySelector('#lightMode');

    darkMode.addEventListener('change', () => {
        if (darkMode.checked) {
            htmlNode.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    lightMode.addEventListener('change', () => {
        if (lightMode.checked) {
            htmlNode.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
};

const applyStoredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const htmlNode = document.querySelector('html');
    const darkMode = document.querySelector('#darkMode');
    const lightMode = document.querySelector('#lightMode');

    if (savedTheme === 'dark') {
        htmlNode.setAttribute('data-bs-theme', 'dark');
        darkMode.checked = true;
    } else if (savedTheme === 'light') {
        htmlNode.setAttribute('data-bs-theme', 'light');
        lightMode.checked = true;
    }
};

// Apply theme on window load
window.onload = function () {
    applyStoredTheme();
    toggleMode();
    object.classList.add("animateSlide");
    navPlay();
};

// Get player name and store it in localStorage
function getPlayerName() {
    playerName = localStorage.getItem('currentPlayer');
    if (!playerName) {
        playerName = prompt("Enter your name:");
        if (!playerName) playerName = "Anonymous";
        localStorage.setItem('currentPlayer', playerName);
    }
}
getPlayerName();


document.getElementById('scoreboard').addEventListener('click', showHighScores);