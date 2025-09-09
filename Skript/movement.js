const moveSpeed = 50;
const moveInterval = 300;
let lastArea = "";
let activeDirection = null;
let activeMap;
let minX;
let maxX;
let minY;
let maxY;
const movementGame = document.getElementById("movement_game");
const documentMap = document.querySelector('.map');

async function changeMap(mapname) {
    movementGame.classList.toggle("hidethis", true);
    console.log("Führe changeMap(", mapname, ") aus...");
    switch (mapname) {
        case "MAP":
            document.getElementById("karte").disabled = false;
            toggleIDElement("tuerSelfOut", true);
            toggleIDElement("tuerSelfIn", false);
            toggleIDElement("tuerTroyOut", true);
            toggleIDElement("Professor", true);
            toggleIDElement("tuerShopIn", false);
            toggleIDElement("Haendler", true);
            toggleIDElement("tuerShopOut", true);
            toggleIDElement("ArenaButtonIn", false);
            toggleIDElement("ArenaButtonOut", true);
            toggleClassElement("ArenaLeiter1", true);
            toggleClassElement("ArenaTrainer1", true);
            toggleClassElement("ArenaTrainer2", true);
            break;
        case "MeinHaus":
            document.getElementById("karte").disabled = true;
            toggleIDElement("tuerSelfIn", true);
            toggleIDElement("tuerSelfOut", false);
            break;
        case "TroysHaus":
            document.getElementById("karte").disabled = true;
            toggleIDElement("tuerTroyOut", false);
            toggleIDElement("Professor", false);
            break;
        case "ShopHaus":
            document.getElementById("karte").disabled = true;
            toggleIDElement("tuerShopIn", true);
            toggleIDElement("Haendler", false);
            toggleIDElement("tuerShopOut", false);
            break;
        case "ShopHausHG":
            document.getElementById("karte").disabled = true;
            toggleIDElement("tuerShopHgIn", true);
            toggleIDElement("Haendler", false);
            toggleIDElement("tuerShopHgOut", false);
            break;
        case "ArenaField":
            document.getElementById("karte").disabled = true;
            toggleIDElement("ArenaButtonIn", true);
            toggleIDElement("ArenaButtonOut", false);
            toggleClassElement("ArenaLeiter1", false);
            toggleClassElement("ArenaTrainer1", false);
            toggleClassElement("ArenaTrainer2", false);
            break;
    }
    activeMap = maps[mapname].name;
    documentMap.className = "map " + activeMap;
    Player.actualMap = activeMap;
    refreshMap(); await Delay(750);
    movementGame.classList.toggle("hidethis", false);
    console.log("changeMap(", mapname, ") ✅");
}

function refreshMap() {
    console.log("Führe refreshMap() aus...");
    minX = -(parseInt(maps[activeMap].Width) - 250); maxX = 250;
    minY = -(parseInt(maps[activeMap].Height) - 250); maxY = 250;
    moveMap(); console.log("refreshMap() ✅");
}

function meinEingang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.MeinHaus.startX; Player.MapY = maps.MeinHaus.startY;
    changeMap('MeinHaus');
}
function meinAusgang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.MeinHaus.startStadtX; Player.MapY = maps.MeinHaus.startStadtY;
    changeMap('MAP');
}
function troysEingang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.TroysHaus.startX; Player.MapY = maps.TroysHaus.startY;
    changeMap('TroysHaus');
}
function troysAusgang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.TroysHaus.startStadtX; Player.MapY = maps.TroysHaus.startStadtY;
    changeMap('MAP');
}
function shopEingang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.ShopHaus.startX; Player.MapY = maps.ShopHaus.startY;
    changeMap('ShopHaus');
}
function shopAusgang() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.ShopHaus.startStadtX; Player.MapY = maps.ShopHaus.startStadtY;
    changeMap('MAP');
}
function shopEingangHG() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.ShopHausHG.startX; Player.MapY = maps.ShopHausHG.startY;
    changeMap('ShopHausHG');
}
function shopAusgangHG() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.ShopHausHG.startStadtX; Player.MapY = maps.ShopHausHG.startStadtY;
    changeMap('MAP');
}
function arenaIn() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.ArenaField.startX; Player.MapY = maps.ArenaField.startY;
    changeMap('ArenaField');
}
function arenaOut() {
    document.getElementById('door-sound').play();
    Player.MapX = maps.ArenaField.startStadtX; Player.MapY = maps.ArenaField.startStadtY;
    changeMap('MAP');
}

function moveMap() {
    const player = document.getElementById('user');
    let direction = ""; let newMapX = Player.MapX; let newMapY = Player.MapY;
    switch (activeDirection) {
        case "w": if (Player.MapY + moveSpeed <= maxY) { direction = "up"; newMapY = Player.MapY + moveSpeed; }; break;
        case "a": if (Player.MapX + moveSpeed <= maxX) { direction = "left"; newMapX = Player.MapX + moveSpeed; }; break;
        case "s": if (Player.MapY - moveSpeed >= minY) { direction = "down"; newMapY = Player.MapY - moveSpeed; }; break;
        case "d": if (Player.MapX - moveSpeed >= minX) { direction = "right"; newMapX = Player.MapX - moveSpeed; }; break;
        default: console.warn("catched moveMap()-ERROR: unknown activeDirection:", activeDirection, " => reset activeDirection"); break;
    }
    for (let i = 0; i < maps[activeMap].blockedArea.length; i++) {
        const a = maps[activeMap].blockedArea[i];
        if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { return; }
    }
    switch (activeMap) {
        case "ShopHaus":
            for (let i = 0; i < maps.ShopHaus.shopHandel.length; i++) {
                const a = maps.ShopHaus.shopHandel[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('ShopHandel_B', false); }
                else { toggleClassElement('ShopHandel_B', true); }
            }
            for (let i = 0; i < maps.ShopHaus.shopHome.length; i++) {
                const a = maps.ShopHaus.shopHome[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('ShopHausOut_B', false); }
                else { toggleClassElement('ShopHausOut_B', true); }
            }
            break;
        case "ShopHausHG":
            for (let i = 0; i < maps.ShopHausHG.shopHandelHG.length; i++) {
                const a = maps.ShopHausHG.shopHandelHG[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('ShopHandelHohesGras', false); }
                else { toggleClassElement('ShopHandelHohesGras', true); }
            }
            for (let i = 0; i < maps.ShopHausHG.shopHomeHG.length; i++) {
                const a = maps.ShopHausHG.shopHomeHG[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('ShopHausHohesGrasOut', false); }
                else { toggleClassElement('ShopHausHohesGrasOut', true); }
            }
            break;
        case "MeinHaus":
            for (let i = 0; i < maps.MeinHaus.tulpaPc.length; i++) {
                const a = maps.MeinHaus.tulpaPc[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('Tulpa-PC', false); }
                else { toggleClassElement('Tulpa-PC', true); }
            }
            for (let i = 0; i < maps.MeinHaus.selfHome.length; i++) {
                const a = maps.MeinHaus.selfHome[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('MeinHausOut_B', false); }
                else { toggleClassElement('MeinHausOut_B', true); }
            }
            break;
        case "TroysHaus":
            for (let i = 0; i < maps.TroysHaus.profHome.length; i++) {
                const a = maps.TroysHaus.profHome[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('TroysHausOut_B', false); }
                else { toggleClassElement('TroysHausOut_B', true); }
            }
            break;
        case "ArenaField":
            for (let i = 0; i < maps.ArenaField.ArenaHGInnen.length; i++) {
                const a = maps.ArenaField.ArenaHGInnen[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('ArenaBtnOut', false); }
                else { toggleClassElement('ArenaBtnOut', true); }
            }
            for (let i = 0; i < maps.ArenaField.Trainerbattle.length; i++) {
                const a = maps.ArenaField.Trainerbattle[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) {
                    trainername = a.name; var Fight = true;
                    for (i = 0; i <= Player.defeatedTrainer.length; i++) { if (Player.defeatedTrainer[i] == a.name) { Fight = false; } }
                    if (trainername == "ArenaLeiter001"){
                        let ArenaList = ["Trainer003", "Trainer004", ];
                        if(!ArenaList.every(element=>Player.defeatedTrainer.includes(element))){Fight = false}}
                    if (Fight) {
                        if (a.name == "Trainer003") { if (!Player.tulpaGegeben) { clearInterval(moveIntervalID); Trainer000monolog(TrainerList[trainername]); } }
                        else { clearInterval(moveIntervalID); traineranimation(TrainerList[trainername], trainername); }
                    }
                }
            }
            break;
        case "MAP":
            for (let i = 0; i < maps.MAP.shopHome.length; i++) {
                const a = maps.MAP.shopHome[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('ShopHaus_B', false); }
                else { toggleClassElement('ShopHaus_B', true); }
            }
            for (let i = 0; i < maps.MAP.profHome.length; i++) {
                const a = maps.MAP.profHome[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('TroysHaus_B', false); }
                else { toggleClassElement('TroysHaus_B', true); }
            }
            for (let i = 0; i < maps.MAP.selfHome.length; i++) {
                const a = maps.MAP.selfHome[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('MeinHaus_B', false); }
                else { toggleClassElement('MeinHaus_B', true); }
            }
            for (let i = 0; i < maps.MAP.shopHomeHG.length; i++) {
                const a = maps[activeMap].shopHomeHG[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('ShopHausHohesGrasIn', false); }
                else { toggleClassElement('ShopHausHohesGrasIn', true); }
            }
            for (let i = 0; i < maps.MAP.ArenaField.length; i++) {
                const a = maps[activeMap].ArenaField[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) { toggleClassElement('ArenaBtnIn', false); }
                else { toggleClassElement('ArenaBtnIn', true); }
            }
            for (let i = 0; i < maps.MAP.trainerBattle.length; i++) {
                const a = maps.MAP.trainerBattle[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) {
                    trainername = a.name; var Fight = true;
                    for (i = 0; i <= Player.defeatedTrainer.length; i++) { if (Player.defeatedTrainer[i] == a.name) { Fight = false; } }
                    if (Fight) {
                        if (a.name == "Trainer000") { if (!Player.tulpaGegeben) { clearInterval(moveIntervalID); Trainer000monolog(TrainerList[trainername]); } }
                        else { clearInterval(moveIntervalID); traineranimation(TrainerList[trainername], trainername); }
                    }
                }
            }
            for (let i = 0; i < maps.MAP.battleArea.length; i++) {
                const a = maps.MAP.battleArea[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) {
                    let zufall = Math.round(Math.random() * 100);
                    if (zufall <= 10) {
                        clearInterval(moveIntervalID); lastArea = "wald";
                        console.log("Erkannter Bereich: ", lastArea); battleanimation(0);
                    }
                }
            }
            for (let i = 0; i < maps.MAP.battleAreaDW.length; i++) {
                const a = maps.MAP.battleAreaDW[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) {
                    let zufall = Math.round(Math.random() * 100);
                    if (zufall <= 10) {
                        clearInterval(moveIntervalID); lastArea = "dunkelwald";
                        console.log("Erkannter Bereich: ", lastArea); battleanimation(0);
                    }
                }
            }
            for (let i = 0; i < maps.MAP.battleAreaHG.length; i++) {
                const a = maps.MAP.battleAreaHG[i];
                if (newMapX >= a.minX && newMapX <= a.maxX && newMapY >= a.minY && newMapY <= a.maxY) {
                    let zufall = Math.round(Math.random() * 50);
                    if (zufall <= 10) {
                        clearInterval(moveIntervalID); lastArea = "hohesgras";
                        console.log("Erkannter Bereich: ", lastArea); battleanimation(0);
                    }
                }
            }
            break;
    }
    Player.MapX = newMapX; Player.MapY = newMapY;
    console.log("moveMap() => X:", Player.MapX, " Y:", Player.MapY); //Log für Koordinaten
    if (direction) { player.className = 'Player m_' + direction; }
    documentMap.style.left = Player.MapX + 'px'; documentMap.style.top = Player.MapY + 'px';
}

function stopMovement() {
    const player = document.getElementById('user');
    if (player.className.startsWith('Player m_')) { let lastDir = player.className.split('_')[1]; player.className = 'Player ' + lastDir; }
    else { player.className = 'Player down'; }
}

document.addEventListener('keydown', (event) => {
    if (event.key.toLocaleLowerCase() === 'w' || event.key.toLocaleLowerCase() === 's' || event.key.toLocaleLowerCase() === 'd' || event.key.toLocaleLowerCase() === 'a') {
        activeDirection = event.key.toLocaleLowerCase();
    }
});

document.addEventListener('keyup', (event) => { if (event.key.toLocaleLowerCase() === activeDirection) { activeDirection = null; stopMovement(); } });

let moveIntervalID;
moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);

document.getElementById("W_Click").addEventListener("pointerdown", () => SimulateKeyDown("w"));
document.getElementById("W_Click").addEventListener("pointerup", () => SimulateKeyUp("w"));

document.getElementById("A_Click").addEventListener("pointerdown", () => SimulateKeyDown("a"));
document.getElementById("A_Click").addEventListener("pointerup", () => SimulateKeyUp("a"));

document.getElementById("S_Click").addEventListener("pointerdown", () => SimulateKeyDown("s"));
document.getElementById("S_Click").addEventListener("pointerup", () => SimulateKeyUp("s"));

document.getElementById("D_Click").addEventListener("pointerdown", () => SimulateKeyDown("d"));
document.getElementById("D_Click").addEventListener("pointerup", () => SimulateKeyUp("d"));

function SimulateKeyDown(key) { document.dispatchEvent(new KeyboardEvent("keydown", { key: key })); }
function SimulateKeyUp(key) { document.dispatchEvent(new KeyboardEvent("keyup", { key: key })); }