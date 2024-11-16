var char = document.getElementById("char");
var object = document.getElementById("object");
var score = document.getElementById("score");
var sound = document.getElementById("sound");
var playAgain = document.getElementById("playagain");
var gameover = document.getElementById("gameoverModal");
var modalTitle = document.getElementById("title-modal");
var modalBody = document.getElementById("modal-body")
var playerName;

// Get player name and store it
function getPlayerName() {
    playerName = prompt("Enter your name:");
    if (!playerName) playerName = "Anonymous"; 
    localStorage.setItem('currentPlayer', playerName);
}

getPlayerName();

function jump() {
    char.classList.add("animateJump");
    char.addEventListener('animationend', () => {
        char.classList.remove('animateJump');
    });
}

window.onload = function slide() {
    object.classList.add("animateSlide");
}

document.addEventListener('keydown', (event) => {
    score.innerText++;
    if(event.code === 'Space'){
        jump();
        sound.play();
    }
});

// Collision check
var checkCollision = setInterval(function(){
    var charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
    var objectLeft = parseInt(window.getComputedStyle(object).getPropertyValue("left"));
    if(objectLeft < 30 && objectLeft > 0 && charTop > 216){
        object.style.animation = "none";
        gameOverModal();
    }
}, 10)

// Save score to localStorage
function saveScore() {
    const playerScore = {
        name: playerName,
        score: parseInt(score.innerText)
    };

    let scores = JSON.parse(localStorage.getItem('score')) || [];
    scores.push(playerScore);


    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('score', JSON.stringify(scores));
}

//gameover modal activated, score displayed
function gameOverModal(){
    playAgain.addEventListener("click", () => {
        location.reload();
    });
    
    modalTitle.textContent = score.innerText;
    var gameModal = new bootstrap.Modal(gameover);
    gameModal.show();
}
{
    // modalBody.textContent = `Game Over, ${playerName}!`;
    modalBody.innerHTML = `<p>Congratulations, ${playerName}!</p><p>Your final score: ${score.innerText}</p>`;

}


//playAgain function
function gameRestart(){
    score.innerText = 0;
    object.classList.remove("animateSlide");
    void object.offsetWidth;
    object.classList.add("animateSlide");
}

// mode switch

const toggleMode = () => {
    const htmlNode = document.querySelector('html');
    const darkMode = document.querySelector('#darkMode');
    const lightMode = document.querySelector('#lightMode');

    // Add event listeners for both radio buttons
    darkMode.addEventListener('change', () => {
        if (darkMode.checked) {
            htmlNode.setAttribute('data-bs-theme', 'dark');
        }
    });

    lightMode.addEventListener('change', () => {
        if (lightMode.checked) {
            htmlNode.setAttribute('data-bs-theme', 'light');
        }
        
    });
};

toggleMode();

// Show scoreboard
function displayScoreboard() {
    const scoreboard = document.getElementById("game-score");
    const scores = JSON.parse(localStorage.getItem('score')) || [];

    
    scoreboard.innerHTML = `<h3>Scoreboard</h3>`;

    // Display scores
    scores.forEach((entry, index) => {
        const scoreItem = document.createElement("p");
        scoreItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
        scoreboard.appendChild(scoreItem);
    });

    scoreboard.classList.toggle('hidden');
}

const button = document.getElementById('showScoreboardButton');
button.addEventListener('click', displayScoreboard);

