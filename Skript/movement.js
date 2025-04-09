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
    if (activeMap == "MAP") {
        for (let i = 0; i < maps[activeMap].profHome.length; i++) {
            const area = maps[activeMap].profHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("TroysHaus_B")[0].style.visibility = "visible";
            } else {
                document.getElementsByClassName("TroysHaus_B")[0].style.visibility = "hidden";
            }
        }
        for (let i = 0; i < maps[activeMap].selfHome.length; i++) {
            const area = maps[activeMap].selfHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("MeinHaus_B")[0].style.visibility = "visible";
            }
            else {
                document.getElementsByClassName("MeinHaus_B")[0].style.visibility = "hidden";
            }
        }
        for (let i = 0; i < maps[activeMap].trainerBattle.length; i++) {
            const area = maps[activeMap].trainerBattle[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                let zufall = Math.round(Math.random() * 100);
                if (zufall <= 100) {
                    //battleanimation(); //Hier muss dann die neue trainerAnimation function eingefügt werden
                    console.log("Trainer Kampf!") //<- Bitte stehen lassen!
                }
            }
        }

        for (let i = 0; i < maps[activeMap].battleArea.length; i++) {
            const area = maps[activeMap].battleArea[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                let zufall = Math.round(Math.random() * 100);
                if (zufall <= 10) {
                    battleanimation();
                    //console.log("Du wirst Angegriffen!")
                }
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
moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);

async function meinEingang() {
    // Spieler "verschwinden" lassen (Animation)
    const movementGame = document.getElementById("movement_game");
    movementGame.style.visibility = "hidden";
    movementGame.style.transition = "opacity 0.5s";
    movementGame.style.opacity = "0";

    // Kurze Verzögerung (für Effekt)
    await new Promise(resolve => setTimeout(resolve, 500));
    document.getElementById("karte").disabled = true;
    document.getElementById("tuerSelf").disabled = true;
    document.getElementById("tuerSelf").style.opacity = "0";
    // Map wechseln (zur Hauskarte)
    const mapName = "MeinHaus"; // Ziel-Map
    if (!maps[mapName]) {
        console.error("Map existiert nicht:", mapName);
        return;
    }

    // Aktive Map aktualisieren
    activeMap = mapName;
    changeMap(mapName);
    
    // Position zurücksetzen (Startpunkt der Hauskarte)
    mapX = maps[mapName].startX;
    mapY = maps[mapName].startY;

    // Grenzen und Karte aktualisieren
    refreshMap();
    const bg = document.querySelector('.map');
    bg.style.left = mapX + 'px';
    bg.style.top = mapY + 'px';
    bg.className = "map MeinHaus"; // CSS-Klasse für Haus-Hintergrund

    // Spieler wieder einblenden
    await new Promise(resolve => setTimeout(resolve, 500));
    movementGame.style.visibility = "visible";
    movementGame.style.opacity = "1";
    //console.log("Eintritt in mein Haus erfolgreich!");
}

async function troysEingang() {
    const movementGame = document.getElementById("movement_game");
    movementGame.style.visibility = "hidden";
    movementGame.style.transition = "opacity 0.5s";
    movementGame.style.opacity = "0";

    await Delay(500);
    document.getElementById("karte").disabled = true;
    const mapName = "TroysHaus"; 
    if (!maps[mapName]) {
        console.error("Map existiert nicht:", mapName);
        return;
    }
  
    activeMap = mapName;
    changeMap(mapName);
      
    mapX = maps[mapName].startX;
    mapY = maps[mapName].startY;
   
    refreshMap();
    const bg = document.querySelector('.map');
    bg.style.left = mapX + 'px';
    bg.style.top = mapY + 'px';
    bg.className = "map TroysHaus"; 
    
    await Delay(500);
    movementGame.style.visibility = "visible";
    movementGame.style.opacity = "1";
    //console.log("Eintritt in Troys Haus erfolgreich!");
}
