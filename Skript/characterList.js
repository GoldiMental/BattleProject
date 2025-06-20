const Professor = {

ProffesorTroy: {
        name: "Professor Troy",
        text1: "Willkommen, junger Trainer. Die Welt der Tulpas ist voller Rätsel und du stehst ganz am Anfang",
        text2: "Du hast noch keinen Tulpa? Keine Sorge… hier, nimm diesen.",
        text3: "Er wird dein erster Begleiter sein. Behandelt euch gut, ihr werdet ein starkes Team. Viel Glück auf deiner Reise. Die Welt wartet auf dich!",
    }
};




// Funktion, um den Dialog anzuzeigen
async function characterDialog(character) {
    const dialogBox = document.getElementsByClassName("TrainerDialogBox")[0];
    dialogBox.style.visibility = "visible";
    for (let text of character.text) {
        dialogBox.innerHTML = text;
        await Delay(2000); // 2 Sekunden warten
    }
    dialogBox.style.visibility = "hidden";
}

// Beispielhafte Spieler- und Professor-Positionen
let player = { x: 5, y: 5 };
let professor = { x: 7, y: 5 };

// Funktion prüft, ob Spieler nah genug ist
function isNearProfessor(player, professor) {
    // Abstand berechnen (hier: einfache Entfernung)
    const distance = Math.abs(player.x - professor.x) + Math.abs(player.y - professor.y);
    return distance <= 1; // 1 Feld Abstand
}

// Diese Funktion wird z.B. bei jeder Spielerbewegung aufgerufen
function onPlayerMove(newX, newY) {
    player.x = newX;
    player.y = newY;
    if (isNearProfessor(player, professor)) {
        characterDialog(Professor.ProffesorTroy);
    }
}

// Beispiel: Spieler bewegt sich auf (7,5) -> Dialog startet
onPlayerMove(7, 5);