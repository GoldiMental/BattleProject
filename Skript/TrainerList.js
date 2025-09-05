const TrainerList = {
    Trainer000: {
        name: "Steve",
        text1: "Warte mal kurz. Wo willst du hin?",
        text2: "Ohne Tulpa wirst du sterben!",
        text3: "Geh am besten zu Professor Troy",
        text4: "Er braucht immer Hilfe bei der Forschung",
        text5: "Vielleicht kann er auch dir helfen...",
    },
    Trainer001: {
        name: "Laura",
        text1: "Hallo, ich bin Lady Laura.",
        text2: "Ich bin Trainerin und fordere Dich zum Kampf heraus!",
        text3: "Hehehe...",
        text4: "",
        gold: 150,
        Tulpa1: { name: "Kaninchen", Lv: 8, HP: 70, HP_Total: 70 },
        Tulpa2: { name: "Hase", Lv: 10, HP: 90, HP_Total: 90 },
        Tulpa3: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa4: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa5: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa6: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        picture: "Trainer_02",
    },
    Trainer002: {
        name: "Pascal",
        text1: "Halt Stop !!",
        text2: "Ich bin Hundetrainer Pascal!!",
        text3: "Du und ich kämpfen jetzt!!!",
        text4: "SOFORT!!!!!!!",
        gold: 250,
        Tulpa1: { name: "Wachhund", Lv: 12, HP: 90, HP_Total: 90 },
        Tulpa2: { name: "Schutzhund", Lv: 15, HP: 105, HP_Total: 105 },
        Tulpa3: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa4: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa5: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa6: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
    },
}
async function Trainer000monolog(Trainer) {
    TrainerDialogBox = document.getElementsByClassName("TrainerDialogBox")[0];
    TrainerDialogBox.innerHTML = Trainer.text1; clearInterval(moveIntervalID);
    TrainerDialogBox.classList.toggle("hidethis", false); await Click();
    TrainerDialogBox.innerHTML = Trainer.text2; await Click();
    TrainerDialogBox.innerHTML = Trainer.text3; await Click();
    TrainerDialogBox.innerHTML = Trainer.text4; await Click();
    TrainerDialogBox.innerHTML = Trainer.text5; await Click();
    TrainerDialogBox.classList.toggle("hidethis", true);
    moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
    activeDirection = "a"; moveMap(); await Delay(100);
    activeDirection = null; stopMovement();
}