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
    },
};

async function Professor001monolog() {
    const box = document.getElementsByClassName("TrainerDialogBox")[0];
    document.getElementById("ProfessorButton").style.visibility = "hidden";
    clearInterval(moveIntervalID);
    box.style.visibility = "visible";
    if (!Player.tulpaGegeben) {
        box.innerHTML = Professor.Dialog1.text1;
        await Delay(100); await Click();
        box.innerHTML = Professor.Dialog1.text2;
        await Click();
        box.innerHTML = Professor.Dialog1.text3;
        await Click();
        box.innerHTML = Professor.Dialog1.text4;
        await Click();
        box.innerHTML = Professor.Dialog1.text5;
        await Click();
        box.innerHTML = Professor.Dialog1.text6;
        await Click();
        box.innerHTML = Professor.Dialog1.text7;
        await Click();
        box.innerHTML = "Also los geht die Reise!<br>Viel Erfolg, "+Player.name+"!";
        await Click();
        Player.Tulpas.Slot_1 = { name: "Kaninchen", Lv: 5, HP: 65, HP_Total: 65, XP: 0 };
        Player.tulpaGegeben = true;
        setCookie("PlayerData", JSON.stringify(Player), 30);
    } else {
        box.innerHTML = "Ich habe dir bereits alles gegeben, was du aktuell benötigst. Geh nun hinaus, und hilf mir, die Geheimnisse der Tulpas zu erforschen.";
        await Delay(100); await Click();
    }
    box.style.visibility = "hidden";
    moveIntervalID = setInterval(() => activeDirection && moveMap(), moveInterval);
    document.getElementById("ProfessorButton").style.visibility = "visible";
}
