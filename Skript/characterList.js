const Professor = {
    name: "Professor Troy",
    Dialog1: {
        text1: "Willkommen, junger Trainer. Die Welt der Tulpas ist voller Rätsel und Du stehst noch ganz am Anfang.",
        text2: "Ich bin Professor Troy, der wohl bekannteste Forscher in Sachen Tulpas!",
        text3: "Ich sehe Du hast noch kein Tulpa...<br>Keine Sorge...",
        text4: "Ich habe hier noch ein kleines Kaninchen, welches ich Dir sogar schenken werde.",
        text5: "Es wird dein erster Begleiter sein. Behandele es gut und Ihr werdet ein starkes Team.",
        text6: "Fang an zu trainieren und melde dich ab und zu, damit ich eure Entwicklung verfolgen kann.",
        text7: "Weiter westlich von hier, findest du einen kleinen Shop. Vielleicht siehst du mal vorbei, ob es etwas nützliches gibt.",
        text8: "In einem Shop kannst du deine Tulpas auch kostenlos heilen lassen.",
    },
};

async function Professor001monolog() {
    const box = document.getElementsByClassName("TrainerDialogBox")[0];
    document.getElementById("ProfessorButton").classList.toggle("hidethis", true);
    clearInterval(moveIntervalID);
    box.classList.toggle("hidethis", false);
    if (!Player.tulpaGegeben) {
        box.innerHTML = Professor.Dialog1.text1; await Delay(300); await Click();
        box.innerHTML = Professor.Dialog1.text2; await Delay(300); await Click();
        box.innerHTML = Professor.Dialog1.text3; await Delay(300); await Click();
        box.innerHTML = Professor.Dialog1.text4; await Delay(300); await Click();
        box.innerHTML = Professor.Dialog1.text5; await Delay(300); await Click();
        box.innerHTML = "Hier... Bitte schön..."; document.getElementById('win-sound').play(); await Delay(2500); await Click();
        box.innerHTML = Professor.Dialog1.text6; await Delay(300); await Click();
        box.innerHTML = Professor.Dialog1.text7; await Delay(300); await Click();
        box.innerHTML = Professor.Dialog1.text8; await Delay(300); await Click();
        box.innerHTML = "Also los! Deine Reise beginnt...<br>Viel Erfolg, "+Player.name+"!"; await Delay(300); await Click();
        Player.Tulpas.Slot_1 = { name: "Kaninchen", Lv: 10, HP: 100, HP_Total: 100, XP: 5000 };
        Player.questLine.tulpaGegeben = true;
    } else {
        box.innerHTML = "Ich habe dir bereits alles gegeben, was du aktuell benötigst. Geh nun hinaus, und hilf mir, die Geheimnisse der Tulpas zu erforschen."; await Delay(300); await Click();
    }
    box.classList.toggle("hidethis", true);
    moveIntervalID = setInterval(() => activeDirection && moveMap(), moveInterval);
    document.getElementById("ProfessorButton").classList.toggle("hidethis", false);
    toggleClassElement("TrainerText", true);
}
