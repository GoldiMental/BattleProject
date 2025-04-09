document.getElementById('MenuList').style.visibility = 'hidden';
document.getElementById('Tulpa_Dex').style.visibility = 'hidden';
document.getElementById('Info').style.visibility = 'hidden';
document.getElementById('Karte').style.visibility = 'hidden';
document.getElementById('Items').style.visibility = 'hidden';
document.getElementById('Tulpas').style.visibility = 'hidden';

function MenuList() {
    if (document.getElementById('MenuList').style.visibility == 'hidden') {
        document.getElementById('MenuList').style.visibility = 'visible';
        clearInterval(moveIntervalID);
    } else {
        document.getElementById('MenuList').style.visibility = 'hidden';
        moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
    }
}

function Cheat() {
    let CheatInput = prompt("Gib bitte den Cheat ein:", "Eingabe");
    if (CheatInput == "MOREGOLD") {
        Player.Gold += 1000;
        Player.Cheats += 1;
        setCookie("PlayerData", JSON.stringify(Player), 30);
        alert(CheatInput + " wurde erfolgreich ausgeführt!");
    } else if (CheatInput == "CHANGENAME") {
        let newName = prompt("Gib deinen neuen Namen ein:", "Max");
        Player.name = newName;
        Player.Cheats += 1;
        setCookie("PlayerData", JSON.stringify(Player), 30);
        alert("Der Name wurde zu " + newName + " geändert.");
    }
    else {
        alert("Cheat ungültig")
    }
}

function Tulpa_Dex() {
    document.getElementById('Tulpa_Dex').style.visibility = 'visible';
    let html = '';
    for (Tulpa in Tulpas) {
        html += '<div style="float:left;margin:5px;"><div class="Tulpa_Name">' + Tulpas[Tulpa].name + '</div>' +
            '<div class="' + Tulpas[Tulpa].className + '"></div>' +
            '<div class="description">' + Tulpas[Tulpa].des + '</div></div>';
    }
    document.getElementById('Tulpa_Dex_List').innerHTML = html;
}

function close_Tulpa_Dex() {
    document.getElementById('Tulpa_Dex').style.visibility = 'hidden';
}

function Tulpas_List() {
    document.getElementById('Tulpas').style.visibility = 'visible';
    let html = '';
    for (Slot in Player.Tulpas) {
        if (Slot.startsWith('Slot')) {
            let tulpa = Player.Tulpas[Slot];
            if (tulpa.name != "") {
                html += '<div style="display:block;margin-bottom:5px;"><div class="' + tulpa.name + '"></div><br>' +
                    '<div style="position:relative;left:60px;">' + Tulpas[tulpa.name].name + ' Lv.' + tulpa.Lv + ' HP:' + tulpa.HP + '/' + tulpa.HP_Total + '</div>' +
                    '<div class="LP_Bar">' +
                    '<div class="LP_Fill" style="width:' + Math.round((tulpa.HP / tulpa.HP_Total) * 100) + '%"></div>' +
                    '</div>' +
                    '<button class="Change_Tulpa" onclick="swapTulpa(\'' + Slot + '\');Click()">🔄️</button>' +
                    '<button class="Delete_Tulpa" onclick="removeTulpa(\'' + Slot + '\');Click()">🗑️</button></div>';
            }
        }
    };
    document.getElementById('Tulpa_List').innerHTML = html;
}

function removeTulpa(Slot) {
    let antwort = confirm("Soll " + Player.Tulpas[Slot].name + " wirklich gelöscht werden?");
    if (antwort && Slot != "Slot_1") {
        alert(Player.Tulpas[Slot].name + " wurde gelöscht.");
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
        setCookie("PlayerData", JSON.stringify(Player), 30);
        Tulpas_List();
    } else if (Slot == "Slot_1") {
        alert("Der erste Slot muss immer belegt sein!");
    }
}

function swapTulpa(Slot) {
    let antwort = prompt("Mit welchem Slot soll " + Slot + " getauscht werden? Gib dazu die Slotnummer (1-6) an:", "0 beendet den Tausch");
    if (antwort != 0 && antwort <= 6 && Player.Tulpas["Slot_" + antwort].name != "" && Slot != "Slot_" + antwort) {
        let tulpa_1 = Player.Tulpas[Slot];
        let tulpa_2 = Player.Tulpas["Slot_" + antwort];
        Player.Tulpas[Slot] = tulpa_2;
        Player.Tulpas["Slot_" + antwort] = tulpa_1;
        setCookie("PlayerData", JSON.stringify(Player), 30);
        Tulpas_List();
    } else {
        alert("Tausch nicht möglich! \n Falsche Eingabe oder Slot nicht belegt.");
    }
}

function close_Tulpas() {
    document.getElementById('Tulpas').style.visibility = 'hidden';
}

function Info() {
    document.getElementById('Info').style.visibility = 'visible';
    let html = '';
    html += '<div>Name: ' + Player.name + '</div>' +
        '<div>Gold: ' + Player.Gold + '</div>' +
        '<div>Cheats: ' + Player.Cheats + '</div>';
    document.getElementById('Info_List').innerHTML = html;
}

function close_Info() {
    document.getElementById('Info').style.visibility = 'hidden';
}

function Karte() {
    document.getElementById('Karte').style.visibility = 'visible';
    const standortMarker = document.getElementById('standort-marker');
    standortMarker.style.visibility = 'visible';

    // Karten- und Anzeigedimensionen
    const mapWidth = parseInt(maps[activeMap].Width);   // Original-Kartenbreite (z. B. 3250)
    const mapHeight = parseInt(maps[activeMap].Height); // Original-Kartenhöhe (z. B. 1250)

    const displayWidth = 450;  // Breite des #Karte-Containers
    const displayHeight = 172; // Höhe des #Karte-Containers

    // Spieler-Position (mapX/mapY sind negativ, da die Karte verschoben wird)
    const playerX = -mapX;  // Umkehr der Richtung
    const playerY = -mapY;  // Umkehr der Richtung

    // Verhältnis zwischen Originalkarte und Anzeige berechnen
    const scaleX = displayWidth / mapWidth;
    const scaleY = displayHeight / mapHeight;
    console.log(scaleX);
    console.log(scaleY);
    // Marker-Position (skaliert & zentriert)
    let markerX = playerX * scaleX;
    let markerY = playerY * scaleY;

    const karteInfo = document.getElementById('Karte_info');
    const karteInfoOffset = karteInfo.getBoundingClientRect().top - document.getElementById('Karte').getBoundingClientRect().top;
    markerY -= karteInfoOffset;

    markerX += 35; // Nach rechts 
    markerY += 175;  // Nach unten

    // Marker setzen (mit Korrektur für die Mitte des Markers)
    standortMarker.style.left = `${markerX}px`;
    standortMarker.style.top = `${markerY}px`;

    console.log("Spieler-Position (Original):", playerX, playerY);
    console.log("Marker-Position (Skaliert):", markerX, markerY);
}

function close_Karte() {
    document.getElementById('Karte').style.visibility = 'hidden';
    document.getElementById('standort-marker').style.visibility = 'hidden';
}

function Items() {
    document.getElementById('Items').style.visibility = 'visible';
    let html = "<div id='Bälle' class='Item_Title'>Bälle: </div><br>";
    for (ball in Player.inventory.balls) {
        html += '<div><div class="Item_list">' + Item_List[ball].name + ': ' + Player.inventory.balls[ball] + '</div>';
    }
    html += "<div id='Tränke' class='Item_Title'>Tränke: </div><br>";
    for (drink in Player.inventory.drinks) {
        html += '<div><div class="Item_list">' + Item_List[drink].name + ': ' + Player.inventory.drinks[drink] + '</div>';
    }
    html += "<div id='Bonbons' class='Item_Title'>Bonbons: </div><br>";
    for (bonbon in Player.inventory.bonbons) {
        html += '<div><div class="Item_list">' + Item_List[bonbon].name + ': ' + Player.inventory.bonbons[bonbon] + '</div>';
    }
    document.getElementById('Item_List').innerHTML = html;
}

function close_Items() {
    document.getElementById('Items').style.visibility = 'hidden';
}