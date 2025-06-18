document.addEventListener('DOMContentLoaded', () => {
    if (Player.name == "") {
        let antwort = "";
        alert("Herzlich Willkommen!\nIch bin Prof. Troy und werde dich auf dem Weg zum Tulpa-King begleiten und unterstützen.\n\nAber zuerst möchte ich wissen, wie ich dich nennen soll.");
        while (true) {
            antwort = prompt("Wie heißt du?", "Max Mustermann");
            if (antwort === null || antwort.trim() === "") {
                alert("Du musst mir schon sagen, wie Du heißt.");
                continue;
            }
            if (/^[a-zA-Z. ]+$/.test(antwort)) {
                Player.name = antwort;
                setCookie("PlayerData", JSON.stringify(Player), 30);
                alert("Hallo: " + Player.name + "!\nMit den Tasten \"W,A,S,D\" kannst du deinen Charakter in die jeweilige Richtung laufen lassen.\nAlles weitere kannst du mit deiner Maus anklicken.\nWeiteres erfährst du, wenn es soweit ist.");
                break;
            } else {
                alert("Ein Name besteht doch gewöhnlich nur aus Buchstaben.\n\nZahlen und Sonderzeichen machen daher keinen Sinn.");
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('bg01-sound').volume = 0.1;
    document.getElementById('bg02-sound').volume = 0.1;
    document.getElementById('bg03-sound').volume = 0.1;
    document.getElementById('bgr01-sound').volume = 0.1;
    document.getElementById('bgr02-sound').volume = 0.1;
    document.getElementById('alarm-sound').volume = 0.1;
    document.getElementById('win-sound').volume = 0.1;
    const startMusik = () => {
        document.getElementById('bg03-sound').play();
        document.removeEventListener('click', startMusik);
        document.removeEventListener('mousedown', startMusik);
        document.removeEventListener('keydown', startMusik);
        document.removeEventListener('touchstart', startMusik);
    }
    document.addEventListener('click', startMusik);
    document.addEventListener('mousedown', startMusik);
    document.addEventListener('keydown', startMusik);
    document.addEventListener('touchstart', startMusik);
});

function Click() {
    document.getElementById('click-sound').play();
    return new Promise(resolve => {
        document.addEventListener("click", function handler() {
            document.removeEventListener("click", handler);
            resolve();
        });
    });
}