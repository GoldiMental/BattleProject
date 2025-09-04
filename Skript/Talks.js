function ProfTalk_1() {
    console.log('Gespräch 1 mit Prof');
    document.getElementById("Professor").innerHTML = '<button id="ProfessorButton" onclick="ProfTalk_2()"> </button>';
}

function ProfTalk_2() {
    console.log('Gespräch 2 mit Prof');
}

async function starteTutorial() {
    console.log("Tutorial wird gestartet...");let msg ="Herzlich Willkommen Trainer " + Player.name; await Delay(100);
    await showCustomConfirm(msg); await Delay(100);
    await showCustomConfirm('Ich hoffe Du bist gut vorbereitet. Wenn nicht, sieh Dir gerne mal die "TulpaKing Info & Impressum"-Seite an.'); await Delay(100);
    await showCustomConfirm('Für Probleme wende dich bitte an: goldimental@gmx.de'); await Delay(100);
    await showCustomConfirm('Vergiss nicht regelmäßig zu speichern! 😉\n\nViel Spaß beim Spielen'); await Delay(100);
    movementGame.classList.toggle("hidethis", false);
    console.log(movementGame);
}