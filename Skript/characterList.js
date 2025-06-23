const Professor = {
    name: "Professor Troy",
    Dialog1: {
        text1: "Willkommen, junger Trainer. Die Welt der Tulpas ist voller Rätsel und du stehst ganz am Anfang",
        text2: "Du hast noch keinen Tulpa? Keine Sorge… hier, nimm diesen.",
        text3: "Er wird dein erster Begleiter sein. Behandelt euch gut, ihr werdet ein starkes Team. Viel Glück auf deiner Reise. Die Welt wartet auf dich!",
    },
    Tulpas: {
        Tulpa1: { name: "Kaninchen", Lv: 8, HP: 70, HP_Total: 70 },
    }

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

        Player.Tulpas.Slot_1 = { name: "Kaninchen", Lv: 8, HP: 70, HP_Total: 70, XP: 0 };
        Player.tulpaGegeben = true;
        setCookie("PlayerData", JSON.stringify(Player), 30);
    } else {
        box.innerHTML = "Ich habe dir bereits deinen ersten Tulpa gegeben. Geh nun hinaus, und hilf mir, die Geheimnisse der Tulpas zu erforschen.";
        await Delay(100); await Click();
    }

    box.style.visibility = "hidden";
    moveIntervalID = setInterval(() => activeDirection && moveMap(), moveInterval);
    document.getElementById("ProfessorButton").style.visibility = "visible";
        }
