document.getElementById('MenuList').style.visibility = 'hidden';
document.getElementById('Tupla_Dex').style.visibility = 'hidden';
function MenuList() {
    if (document.getElementById('MenuList').style.visibility == 'hidden') {
        document.getElementById('MenuList').style.visibility = 'visible';
    } else { document.getElementById('MenuList').style.visibility = 'hidden'; }
}

function Cheat() {
    let CheatInput = prompt("Gib bitte den Cheat ein:", "Eingabe");
    if (CheatInput == "MOREGOLD") {
        Player.Gold += 1000;
        setCookie("PlayerData", JSON.stringify(Player), 30);
        alert(CheatInput + " wurde erfolgreich ausgeführt!");
    } else if (CheatInput == "CHANGENAME") {
        let newName = prompt("Gib deinen neuen Namen ein:", "Max");
        Player.name = newName;
        setCookie("PlayerData", JSON.stringify(Player), 30);
        alert("Der Name wurde zu " + newName + " geändert.");
    }
    else {
        alert("Cheat ungültig")
    }
}

function Tulpa_Dex(){
    document.getElementById('Tulpa_Dex').style.visibility = 'visible';
    let html = '';
    for(Tulpa in Tulpas){
        html += '<div style="float:left;margin:5px;"><div class="Tulpa_Name">'+Tulpas[Tulpa].name+'</div>'+
                '<div class="'+Tulpas[Tulpa]+'"></div>'+
                '<div class="description">'+Tulpas[Tulpa].des+'</div></div>';
    }
    document.getElementById('Tulpa_Dex_List').innerHTML = html;
}

function close_Tulpa_Dex(){
    document.getElementById('Tulpa_Dex').style.visibility = 'hidden';
}