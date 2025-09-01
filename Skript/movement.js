const moveSpeed = 50;
const moveInterval = 300;
let lastArea = "";
let activeDirection = null;
const movementGame = document.getElementById("movement_game");
const documentMap = document.querySelector('.map');
let activeMap = "MAP";

let minX = -(parseInt(maps[activeMap].Width) - 250);
let maxX = 250;
let minY = -(parseInt(maps[activeMap].Height) - 250);
let maxY = 250;

async function changeMap(mapname) {
    movementGame.classList.toggle("hidethis", true);
    console.log("Führe changeMap(", mapname, ") aus...");
    switch (mapname) {
        case "MAP":
            document.getElementById("karte").disabled = false;
            document.getElementById("tuerSelfOut").classList.toggle("hidethis", true);
            document.getElementById("tuerSelfIn").classList.toggle("hidethis", false);
            document.getElementById("tuerTroyOut").classList.toggle("hidethis", true);
            document.getElementById("Professor").classList.toggle("hidethis", true);
            document.getElementById("tuerShopIn").classList.toggle("hidethis", false);
            document.getElementById("Haendler").classList.toggle("hidethis", true);
            document.getElementById("tuerShopOut").classList.toggle("hidethis", true);
            break;
        case "MeinHaus":
            document.getElementById("karte").disabled = true;
            document.getElementById("tuerSelfIn").classList.toggle("hidethis", true);
            document.getElementById("tuerSelfOut").classList.toggle("hidethis", false);
            break;
        case "TroysHaus":
            document.getElementById("karte").disabled = true;
            document.getElementById("tuerTroyOut").classList.toggle("hidethis", false);
            document.getElementById("Professor").classList.toggle("hidethis", false);
            break;
        case "ShopHaus":
            document.getElementById("karte").disabled = true;
            document.getElementById("tuerShopIn").classList.toggle("hidethis", true);
            document.getElementById("Haendler").classList.toggle("hidethis", false);
            document.getElementById("tuerShopOut").classList.toggle("hidethis", false);
            break;
    }
    activeMap = maps[mapname].name;
    documentMap.className = "map " + activeMap;
    Player.actualMap = activeMap;
    refreshMap();
    await Delay(500);
    movementGame.classList.toggle("hidethis", false);
}

function refreshMap() {
    console.log("Aktualiere die MAP...");
    minX = -(parseInt(maps[activeMap].Width) - 250);
    maxX = 250;
    minY = -(parseInt(maps[activeMap].Height) - 250);
    maxY = 250;
    moveMap();
}

async function meinEingang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.MeinHaus.startX;
    Player.MapY = maps.MeinHaus.startY;
    changeMap('MeinHaus');
}
async function meinAusgang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.MeinHaus.startStadtX;
    Player.MapY = maps.MeinHaus.startStadtY;
    changeMap('MAP');
}
async function troysEingang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.TroysHaus.startX;
    Player.MapY = maps.TroysHaus.startY;
    changeMap('TroysHaus');
}
async function troysAusgang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.TroysHaus.startStadtX;
    Player.MapY = maps.TroysHaus.startStadtY;
    changeMap('MAP');
}
async function shopEingang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.ShopHaus.startX;
    Player.MapY = maps.ShopHaus.startY;
    changeMap('ShopHaus');
}
async function shopAusgang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.ShopHaus.startStadtX;
    Player.MapY = maps.ShopHaus.startStadtY;
    changeMap('MAP');
}

function moveMap() {
    const bg = documentMap;
    const player = document.getElementById('user');
    let direction = "";

    let newMapX = Player.MapX;
    let newMapY = Player.MapY;


    if (activeDirection === "w" && mapY + moveSpeed <= maxY) {
        direction = "up"; newMapY = mapY + moveSpeed;
    }
    else if (activeDirection === 's' && mapY - moveSpeed >= minY) {
        direction = "down"; newMapY = mapY - moveSpeed;
    }
    if (activeDirection === 'a' && mapX + moveSpeed <= maxX) {
        direction = "left"; newMapX = mapX + moveSpeed;
    }
    if (activeDirection === 'd' && mapX - moveSpeed >= minX) {
        direction = "right"; newMapX = mapX - moveSpeed;
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
                document.getElementsByClassName("ShopHandel_B")[0].classList.toggle("hidethis", false);
            } else {
                document.getElementsByClassName("ShopHandel_B")[0].classList.toggle("hidethis", true);
            }
        }
        for (let i = 0; i < maps[activeMap].shopHome.length; i++) {
            const area = maps[activeMap].shopHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("ShopHausOut_B")[0].classList.toggle("hidethis", false);
            } else {
                document.getElementsByClassName("ShopHausOut_B")[0].classList.toggle("hidethis", true);
            }
        }
    }
    if (activeMap == "MeinHaus") {
        for (let i = 0; i < maps[activeMap].tulpaPc.length; i++) {
            const area = maps[activeMap].tulpaPc[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("Tulpa-PC")[0].classList.toggle("hidethis", false);
            } else {
                document.getElementsByClassName("Tulpa-PC")[0].classList.toggle("hidethis", true);
            }
        }
        for (let i = 0; i < maps[activeMap].selfHome.length; i++) {
            const area = maps[activeMap].selfHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("MeinHausOut_B")[0].classList.toggle("hidethis", false);
            } else {
                document.getElementsByClassName("MeinHausOut_B")[0].classList.toggle("hidethis", true);
            }
        }
    }
    if (activeMap == "TroysHaus") {
        for (let i = 0; i < maps[activeMap].profHome.length; i++) {
            const area = maps[activeMap].profHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("TroysHausOut_B")[0].classList.toggle("hidethis", false);
            }
            else {
                document.getElementsByClassName("TroysHausOut_B")[0].classList.toggle("hidethis", true);
            }
        }
    }
    if (activeMap == "MAP") {
        for (let i = 0; i < maps[activeMap].shopHome.length; i++) {
            const area = maps[activeMap].shopHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("ShopHaus_B")[0].classList.toggle("hidethis", false);
            } else {
                document.getElementsByClassName("ShopHaus_B")[0].classList.toggle("hidethis", true);
            }
        }
        for (let i = 0; i < maps[activeMap].profHome.length; i++) {
            const area = maps[activeMap].profHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("TroysHaus_B")[0].classList.toggle("hidethis", false);
            } else {
                document.getElementsByClassName("TroysHaus_B")[0].classList.toggle("hidethis", true);
            }
        }
        for (let i = 0; i < maps[activeMap].selfHome.length; i++) {
            const area = maps[activeMap].selfHome[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                document.getElementsByClassName("MeinHaus_B")[0].classList.toggle("hidethis", false);
            }
            else {
                document.getElementsByClassName("MeinHaus_B")[0].classList.toggle("hidethis", true);
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
                    lastArea = "wald";
                    console.log("Erkannter Bereich: ", lastArea);
                    battleanimation(0);
                }
            }
        }
        for (let i = 0; i < maps[activeMap].battleAreaDW.length; i++) {
            const area = maps[activeMap].battleAreaDW[i];
            if (newMapX >= area.minX && newMapX <= area.maxX && newMapY >= area.minY && newMapY <= area.maxY) {
                let zufall = Math.round(Math.random() * 100);
                if (zufall <= 10) {
                    clearInterval(moveIntervalID);
                    lastArea = "dunkelwald";
                    console.log("Erkannter Bereich: ", lastArea);
                    battleanimation(0);
                }
            }
        }
    }
    mapX = newMapX;
    mapY = newMapY;
    Player.MapX = mapX;
    Player.MapY = mapY;
    console.log("X:", mapX, " Y:", mapY); //Log für Koordinaten
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

function zonenName() {
    console.log();
}

function Click_W_down() {simulateKeyDown("w");}
function Click_W_up() {simulateKeyUp("w");}

function Click_A_down() {simulateKeyDown("a");}
function Click_A_up() {simulateKeyUp("a");}

function Click_S_down() {simulateKeyDown("s");}
function Click_S_up() {simulateKeyUp("s");}

function Click_D_down() {simulateKeyDown("d");}
function Click_D_up() {simulateKeyUp("d");}

function simulateKeyDown(key) {document.dispatchEvent(new KeyboardEvent("keydown", { key: key }));}
function simulateKeyUp(key) {document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));}