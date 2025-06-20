const Professor = {
    name: "Professor Troy",
    Dialog1: {
        text1: "Willkommen, junger Trainer. Die Welt der Tulpas ist voller Rätsel und du stehst ganz am Anfang",
        text2: "Du hast noch keinen Tulpa? Keine Sorge… hier, nimm diesen.",
        text3: "Er wird dein erster Begleiter sein. Behandelt euch gut, ihr werdet ein starkes Team. Viel Glück auf deiner Reise. Die Welt wartet auf dich!",
    }

};

async function Professor001monolog() {
    TrainerDialogBox = document.getElementsByClassName("TrainerDialogBox")[0];
    clearInterval(moveIntervalID);
    TrainerDialogBox.style.visibility = "visible";
    TrainerDialogBox.innerHTML = Professor.Dialog1.text1;
    await Delay(100);
    await Click();
    if (Professor.Dialog1.text2 != ""){
        TrainerDialogBox.innerHTML = Professor.Dialog1.text2;
        await Click();
        if (Professor.Dialog1.text3 != ""){
            TrainerDialogBox.innerHTML = Professor.Dialog1.text3;
            await Click();
        }
    }
    moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
    TrainerDialogBox.style.visibility = "hidden";
};

