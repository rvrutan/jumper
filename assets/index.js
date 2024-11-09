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




//mode switch

// const toggleMode = () => {
//     const htmlNode = document.querySelector('html').getAttributeNode("data-bs-theme");
//     const modeSwitch = document.querySelectorAll('#modeSwitchContainer > input');
//     for (let i = 0; i < modeSwitch.length; i++) {
//         modeSwitch[i].addEventListener('click' , () => {
//             modeSwitch[i].checked ? htmlNode.value = 'light' : htmlNode.value = 'dark'

//         });
//     }
// }

// toggleMode();