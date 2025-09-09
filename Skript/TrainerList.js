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
        text2: "Ich bin eine Trainerin und fordere Dich zum Kampf heraus!",
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
        picture: "",
    },
    Trainer003: {
        name: "Rocky",
        text1: "Ein Häschensammler fordert dich heraus!",
        text2: "Du wirst meine geballte Erfahrung zu spüren bekommen!",
        text3: "Meine Tulpa sind topfit mach dich bereit!",
        text4: "Ich verliere nie gegen Neulinge wie dich!",
        text5: "Zeit für ein kleines Training und du bist mein Übungsgegner!",
        gold: 250,
        Tulpa1: { name: "Wachhund", Lv: 12, HP: 90, HP_Total: 90 },
        Tulpa2: { name: "Schutzhund", Lv: 15, HP: 105, HP_Total: 105 },
        Tulpa3: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa4: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa5: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa6: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        picture: "",
    },
    Trainer004: {
        name: "Piekso",
        text1: "Wen haben wir denn da....!!",
        text2: "Ich habe schon lange auf einen starken Gegner gewartet.",
        text3: "Du kannst so lange nicht gegen Rachel Kämpfen bevor du nicht mich und Rocky Besiegt hast",
        text4: "Deshalb lass uns nicht lange Quatschen und direkt zum Wesentlichen kommen.!",
        gold: 250,
        Tulpa1: { name: "Wachhund", Lv: 12, HP: 90, HP_Total: 90 },
        Tulpa2: { name: "Schutzhund", Lv: 15, HP: 105, HP_Total: 105 },
        Tulpa3: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa4: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa5: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa6: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        picture: "",
    },
    ArenaLeiter001: {
        name: "Rachel",
        text1: "Okay Okay... wie ich sehe hast du meine Arena Trainer besiegt.!",
        text2: "Ich bin Rachel, ",
        text3: "Arena Leiterin von der Hohen Wiese!!",
        text4: "In meiner Arena zählt Mut mehr als Stärke!",
        text5: "Wenn du meine/n .... willst , dann zeig mir, was du kannst.!",
        text6: "Mach dich bereit.! ",
        btext: "Haha, Du schwächling, willst dich mit mir Messen?",
        btext1:"Besiege erstmal meine Arena Trainer Rocky und Piekso.",
        btext2:"Danach können wir weiter Reden. Tschau...!",
        direction: "d",
        gold: 250,
        Tulpa1: { name: "Wachhund", Lv: 12, HP: 90, HP_Total: 90 },
        Tulpa2: { name: "Schutzhund", Lv: 15, HP: 105, HP_Total: 105 },
        Tulpa3: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa4: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa5: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        Tulpa6: { name: "", Lv: 0, HP: 0, HP_Total: 0 },
        picture: "",
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

async function ArenaMonolog(arenaName) {
    TrainerDialogBox = document.getElementsByClassName("TrainerDialogBox")[0];
    TrainerDialogBox.innerHTML = arenaName.btext; clearInterval(moveIntervalID);
    TrainerDialogBox.classList.toggle("hidethis", false);  await Click();
    TrainerDialogBox.innerHTML = arenaName.btext1; await Click();
    TrainerDialogBox.innerHTML = arenaName.btext2; await Click();
    TrainerDialogBox.classList.toggle("hidethis", true);
    moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
    activeDirection = arenaName.direction; moveMap(); await Delay(100);
    activeDirection = null; stopMovement();
}