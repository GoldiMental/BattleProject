
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
        '<button class="Change_Tulpa" ;Click()">🔄️</button>' +
        '<button class="Delete_Tulpa" ;Click()">🗑️</button></div>';
      }
}        
    document.getElementById('TulpaPC_List').innerHTML = html;
        //console.log(pcTulpas)
}
function close_Tulpa_PC() {
    document.getElementById('TulpaPC').style.visibility = 'hidden';
    moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
}