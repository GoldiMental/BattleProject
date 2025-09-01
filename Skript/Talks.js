function ProfTalk_1(){
    console.log('Gespräch 1 mit Prof');
    document.getElementById("Professor").innerHTML = '<button id="ProfessorButton" onclick="ProfTalk_2()"> </button>';
}

function ProfTalk_2(){
    console.log('Gespräch 2 mit Prof');
}

async function starteTutorial(){
    console.log("Tutorial wird gestartet...");
    await showCustomConfirm("Herzlich Willkommen Trainer ",Player.name);
    await showCustomConfirm('Ich hoffe Du bist gut vorbereitet. Wenn nicht, sieh Dir gerne mal die "TulpaKing Info & Impressum"-Seite an.');
    await showCustomConfirm('Für Probleme wende dich bitte an: goldimental@gmx.de');
}