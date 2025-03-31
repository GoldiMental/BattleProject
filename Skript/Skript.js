let mapX = 0;
let mapY = 0;
const moveSpeed = 50;
const moveInterval = 300;

const pressedKeys = {};

function moveMap() {
    const bg = document.querySelector('.map');
    if (pressedKeys['w']) {
        mapY += moveSpeed;
    }
    if (pressedKeys['s']) {
        mapY -= moveSpeed;
    }
    if (pressedKeys['a']) {
        mapX += moveSpeed;
    }
    if (pressedKeys['d']) {
        mapX -= moveSpeed;
    }
    bg.style.left = mapX + 'px';
    bg.style.top = mapY + 'px';
}

document.addEventListener('keydown', (event) => {
    pressedKeys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    pressedKeys[event.key] = false;
});

setInterval(moveMap, moveInterval);