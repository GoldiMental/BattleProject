function battle(){
    document.getElementById("movement_game").style.visibility = "hidden";
    document.getElementById("battle_game").style.visibility = "visible";
    clearInterval(moveIntervalID);
}