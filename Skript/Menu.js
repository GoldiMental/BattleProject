document.getElementById('MenuList').style.visibility = 'hidden';
document.getElementById('Tulpa_Dex').style.visibility = 'hidden';
document.getElementById('Info').style.visibility = 'hidden';
document.getElementById('Karte').style.visibility = 'hidden';
document.getElementById('Items').style.visibility = 'hidden';
document.getElementById('Tulpas').style.visibility = 'hidden';

function MenuList() {
    if (document.getElementById('MenuList').style.visibility == 'hidden') {
        document.getElementById('MenuList').style.visibility = 'visible';
    } else { document.getElementById('MenuList').style.visibility = 'hidden'; }
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
}

function close_Karte() {
    document.getElementById('Karte').style.visibility = 'hidden';
}

function Items() {
    document.getElementById('Items').style.visibility = 'visible';
}

function close_Items() {
    document.getElementById('Items').style.visibility = 'hidden';
}