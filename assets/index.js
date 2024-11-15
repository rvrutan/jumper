var char = document.getElementById("char");
var object = document.getElementById("object");
var score = document.getElementById("score");
var sound = document.getElementById("sound");

function jump() {
    char.classList.add("animateJump");
    char.addEventListener('animationend', () => {
        char.classList.remove('animateJump');
    });
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

//gameover modal activated, score displayed
function gameOverModal(){
    var gameover = document.getElementById("gameoverModal");
    var modalTitle = document.getElementById("title-modal");
    
    modalTitle.textContent = score.innerText;
    
    var gameModal = new bootstrap.Modal(gameover);

    gameModal.show();
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
        //store the data in local storage
    });
};

toggleMode();

//score board

// Select the button and scoreboard elements
// const button = document.getElementById('showScoreboardButton');
// const scoreboard = document.getElementById('scoreboard');

// // Add event listener to the button
// button.addEventListener('click', () => {
//     // Toggle the 'hidden' class on the scoreboard
//     scoreboard.classList.toggle('hidden');
// });
