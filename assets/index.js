var char = document.getElementById("char");
var object = document.getElementById("object");
var score = document.getElementById("score");
var sound = document.getElementById("sound");
var playAgain = document.getElementById("playagain");
var gameover = document.getElementById("gameoverModal");
var modalTitle = document.getElementById("title-modal");
var modalBody = document.getElementById("modal-body")
var playButton = document.getElementById("play");
var playerName;

function navPlay(){
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
    if(event.code === 'Space'){
        jump();
        sound.play();
        score.innerText++;
        localStorage.setItem('scores' , score.innerText); 
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

//gameover modal activated, score displayed
function gameOverModal(){
    playAgain.addEventListener("click", () => {
        location.reload();
    });

    modalTitle.textContent = `Game Over ${playerName}! Your final score is:`;

    modalBody.innerHTML = score.innerText;

    var gameModal = new bootstrap.Modal(gameover);
    gameModal.show();
}

// mode switch

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

window.onload = function() {
    applyStoredTheme();  
    toggleMode();        
    object.classList.add("animateSlide");
    navPlay();
};

// Get player name and store it
function getPlayerName() {
    playerName = localStorage.getItem('currentPlayer');
    if (!playerName) {
        playerName = prompt("Enter your name:");
        if (!playerName) playerName = "Anonymous";
        localStorage.setItem('currentPlayer', playerName);  
}}
getPlayerName();
 