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
    Player.actualMap = activeMap;
    setCookie("PlayerData", JSON.stringify(Player), 30);
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
    if (activeMap == "ShopHaus") {
        for (let i = 0; i < maps[activeMap].shopHandel.length; i++) {
            const area = maps[activeMap].shopHandel[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("ShopHandel_B")[0].style.visibility = "visible";
            } else {
                document.getElementsByClassName("ShopHandel_B")[0].style.visibility = "hidden";
            }
        }
        for (let i = 0; i < maps[activeMap].shopHome.length; i++) {
            const area = maps[activeMap].shopHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("ShopHausOut_B")[0].style.visibility = "visible";
            } else {
                document.getElementsByClassName("ShopHausOut_B")[0].style.visibility = "hidden";
            }
        }
    }
    if (activeMap == "MeinHaus") {
        for (let i = 0; i < maps[activeMap].tulpaPc.length; i++) {
            const area = maps[activeMap].tulpaPc[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("Tulpa-PC")[0].style.visibility = "visible";
            } else {
                document.getElementsByClassName("Tulpa-PC")[0].style.visibility = "hidden";
            }
        }
        for (let i = 0; i < maps[activeMap].selfHome.length; i++) {
            const area = maps[activeMap].selfHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("MeinHausOut_B")[0].style.visibility = "visible";
            } else {
                document.getElementsByClassName("MeinHausOut_B")[0].style.visibility = "hidden";
            }
        }
    }
    if (activeMap == "TroysHaus") {
        for (let i = 0; i < maps[activeMap].profHome.length; i++) {
            const area = maps[activeMap].profHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("TroysHausOut_B")[0].style.visibility = "visible";
            }
            else {
                document.getElementsByClassName("TroysHausOut_B")[0].style.visibility = "hidden";
            }
        }
    }
    if (activeMap == "MAP") {
        for (let i = 0; i < maps[activeMap].shopHome.length; i++) {
            const area = maps[activeMap].shopHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("ShopHaus_B")[0].style.visibility = "visible";
            } else {
                document.getElementsByClassName("ShopHaus_B")[0].style.visibility = "hidden";
            }
        }
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
                trainername = area.name;
                var Fight = true;
                for (i = 0; i <= Player.defeatedTrainer.length; i++) {
                    if(Player.defeatedTrainer[i] == area.name){
                        Fight = false;
                    }
                }
                if (Fight){
                    if(area.name == "Trainer000"){
                        if (Player.Tulpas.Slot_1.name == ""){
                            clearInterval(moveIntervalID);
                            Trainer000monolog(TrainerList[trainername]);
                        }
                    } else {
                        clearInterval(moveIntervalID);
                        traineranimation(TrainerList[trainername], trainername);
                    }
                }
            }
        }

        for (let i = 0; i < maps[activeMap].battleArea.length; i++) {
            const area = maps[activeMap].battleArea[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                let zufall = Math.round(Math.random() * 100);
                if (zufall <= 10) {
                    clearInterval(moveIntervalID);
                    battleanimation(0);
                }
            }
        }
    }
    mapX = newMapX;
    mapY = newMapY;
    //console.log(mapX, mapY); //Log für Koordinaten
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
    await Delay(500);
    document.getElementById("karte").disabled = true;
    document.getElementById("tuerSelfIn").disabled = true;
    document.getElementById("tuerSelfIn").style.opacity = "0";
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
    document.getElementById("tuerSelfOut").disabled = false;
    document.getElementById("tuerSelfOut").style.opacity = "1";
    // Spieler wieder einblenden
    await Delay(500);
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
    document.getElementById("tuerTroyOut").disabled = false;
    document.getElementById("tuerTroyOut").style.opacity = "1";
    document.getElementById("Professor").style.opacity = "1";
    await Delay(500);
    movementGame.style.visibility = "visible";
    movementGame.style.opacity = "1";
    console.log("Eintritt in Troys Haus erfolgreich!");
}

async function meinAusgang() {
    // Spieler "verschwinden" lassen (Animation)
    const movementGame = document.getElementById("movement_game");
    movementGame.style.visibility = "hidden";
    movementGame.style.transition = "opacity 0.5s";
    movementGame.style.opacity = "0";

    // Kurze Verzögerung (für Effekt)
    await Delay(500);
    document.getElementById("karte").disabled = false;
    document.getElementById("tuerSelfOut").disabled = true;
    document.getElementById("tuerSelfOut").style.opacity = "0";
    // Map wechseln (zur Hauskarte)
    const mapName = "MAP"; // Ziel-Map
    if (!maps[mapName]) {
        console.error("Map existiert nicht:", mapName);
        return;
    }

    // Position zurücksetzen (Startpunkt der Hauskarte)
    mapX = maps[activeMap].startStadtX;
    mapY = maps[activeMap].startStadtY;
    console.log(mapX, mapY)

    // Aktive Map aktualisieren
    activeMap = mapName;
    changeMap(mapName);

    // Grenzen und Karte aktualisieren
    refreshMap();
    const bg = document.querySelector('.map');
    bg.style.left = mapX + 'px';
    bg.style.top = mapY + 'px';
    bg.className = "map MAP"; // CSS-Klasse für Haus-Hintergrund
    document.getElementById("tuerSelfIn").disabled = false;
    document.getElementById("tuerSelfIn").style.opacity = "0.5";
    // Spieler wieder einblenden
    await Delay(500);
    movementGame.style.visibility = "visible";
    movementGame.style.opacity = "1";
    //console.log("Eintritt in mein Haus erfolgreich!");
}

async function troysAusgang() {
    const movementGame = document.getElementById("movement_game");
    movementGame.style.visibility = "hidden";
    movementGame.style.transition = "opacity 0.5s";
    movementGame.style.opacity = "0";

    await Delay(500);
    document.getElementById("karte").disabled = false;
    const mapName = "MAP";
    if (!maps[mapName]) {
        console.error("Map existiert nicht:", mapName);
        return;
    }

    mapX = maps[activeMap].startStadtX;
    mapY = maps[activeMap].startStadtY;

    activeMap = mapName;
    changeMap(mapName);

    refreshMap();
    const bg = document.querySelector('.map');
    bg.style.left = mapX + 'px';
    bg.style.top = mapY + 'px';
    bg.className = "map MAP";
    document.getElementById("tuerTroyOut").disabled = true;
    document.getElementById("tuerTroyOut").style.opacity = "0";
    document.getElementById("Professor").style.opacity = "0";
    await Delay(500);
    movementGame.style.visibility = "visible";
    movementGame.style.opacity = "1";
    //console.log("Eintritt in Troys Haus erfolgreich!");
}
async function shopEingang() {
    // Spieler "verschwinden" lassen (Animation)
    const movementGame = document.getElementById("movement_game");
    movementGame.style.visibility = "hidden";
    movementGame.style.transition = "opacity 0.5s";
    movementGame.style.opacity = "0";
    // Kurze Verzögerung (für Effekt)
    await Delay(500);
    document.getElementById("karte").disabled = true;
    document.getElementById("tuerShopIn").disabled = true;
    document.getElementById("tuerShopIn").style.opacity = "0";
    document.getElementById("Haendler").style.opacity = "1";
    // Map wechseln (zur Hauskarte)
    const mapName = "ShopHaus"; // Ziel-Map
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
    bg.className = "map ShopHaus"; // CSS-Klasse für Haus-Hintergrund
    document.getElementById("tuerShopOut").disabled = false;
    document.getElementById("tuerShopOut").style.opacity = "1";

    // Spieler wieder einblenden
    await Delay(500);
    movementGame.style.visibility = "visible";
    movementGame.style.opacity = "1";
    //console.log("Eintritt in mein Haus erfolgreich!");
}
async function shopAusgang() {
    // Spieler "verschwinden" lassen (Animation)
    const movementGame = document.getElementById("movement_game");
    movementGame.style.visibility = "hidden";
    movementGame.style.transition = "opacity 0.5s";
    movementGame.style.opacity = "0";

    // Kurze Verzögerung (für Effekt)
    await Delay(500);
    document.getElementById("karte").disabled = false;
    document.getElementById("tuerShopOut").disabled = true;
    document.getElementById("tuerShopOut").style.opacity = "0";
    document.getElementById("Haendler").style.opacity = "0";

    // Map wechseln (zur Hauskarte)
    const mapName = "MAP"; // Ziel-Map
    if (!maps[mapName]) {
        console.error("Map existiert nicht:", mapName);
        return;
    }

    // Position zurücksetzen (Startpunkt der Hauskarte)
    mapX = maps[activeMap].startStadtX;
    mapY = maps[activeMap].startStadtY;
    console.log(mapX, mapY)

    // Aktive Map aktualisieren
    activeMap = mapName;
    changeMap(mapName);

    // Grenzen und Karte aktualisieren
    refreshMap();
    const bg = document.querySelector('.map');
    bg.style.left = mapX + 'px';
    bg.style.top = mapY + 'px';
    bg.className = "map MAP"; // CSS-Klasse für Haus-Hintergrund
    document.getElementById("tuerShopIn").disabled = false;
    document.getElementById("tuerShopIn").style.opacity = "0.5";
    // Spieler wieder einblenden
    await Delay(500);
    movementGame.style.visibility = "visible";
    movementGame.style.opacity = "1";
    //console.log("Eintritt in mein Haus erfolgreich!");
}