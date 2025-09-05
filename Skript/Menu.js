//Javascript Menu
function MenuList() {
    if (document.getElementById('MenuList').classList.contains('hidethis')) {
        document.getElementById('MenuList').classList.toggle("hidethis", false); clearInterval(moveIntervalID);
    }
    else {
        document.getElementById('MenuList').classList.toggle("hidethis", true);
        moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
    }
}

async function Cheat() {
    let CheatInput = await showCustomPrompt("Bitte gib den Cheat ein:", "Eingabe");
    console.log("Führe Cheat(", CheatInput, ") aus...");
    switch (CheatInput) {
        case "MOREGOLD":
            Player.Gold += 1000;
            Player.Cheats += 1;
            showCustomAlert(CheatInput + " wurde erfolgreich ausgeführt!");
            console.log("Cheat() ✅");
            break;
        case "CHANGENAME":
            let newName = await showCustomPrompt("Gib deinen neuen Namen ein:", "Max");
            Player.name = newName;
            Player.Cheats += 1;
            showCustomAlert("Der Name wurde zu " + newName + " geändert.");
            console.log("Cheat() ✅");
            break;
        case "GETBALLS":
            Player.inventory.balls.Tulpaball += 10;
            Player.inventory.balls.Super_Tulpaball += 5;
            Player.inventory.balls.Hyper_Tulpaball += 2;
            Player.inventory.balls.Ultra_Tulpaball += 1;
            Player.Cheats += 1;
            showCustomAlert(CheatInput + " wurde erfolgreich ausgeführt!");
            console.log("Cheat() ✅");
            break;
        case "GETDRINKS":
            Player.inventory.drinks.Heiltrank += 10;
            Player.inventory.drinks.Super_Heiltrank += 5;
            Player.inventory.drinks.Manatrank += 2;
            Player.inventory.drinks.Super_Manatrank += 1;
            Player.Cheats += 1;
            showCustomAlert(CheatInput + " wurde erfolgreich ausgeführt!");
            console.log("Cheat() ✅");
            break;
        case "GETBONBONS":
            Player.inventory.bonbons.Bonbon += 5;
            Player.inventory.bonbons.Super_Bonbon += 2;
            Player.inventory.bonbons.Hyper_Bonbon += 1;
            Player.Cheats += 1;
            showCustomAlert(CheatInput + " wurde erfolgreich ausgeführt!");
            console.log("Cheat() ✅");
            break;
        case "GETBOSSTULPA":
            Player.Tulpas.Slot_1 = { name: "Streitross", Lv: 250, HP: 850, HP_Total: 850, XP: 3125000 };
            showCustomAlert(CheatInput + " wurde erfolgreich ausgeführt!");
            console.log("Cheat() ✅");
            break;
        case "GETBOSSTULPA":
            Player.Tulpas.Slot_1 = { name: "Böser_Wolf", Lv: 1000, HP: 3100, HP_Total: 3100, XP: 50000000 };
            showCustomAlert(CheatInput + " wurde erfolgreich ausgeführt!");
            console.log("Cheat() ✅");
            break;
        case "MAIKYTULPA":
            Player.Tulpas.Slot_4 = { name: "Böser_Wolf", Lv: 5, HP: 65, HP_Total: 65, XP: 1250 };
            showCustomAlert(CheatInput + " wurde erfolgreich ausgeführt!");
            console.log("Cheat() ✅");
            break;
        default:
            console.warn("catched Cheat()-ERROR: Cheat not found => Cheat() stopped");
            showCustomAlert("Cheat nicht gefunden!");
            break;
    }
}

function Tulpa_Dex() {
    document.getElementById('Tulpa_Dex').classList.toggle("hidethis", false); let html = '';
    for (Tulpa in Tulpas) {
        html += '<div style="float:left;margin:5px;"><div class="Tulpa_Name">' + Tulpas[Tulpa].name + '</div>' +
            '<div class="' + Tulpas[Tulpa].className + '"></div>' +
            '<div class="description">' + Tulpas[Tulpa].des + '</div></div>';
    }
    document.getElementById('Tulpa_Dex_List').innerHTML = html;
}

function close_Tulpa_Dex() { document.getElementById('Tulpa_Dex').classList.toggle("hidethis", true); }

function Tulpas_List() {
    document.getElementById('Tulpas').classList.toggle("hidethis", false); let html = '';
    for (Slot in Player.Tulpas) {
        if (Slot.startsWith('Slot')) {
            let tulpa = Player.Tulpas[Slot];
            if (tulpa.name != "") {
                html += '<div style="display:block;margin-bottom:5px;"><div class="' + tulpa.name + '"></div><br>' +
                    '<div style="position:relative;left:30px;">' + Tulpas[tulpa.name].name + ' Lv.' + tulpa.Lv + ' HP:' + tulpa.HP + '/' + tulpa.HP_Total + '</div>' +
                    '<div class="LP_Bar"><div class="LP_Fill" style="width:' + Math.round((tulpa.HP / tulpa.HP_Total) * 100) + '%"></div></div>' +
                    '<button class="Change_Tulpa" onclick="swapTulpa(\'' + Slot + '\');Click()">🔄️</button>' +
                    '<button class="Delete_Tulpa" onclick="removeTulpa(\'' + Slot + '\');Click()">🗑️</button></div>';
            }
        }
    };
    document.getElementById('Tulpa_List').innerHTML = html;
}

async function removeTulpa(Slot) {
    console.log("Führe removeTulpa(", Slot, ") aus...");
    let antwort = await showCustomConfirm("Soll " + Player.Tulpas[Slot].name + " wirklich gelöscht werden?");
    if (antwort && Slot != "Slot_1") {
        console.log("removeTulpa() confirmed by User!");
        showCustomAlert(Player.Tulpas[Slot].name + " wurde gelöscht.");
        Player.Tulpas[Slot] = { name: "", Lv: 0, HP: 0, HP_Total: 0, XP: 0, ID: "" };
        if (Slot != "Slot_6") {
            for (i in Player.Tulpas) {
                if (i.startsWith("Slot") && i != "Slot_6") {
                    if (Player.Tulpas[i].name == "") {
                        let nextPos = parseInt(i.split('_')[1]) + 1;
                        let nextSlot = "Slot_" + nextPos;
                        if (Player.Tulpas[nextSlot].name != "") {
                            let nextTulpa = Player.Tulpas[nextSlot];
                            Player.Tulpas[nextSlot] = { name: "", Lv: 0, HP: 0, HP_Total: 0, XP: 0, ID: "" };
                            Player.Tulpas[i] = nextTulpa;
                        }
                    }
                }
            }
        }
        console.log("removeTulpa(", Slot, ") ✅ => Tulpas_List()");
        Tulpas_List();
    } else if (Slot == "Slot_1") {
        console.warn("catched removeTulpa()-ERROR: Slot_1 must be set => removeTulpa(", Slot, ") stopped");
        showCustomAlert("Der erste Slot muss immer belegt sein!");
    } else {
        console.log("removeTulpa() canceled by User! => removeTulpa(", Slot, ") stopped")
    }
}

async function swapTulpa(Slot) {
    console.warn("Führe swapTulpa(", Slot, ") aus...");
    const buttonsArray = [];
    for (i = 1; i <= 6; i++) {
        let slot = "Slot_" + i;
        if (Player.Tulpas[slot].name != "") {
            let obj = { text: Tulpas[Player.Tulpas[slot].name].name + " Lv. " + Player.Tulpas[slot].Lv, value: slot };
            buttonsArray.push(obj);
        }
    }
    let antwort = await showCustomMenu("Deine Tulpas:", buttonsArray);
    console.log("Versuche ", Slot, " mit ", antwort, " zu tauschen...");
    if (antwort) {
        let tulpa_1 = Player.Tulpas[Slot]; let tulpa_2 = Player.Tulpas[antwort];
        Player.Tulpas[Slot] = tulpa_2; Player.Tulpas[antwort] = tulpa_1;
        Tulpas_List();
        console.log("swapTulpa(", Slot, ") ✅");
    }
    else {
        showCustomAlert("Tausch abgebrochen.");
    }
}

function close_Tulpas() { document.getElementById('Tulpas').classList.toggle("hidethis", true); }

function Info() {
    document.getElementById('Info').classList.toggle("hidethis", false); let html = '';
    html += '<table><tr>' +
        '<td>Spielername:</td><td>' + Player.name + '</td></tr><tr><td>Gold:</td><td>' + Player.Gold + '</td></tr>' +
        '<tr><td>Gefangene Tulpas:</td><td>' + Player.catchedTulpas + '</td></tr>' +
        '<tr><td>Besiegte Trainer:</td><td>' + Player.defeatedTrainer.length + '</td></tr>' +
        '<tr><td>Cheats:</td><td>' + Player.Cheats + '</td></tr>';
    document.getElementById('Info_List').innerHTML = html;
}

function close_Info() { document.getElementById('Info').classList.toggle("hidethis", true); }

function Karte() {
    document.getElementById('Karte').classList.toggle("hidethis", false);
    const standortMarker = document.getElementById('standort-marker');
    standortMarker.classList.toggle("hidethis", false);

    // Karten- und Anzeigedimensionen
    const mapWidth = parseInt(maps[activeMap].Width);   // Original-Kartenbreite (z. B. 3250)
    const mapHeight = parseInt(maps[activeMap].Height); // Original-Kartenhöhe (z. B. 1250)

    const displayWidth = 450;  // Breite des #Karte-Containers
    const displayHeight = 125; // Höhe des #Karte-Containers

    // Spieler-Position (mapX/mapY sind negativ, da die Karte verschoben wird)
    const playerX = -mapX;  // Umkehr der Richtung
    const playerY = -mapY;  // Umkehr der Richtung

    // Verhältnis zwischen Originalkarte und Anzeige berechnen
    const scaleX = displayWidth / mapWidth;
    const scaleY = displayHeight / mapHeight;
    //console.log(scaleX);
    //console.log(scaleY);
    // Marker-Position (skaliert & zentriert)
    let markerX = playerX * scaleX;
    let markerY = playerY * scaleY;

    const karteInfo = document.getElementById('Karte_info');
    const karteInfoOffset = karteInfo.getBoundingClientRect().top - document.getElementById('Karte').getBoundingClientRect().top;
    markerY -= karteInfoOffset;

    markerX += 25; // Nach rechts 
    markerY += 160;  // Nach unten

    // Marker setzen (mit Korrektur für die Mitte des Markers)
    standortMarker.style.left = `${markerX}px`;
    standortMarker.style.top = `${markerY}px`;

    //console.log("Spieler-Position (Original):", playerX, playerY);
    //console.log("Marker-Position (Skaliert):", markerX, markerY);
}

function close_Karte() {
    document.getElementById('Karte').classList.toggle("hidethis", true);
    document.getElementById('standort-marker').classList.toggle("hidethis", true);
}

function Items() {
    document.getElementById('Items').classList.toggle("hidethis", false);
    let html = "<div id='Bälle' class='Item_Title'>Bälle: </div><br>";
    for (ball in Player.inventory.balls) {
        html += '<div><button title="Kann nur im Kampf eingesetzt werden." class="Item_list" disabled>' + Item_List[ball].name + ': ' + Player.inventory.balls[ball] + '</button><br>';
    }; html += "<br><div id='Tränke' class='Item_Title'>Tränke: </div><br>";
    for (drink in Player.inventory.drinks) {
        html += '<div><button title="' + Item_List[drink].des + '" class="Item_list" onclick="Use(\'' + drink + '\',\'' + Player.inventory.drinks[drink] + '\')">' + Item_List[drink].name + ': ' + Player.inventory.drinks[drink] + '</button><br>';
    }; html += "<br><div id='Bonbons' class='Item_Title'>Bonbons: </div><br>";
    for (bonbon in Player.inventory.bonbons) {
        html += '<div><button title="' + Item_List[bonbon].des + '" class="Item_list" onclick="Use(\'' + bonbon + '\',\'' + Player.inventory.bonbons[bonbon] + '\')">' + Item_List[bonbon].name + ': ' + Player.inventory.bonbons[bonbon] + '</button><br>';
    }
    document.getElementById('Item_List').innerHTML = html;
}

function close_Items() { document.getElementById('Items').classList.toggle("hidethis", true); }

async function Use(itm, qty) {
    console.warn("Führe Use(", itm, qty, ") aus...");
    const buttonsArray = [];
    for (i = 1; i <= 6; i++) {
        let slot = "Slot_" + i;
        if (Player.Tulpas[slot].name != "") {
            let obj = { text: Tulpas[Player.Tulpas[slot].name].name + " Lv. " + Player.Tulpas[slot].Lv, value: slot };
            buttonsArray.push(obj);
        }
    }
    if (qty > 0) {
        if (itm in Player.inventory.drinks) {
            console.log("Trank erkannt. Warte auf Antwort des Spielers...");
            let antwort = await showCustomMenu("Deine Tulpas:", buttonsArray);
            if (antwort) {
                console.log("Versuche Trank auf ", antwort, " anzuwenden...");
                if (Player.Tulpas[antwort].name != "") {
                    if (Player.Tulpas[antwort].HP != Player.Tulpas[antwort].HP_Total) {
                        Player.Tulpas[antwort].HP += Item_List[itm].HP;
                        if (Player.Tulpas[antwort].HP > Player.Tulpas[antwort].HP_Total) {
                            Player.Tulpas[antwort].HP = Player.Tulpas[antwort].HP_Total;
                        }
                        Player.inventory.drinks[itm] -= 1;
                        console.log("Anwendung erfolgreich.");
                        showCustomAlert("Anwendung erfolgreich.");
                    } else {
                        console.warn("catched Use()-ERROR: HP is already MAX => Use(", itm, qty, ") stopped");
                        showCustomAlert(Tulpas[Player.Tulpas[antwort].name].name + " ist bereits vollständig geheilt!\nWähle ein anderes und versuche es nochmal.");
                    }
                }
            } else { showCustomAlert("Verwendung abgebrochen."); }
        }
        else {
            console.log("Bonbon erkannt. Warte auf Spielereingabe...");
            let antwort = await showCustomMenu("Deine Tulpas:", buttonsArray);
            console.log("Versuche Bonbon auf Slot ", antwort, " anzuwenden...");
            if (antwort) {
                if (Player.Tulpas[antwort].name != "") {
                    Player.Tulpas[antwort].XP += Item_List[itm].XPB;
                    if (Player.Tulpas[antwort].XP >= (25 * (Player.Tulpas[antwort].Lv + 1) * (2 * (Player.Tulpas[antwort].Lv + 1)))) {
                        showCustomAlert(Tulpas[Player.Tulpas[antwort].name].name, " ist ein Level aufgestiegen.");
                        Player.Tulpas[antwort].Lv += 1;
                        Player.Tulpas[antwort].HP = Tulpas[Player.Tulpas[antwort].name].HP + (3 * Player.Tulpas[antwort].Lv);
                        Player.Tulpas[antwort].HP_Total = Tulpas[Player.Tulpas[antwort].name].HP + (3 * Player.Tulpas[antwort].Lv);
                    }
                    Player.inventory.bonbons[itm] -= 1;
                    console.log("Anwendung erfolgreich.");
                    showCustomAlert("Bonbon erfolgreich bei ", Tulpas[Player.Tulpas[antwort].name].name, " angewendet.");
                }
            } else { showCustomAlert("Verwendung abgebrochen."); }
        }
    }
}