
function TulpaPC() {
    let pcTulpas = Player.Tulpas.PC;
    let html = "";  
    document.getElementById('TulpaPC').style.visibility = 'visible';
    clearInterval(moveIntervalID);
    for (Tulpa in pcTulpas) {
            let tulpa = pcTulpas[Tulpa];
            if (tulpa.name != "") {
        html += '<div style="display:block;margin-bottom:5px;"><div class="' + tulpa.name + '"></div><br>' +
        '<div class="LP_Bar">' +
        '<div class="LP_Fill" style="width:' + Math.round((tulpa.HP / tulpa.HP_Total) * 100) + '%"></div>' +
        '<div class="TulpaPC_01">' + "</br>" + pcTulpas[Tulpa].name + " " + "Level: " + pcTulpas[Tulpa].Lv + '</div>' ;
        '</div>'
        //'<button class="Change_Tulpa" onclick="swapTulpa(\'' + Slot + '\');Click()">🔄️</button>' +
        //'<button class="Delete_Tulpa" onclick="removeTulpa(\'' + Slot + '\');Click()">🗑️</button></div>';
      }
}        
    document.getElementById('TulpaPC_List').innerHTML = html;
        //console.log(pcTulpas)
}
function close_Tulpa_PC() {
    document.getElementById('TulpaPC').style.visibility = 'hidden';
    moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
}