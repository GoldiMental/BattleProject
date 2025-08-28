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
    console.log("Führe changeMap(",mapname,") aus...");
    activeMap = maps[mapname].name;
    Player.actualMap = activeMap;
}

function refreshMap() {
    console.log("Aktualiere die MAP...");
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
                document.getElementsByClassName("ShopHandel_B")[0].classList.toggle("hidethis",false);
            } else {
                document.getElementsByClassName("ShopHandel_B")[0].classList.toggle("hidethis",true);
            }
        }
        for (let i = 0; i < maps[activeMap].shopHome.length; i++) {
            const area = maps[activeMap].shopHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("ShopHausOut_B")[0].classList.toggle("hidethis",false);
            } else {
                document.getElementsByClassName("ShopHausOut_B")[0].classList.toggle("hidethis",true);
            }
        }
    }
    if (activeMap == "MeinHaus") {
        for (let i = 0; i < maps[activeMap].tulpaPc.length; i++) {
            const area = maps[activeMap].tulpaPc[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("Tulpa-PC")[0].classList.toggle("hidethis",false);
            } else {
                document.getElementsByClassName("Tulpa-PC")[0].classList.toggle("hidethis",true);
            }
        }
        for (let i = 0; i < maps[activeMap].selfHome.length; i++) {
            const area = maps[activeMap].selfHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("MeinHausOut_B")[0].classList.toggle("hidethis",false);
            } else {
                document.getElementsByClassName("MeinHausOut_B")[0].classList.toggle("hidethis",true);
            }
        }
    }
    if (activeMap == "TroysHaus") {
        for (let i = 0; i < maps[activeMap].profHome.length; i++) {
            const area = maps[activeMap].profHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("TroysHausOut_B")[0].classList.toggle("hidethis",false);
            }
            else {
                document.getElementsByClassName("TroysHausOut_B")[0].classList.toggle("hidethis",true);
            }
        }
    }
    if (activeMap == "MAP") {
        for (let i = 0; i < maps[activeMap].shopHome.length; i++) {
            const area = maps[activeMap].shopHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("ShopHaus_B")[0].classList.toggle("hidethis",false);
            } else {
                document.getElementsByClassName("ShopHaus_B")[0].classList.toggle("hidethis",true);
            }
        }
        for (let i = 0; i < maps[activeMap].profHome.length; i++) {
            const area = maps[activeMap].profHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("TroysHaus_B")[0].classList.toggle("hidethis",false);
            } else {
                document.getElementsByClassName("TroysHaus_B")[0].classList.toggle("hidethis",true);
            }
        }
        for (let i = 0; i < maps[activeMap].selfHome.length; i++) {
            const area = maps[activeMap].selfHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("MeinHaus_B")[0].classList.toggle("hidethis",false);
            }
            else {
                document.getElementsByClassName("MeinHaus_B")[0].classList.toggle("hidethis",true);
            }
        }
        for (let i = 0; i < maps[activeMap].trainerBattle.length; i++) {
            const area = maps[activeMap].trainerBattle[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                trainername = area.name;
                var Fight = true;
                for (i = 0; i <= Player.defeatedTrainer.length; i++) {
                    if (Player.defeatedTrainer[i] == area.name) {
                        Fight = false;
                    }
                }
                if (Fight) {
                    if (area.name == "Trainer000") {
                        if (Player.Tulpas.Slot_1.name == "") {
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
    console.log("Bewegung gestoppt.");
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
    document.getElementById('door-sound').play();
    const movementGame = document.getElementById("movement_game");
    movementGame.classList.toggle("hidethis",true);
    movementGame.style.transition = "opacity 0.5s";
    movementGame.style.opacity = "0";

    await Delay(500);
    document.getElementById("karte").disabled = true;
    document.getElementById("tuerSelfIn").disabled = true;
    document.getElementById("tuerSelfIn").style.opacity = "0";
    const mapName = "MeinHaus";
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
    bg.className = "map MeinHaus";
    document.getElementById("tuerSelfOut").disabled = false;
    document.getElementById("tuerSelfOut").style.opacity = "1";
    await Delay(500);
    movementGame.classList.toggle("hidethis",false);
    movementGame.style.opacity = "1";
}

async function troysEingang() {
    document.getElementById('door-sound').play();
    const movementGame = document.getElementById("movement_game");
    movementGame.classList.toggle("hidethis",true);
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
    movementGame.classList.toggle("hidethis",false);
    movementGame.style.opacity = "1";
    console.log("Eintritt in Troys Haus erfolgreich!");
}

async function meinAusgang() {
    document.getElementById('door-sound').play();
    const movementGame = document.getElementById("movement_game");
    movementGame.classList.toggle("hidethis",true);
    movementGame.style.transition = "opacity 0.5s";
    movementGame.style.opacity = "0";

    await Delay(500);
    document.getElementById("karte").disabled = false;
    document.getElementById("tuerSelfOut").disabled = true;
    document.getElementById("tuerSelfOut").style.opacity = "0";
    const mapName = "MAP";
    if (!maps[mapName]) {
        console.error("Map existiert nicht:", mapName);
        return;
    }
    mapX = maps[activeMap].startStadtX;
    mapY = maps[activeMap].startStadtY;
    //console.log(mapX, mapY) //Log-Koordinaten beim Übergang

    activeMap = mapName;
    changeMap(mapName);
    refreshMap();
    const bg = document.querySelector('.map');
    bg.style.left = mapX + 'px';
    bg.style.top = mapY + 'px';
    bg.className = "map MAP";
    document.getElementById("tuerSelfIn").disabled = false;
    document.getElementById("tuerSelfIn").style.opacity = "0.5";
    await Delay(500);
    movementGame.classList.toggle("hidethis",false);
    movementGame.style.opacity = "1";
}

async function troysAusgang() {
    document.getElementById('door-sound').play();
    const movementGame = document.getElementById("movement_game");
    movementGame.classList.toggle("hidethis",true);
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
    movementGame.classList.toggle("hidethis",false);
    movementGame.style.opacity = "1";
}
async function shopEingang() {
    document.getElementById('door-sound').play();
    const movementGame = document.getElementById("movement_game");
    movementGame.classList.toggle("hidethis",true);
    movementGame.style.transition = "opacity 0.5s";
    movementGame.style.opacity = "0";
    await Delay(500);
    document.getElementById("karte").disabled = true;
    document.getElementById("tuerShopIn").disabled = true;
    document.getElementById("tuerShopIn").style.opacity = "0";
    document.getElementById("Haendler").style.opacity = "1";
    const mapName = "ShopHaus";
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
    bg.className = "map ShopHaus";
    document.getElementById("tuerShopOut").disabled = false;
    document.getElementById("tuerShopOut").style.opacity = "1";

    await Delay(500);
    movementGame.classList.toggle("hidethis",false);
    movementGame.style.opacity = "1";
}
async function shopAusgang() {
    document.getElementById('door-sound').play();
    const movementGame = document.getElementById("movement_game");
    movementGame.classList.toggle("hidethis",true);
    movementGame.style.transition = "opacity 0.5s";
    movementGame.style.opacity = "0";

    await Delay(500);
    document.getElementById("karte").disabled = false;
    document.getElementById("tuerShopOut").disabled = true;
    document.getElementById("tuerShopOut").style.opacity = "0";
    document.getElementById("Haendler").style.opacity = "0";
    const mapName = "MAP";
    if (!maps[mapName]) {
        console.error("Map existiert nicht:", mapName);
        return;
    }
    mapX = maps[activeMap].startStadtX;
    mapY = maps[activeMap].startStadtY;
    //console.log(mapX, mapY) //Log-Koordinaten beim Übergang

    activeMap = mapName;
    changeMap(mapName);
    refreshMap();
    const bg = document.querySelector('.map');
    bg.style.left = mapX + 'px';
    bg.style.top = mapY + 'px';
    bg.className = "map MAP";
    document.getElementById("tuerShopIn").disabled = false;
    document.getElementById("tuerShopIn").style.opacity = "0.5";
    await Delay(500);
    movementGame.classList.toggle("hidethis",false);
    movementGame.style.opacity = "1";
}

function zonenName() {
    console.log()
}

function Click_W_down() {
    simulateKeyDown("w");
}
function Click_W_up() {
    simulateKeyUp("w");
}

function Click_A_down() {
    simulateKeyDown("a");
}
function Click_A_up() {
    simulateKeyUp("a");
}

function Click_S_down() {
    simulateKeyDown("s");
}
function Click_S_up() {
    simulateKeyUp("s");
}

function Click_D_down() {
    simulateKeyDown("d");
}
function Click_D_up() {
    simulateKeyUp("d");
}

function simulateKeyDown(key) {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: key }));
}
function simulateKeyUp(key) {
    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
}