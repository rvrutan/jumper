// var char = document.getElementById("char");
// var object = document.getElementById("object");
// var score = document.getElementById("score");
// var playerName;

// function getPlayerName() {
//     playerName = prompt("Enter your name:");
//     if (!playerName) playerName = "Anonymous"; // Default name if none entered
//     localStorage.setItem('currentPlayer', playerName);
// }

// getPlayerName();

// function jump() {
//     char.classList.add("animateJump");
//     char.addEventListener('animationend', () => {
//         char.classList.remove('animateJump');
//     });
// }

// document.addEventListener('keydown', (event) => {
//     score.innerText++;
//     if(event.code === 'Space'){
//         jump();
//     }

// });

// // Collision check
// var checkCollision = setInterval(function(){
//     var charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
//     var objectLeft = parseInt(window.getComputedStyle(object).getPropertyValue("left"));
//     if(objectLeft < 30 && objectLeft > 0 && charTop > 216){
//         object.style.animation = "none";
//         gameOverModal();
//     }
// }, 10)

// // Save score to localStorage
// function saveScore() {
//     const playerScore = {
//         name: playerName,
//         score: parseInt(score.innerText)
//     };

//     // Get existing scores from localStorage
//     let scores = JSON.parse(localStorage.getItem('scores')) || [];
//     scores.push(playerScore);

//     // Sort scores in descending order and save back to localStorage
//     scores.sort((a, b) => b.score - a.score);
//     localStorage.setItem('scores', JSON.stringify(scores));
// }

// //gameover modal activated, score displayed
// function gameOverModal(){
//     var gameover = document.getElementById("gameoverModal");
//     var modalTitle = document.getElementById("title-modal");
    
//     modalTitle.textContent = score.innerText;
    
//     var gameModal = new bootstrap.Modal(gameover);

//     gameModal.show();
// }


// // mode switch

// const toggleMode = () => {
//     const htmlNode = document.querySelector('html');
//     const darkMode = document.querySelector('#darkMode');
//     const lightMode = document.querySelector('#lightMode');

//     // Add event listeners for both radio buttons
//     darkMode.addEventListener('change', () => {
//         if (darkMode.checked) {
//             htmlNode.setAttribute('data-bs-theme', 'dark');
//         }
//     });

//     lightMode.addEventListener('change', () => {
//         if (lightMode.checked) {
//             htmlNode.setAttribute('data-bs-theme', 'light');
//         }
//         //store the data in local storage
//     });
// };

// toggleMode();

// // Show scoreboard
// function displayScoreboard() {
//     const scoreboard = document.getElementById("scoreboard");
//     const scores = JSON.parse(localStorage.getItem('scores')) || [];

//     // Clear existing content
//     scoreboard.innerHTML = `<h3>Scoreboard</h3>`;

//     // Display scores
//     scores.forEach((entry, index) => {
//         const scoreItem = document.createElement("p");
//         scoreItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
//         scoreboard.appendChild(scoreItem);
//     });

//     scoreboard.classList.toggle('hidden');
// }

// // Event listener for "Show Scoreboard" button
// const button = document.getElementById('showScoreboardButton');
// button.addEventListener('click', displayScoreboard);

// Variables
var char = document.getElementById("char");
var object = document.getElementById("object");
var score = document.getElementById("score");
var playerName;

// Get player name and store it
function getPlayerName() {
    playerName = prompt("Enter your name:");
    if (!playerName) playerName = "Anonymous"; // Default name if none entered
    localStorage.setItem('currentPlayer', playerName);
}
getPlayerName();

// Jump mechanic
function jump() {
    char.classList.add("animateJump");
    char.addEventListener('animationend', () => {
        char.classList.remove('animateJump');
    });
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
        score.innerText++;
    }
});

// Collision check
var checkCollision = setInterval(function () {
    var charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
    var objectLeft = parseInt(window.getComputedStyle(object).getPropertyValue("left"));
    if (objectLeft < 30 && objectLeft > 0 && charTop > 216) {
        object.style.animation = "none";
        saveScore();
        gameOverModal();
    }
}, 10);

// Save score to localStorage
function saveScore() {
    const playerScore = {
        name: playerName,
        score: parseInt(score.innerText)
    };

    // Get existing scores from localStorage
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(playerScore);

    // Sort scores in descending order and save back to localStorage
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Display game over modal
function gameOverModal() {
    var gameover = document.getElementById("gameoverModal");
    var modalTitle = document.getElementById("title-modal");
    var modalBody = document.getElementById("modal-body");

    // Display the player's name and score in the modal
    modalTitle.textContent = `Game Over, ${playerName}!`;
    modalBody.innerHTML = `<p>Congratulations, ${playerName}!</p><p>Your final score: ${score.innerText}</p>`;

    var gameModal = new bootstrap.Modal(gameover);
    gameModal.show();
}

// Dark/Light Mode Toggle
const toggleMode = () => {
    const htmlNode = document.querySelector('html');
    const darkMode = document.querySelector('#darkMode');
    const lightMode = document.querySelector('#lightMode');

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
    const scoreboard = document.getElementById("scoreboard");
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Clear existing content
    scoreboard.innerHTML = `<h3>Scoreboard</h3>`;

    // Display scores
    scores.forEach((entry, index) => {
        const scoreItem = document.createElement("p");
        scoreItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
        scoreboard.appendChild(scoreItem);
    });

    scoreboard.classList.toggle('hidden');
}

// Event listener for "Show Scoreboard" button
const button = document.getElementById('showScoreboardButton');
button.addEventListener('click', displayScoreboard);