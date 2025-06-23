
function TulpaPC() {
    let pcTulpas = Player.Tulpas.PC;
    let html = "";  
    document.getElementById('TulpaPC').style.visibility = 'visible';
    clearInterval(moveIntervalID);
    for (Tulpa in pcTulpas) {
            let tulpa = pcTulpas[Tulpa];
            if (tulpa.name != "") {
        html += '<div><div class="' + tulpa.name + '"></div><br>' +
        '<div style="position:relative;left:60px;" class="TulpaPC_01">' + "</br>" + pcTulpas[Tulpa].name + " " + "Lv." + pcTulpas[Tulpa].Lv + ' HP:' + pcTulpas[Tulpa].HP + '/' + pcTulpas[Tulpa].HP_Total + '</div>' +
        '<div class="LP_Bar">' +
        '<div class="LP_Fill" style="width:' + Math.round((tulpa.HP / tulpa.HP_Total) * 100) + '%"></div>' +   
        '</div>' +
        '<button class="Change_Tulpa" onclick="promptSwapWithTeam(' + Tulpa + ')">🔄️</button>' +
        '<button class="Delete_Tulpa" onclick="removeTulpaFromPC(' + Tulpa + ');Click()">🗑️</button></div>';
      }
}        
    document.getElementById('TulpaPC_List').innerHTML = html;
        //console.log(pcTulpas)
}
function close_Tulpa_PC() {
    document.getElementById('TulpaPC').style.visibility = 'hidden';
    moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
}

async function removeTulpaFromPC(index) {
    index = parseInt(index); 
    let tulpaPC = Player.Tulpas.PC;

    if (!Array.isArray(tulpaPC) || index < 0 || index >= tulpaPC.length) {
        showCustomAlert("Ungültiger Index im Tulpa-PC.");
        return;
    }

    let selectedTulpa = tulpaPC[index];

    if (!selectedTulpa || typeof selectedTulpa.name !== "string") {
        showCustomAlert("An dieser Stelle befindet sich keine gültige Tulpa.");
        return;
    }

    let antwort = await showCustomConfirm(`Soll "${selectedTulpa.name}" wirklich aus dem Tulpa-PC gelöscht werden?`);

    if (antwort) {
        tulpaPC.splice(index, 1);
        showCustomAlert(`"${selectedTulpa.name}" wurde aus dem Tulpa-PC gelöscht.`);
        setCookie("PlayerData", JSON.stringify(Player), 30);
        TulpaPC();
    }
}

async function promptSwapWithTeam(pcIndex) {
    let antwort = await showCustomPrompt("Mit welchem Team-Slot soll getauscht werden? Gib dazu die Slotnummer (1-6) an:", "0 beendet den Tausch");
    if (antwort == 0) return;

    let teamSlot = "Slot_" + antwort;
    swapTulpaWithPC(teamSlot, pcIndex);
}

async function swapTulpaWithPC(teamSlot, pcIndex) {
    
    if (!Player.Tulpas.hasOwnProperty(teamSlot)) {
        showCustomAlert("Ungültiger Team-Slot.");
        return;
    }

    const teamTulpa = Player.Tulpas[teamSlot];
    const pcTulpa = Player.Tulpas.PC[pcIndex];

    if (!teamTulpa || teamTulpa.name === "") {
        showCustomAlert("Der gewählte Team-Slot ist leer.");
        return;
    }

    if (!pcTulpa || pcTulpa.name === "") {
        showCustomAlert("Der gewählte PC-Slot ist leer.");
        return;
    }

    
    let confirm = await showCustomConfirm(
        `Soll "${teamTulpa.name}" aus ${teamSlot} mit "${pcTulpa.name}" aus dem Tulpa-PC getauscht werden?`
    );

    if (!confirm) return;

    
    Player.Tulpas[teamSlot] = pcTulpa;
    Player.Tulpas.PC[pcIndex] = teamTulpa;

    
    setCookie("PlayerData", JSON.stringify(Player), 30);
    Tulpas_List();
    TulpaPC(); 
}