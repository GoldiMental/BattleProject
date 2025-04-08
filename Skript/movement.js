const moveSpeed = 50;
const moveInterval = 300;
let activeDirection = null;

const documentMap = document.querySelector('.map');
let activeMap = "MAP";

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
    const bg = documentMap;
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
    
    for (let i = 0; i < maps[activeMap].trainerBattle.length; i++) {
        const area = maps[activeMap].trainerBattle[i];
        if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
           let zufall = Math.round(Math.random()*100);
           if (zufall <= 100 ){
            //battleanimation(); //Hier muss dann die neue trainerAnimation function eingefügt werden
            console.log("Trainer Kampf!") //<- Bitte stehen lassen!
           } 
        }
    }

    for (let i = 0; i < maps[activeMap].battleArea.length; i++) {
        const area = maps[activeMap].battleArea[i];
        if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
           let zufall = Math.round(Math.random()*100);
           if (zufall <= 10 ){
            battleanimation();
            //console.log("Du wirst Angegriffen!")
           } 
        }
    }
    
    mapX = newMapX;
    mapY = newMapY;
    console.log(mapX, mapY)
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
    if (event.key.toLocaleLowerCase() === 'w' || event.key.toLocaleLowerCase() === 's' || event.key.toLocaleLowerCase() === 'd' || event.key.toLocaleLowerCase() === 'a') {
        activeDirection = event.key.toLocaleLowerCase();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key.toLocaleLowerCase() === activeDirection) {
        activeDirection = null;
        stopMovement();
    }
});

let moveIntervalID;
moveIntervalID = setInterval(() => {if (activeDirection) { moveMap() };}, moveInterval);