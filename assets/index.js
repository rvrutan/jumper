var char = document.getElementById("char");
var object = document.getElementById("object");

function jump() {
    char.classList.add("animateJump");
    char.addEventListener('animationend', () => {
        char.classList.remove('animateJump');
    });
}

document.addEventListener('keydown', (event) => {
    if(event.code === 'Space'){
        jump();
    }
});