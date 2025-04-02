const moveSpeed = 50;
const moveInterval = 300;
let activeDirection = null;

const documentMap = document.querySelector('.map');
let activeMap = "Map_Anfang";

let mapX = maps[activeMap].startX;
let mapY = maps[activeMap].startY;

let minX = -(parseInt(maps[activeMap].Width) - 250);
let maxX = 250;
let minY = -(parseInt(maps[activeMap].Height) - 250);
let maxY = 250;

function changeMap(mapname) {
    activeMap = maps[mapname].name;
}

function refreshMap() {
    minX = -(parseInt(maps[activeMap].Width) - 250);
    maxX = 250;
    minY = -(parseInt(maps[activeMap].Height) - 250);
    maxY = 250;
}

function moveMap() {
    const bg = document.querySelector('.map');
    const player = document.getElementById('user');
    let direction = "";

    let newMapX = mapX;
    let newMapY = mapY;

    if (activeDirection === "w" && mapY + moveSpeed <= maxY) {
        direction = "up";
        newMapY = mapY + moveSpeed;
    }
    else if (activeDirection === 's' && mapY - moveSpeed >= minY) {
        direction = "down";
        newMapY = mapY - moveSpeed;
    }
    if (activeDirection === 'a' && mapX + moveSpeed <= maxX) {
        direction = "left";
        newMapX = mapX + moveSpeed;
    }
    if (activeDirection === 'd' && mapX - moveSpeed >= minX) {
        direction = "right";
        newMapX = mapX - moveSpeed;
    }

    for (let i = 0; i < maps[activeMap].blockedArea.length; i++) {
        const area = maps[activeMap].blockedArea[i];
        if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
            return;
        }
    }

    mapX = newMapX;
    mapY = newMapY;

    if (direction) {
        player.className = 'Player m_' + direction;
    }
    bg.style.left = mapX + 'px';
    bg.style.top = mapY + 'px';
}

function stopMovement() {
    const player = document.getElementById('user');
    if (player.className.startsWith('Player m_')) {
        let lastDir = player.className.split('_')[1];
        player.className = 'Player ' + lastDir;
    } else { player.className = 'Player down'; }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 's' || event.key === 'd' || event.key === 'a') {
        activeDirection = event.key;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === activeDirection) {
        activeDirection = null;
        stopMovement();
    }
});

setInterval(() => {
    if (activeDirection) { moveMap() };
}, moveInterval);