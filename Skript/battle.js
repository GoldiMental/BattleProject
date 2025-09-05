let trainer = {};
let TulpaIndex = "Tulpa1";
let trainerbattle = 0;
let tulpa_HP = 0;
let tulpa_HP_Total = 0;
let tulpa_opp = "";
let tulpa_lv = 0;
let tulpa_self;

async function traineranimation(Trainer, name) {
    console.log("Führe traineranimation(", Trainer, name, ") aus...");
    trainer = Trainer;
    TrainerDialogBox = document.getElementsByClassName("TrainerDialogBox")[0];
    TrainerDialogBox.setAttribute("TrainerID", name);
    TrainerDialogBox.classList.toggle("hidethis", false);
    TrainerDialogBox.innerHTML = Trainer.text1; await Click();
    if (Trainer.text2 != "") {
        TrainerDialogBox.innerHTML = Trainer.text2; await Click();
        if (Trainer.text3 != "") {
            TrainerDialogBox.innerHTML = Trainer.text3; await Click()
            if (Trainer.text4 != "") {
                TrainerDialogBox.innerHTML = Trainer.text4; await Click();
                TrainerDialogBox.classList.toggle("hidethis", true);
                trainerbattle = 1; battleanimation(1);
            } else {
                TrainerDialogBox.classList.toggle("hidethis", true);
                trainerbattle = 1; battleanimation(1);
            }
        } else {
            TrainerDialogBox.classList.toggle("hidethis", true);
            trainerbattle = 1; battleanimation(1);
        }
    } else {
        TrainerDialogBox.classList.toggle("hidethis", true);
        trainerbattle = 1; battleanimation(1);
    }
}

async function battleanimation(trainerbattle) {
    console.log("Führe battleanimation(", trainerbattle, ") aus...");
    console.log("Ändere Sound...");
    document.getElementById('bg03-sound').pause();
    document.getElementById('bg03-sound').currentTime = 0;
    document.getElementById('alarm-sound').play();
    for (i = 0; i < 15; i++) {
        await Delay(80);
        document.getElementById("movement_game").classList.toggle("hidethis");
    }
    document.getElementById('bgr02-sound').play();
    console.log("Trainerbattle?")
    if (trainerbattle == 0) { console.log("!Trainerbattle => battle()"); battle(); }
    else { console.log('Trainerbattle => Trainerbattle("Tulpa1")'); Trainerbattle("Tulpa1"); }
}

async function Trainerbattle(TulpaIndex) {
    console.log("Führe Trainerbattle(", TulpaIndex, ") aus...");
    let battleInfo = document.getElementById('battle_text');
    tulpa_opp = trainer[TulpaIndex].name;
    tulpa_lv = trainer[TulpaIndex].Lv;
    if (TulpaIndex == "Tulpa1") {
        for (Slot in Player.Tulpas) {
            if (Slot.startsWith("Slot")) {
                if (Player.Tulpas[Slot].HP > 0) { tulpa_self = Player.Tulpas[Slot]; break; }
            }
        }
        document.getElementById("movement_game").classList.toggle("hidethis", true);
        document.getElementById("battle_game").classList.toggle("hidethis", false);
        document.getElementById("battle_menu").classList.toggle("hidethis", false);
        document.getElementById('Tulpa-self').innerHTML = '<div class="self_Back"></div>';
        document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%";
        tulpa_HP = trainer[TulpaIndex].HP + (tulpa_lv * 3);
        tulpa_HP_Total = trainer[TulpaIndex].HP_Total + (tulpa_lv * 3);
        document.getElementById('fill-opp').style.width = Math.round(tulpa_HP / tulpa_HP_Total * 100) + "%";
        battleInfo.innerText = "" + trainer.name + " schickt " + tulpa_opp + " Lv. " + tulpa_lv + " in den Kampf!";
        document.getElementById('Name-opp').innerHTML = tulpa_opp + " Lv. " + tulpa_lv;
        document.getElementById('Tulpa-opp').innerHTML = '<div class="' + tulpa_opp + '_Front"></div>';
        document.getElementById('Tulpa-opp').style.right = "10px";
        document.getElementById('Name-opp').style.opacity = "1";
        document.getElementById('LP-opp').style.opacity = "1";
        console.log("Tulpa: ", tulpa_opp, " Level: ", tulpa_lv, " HP: ", tulpa_HP);
        await Delay(2000);
        document.getElementById('Tulpa-self').style.left = "-500px";
        await Delay(500);
        document.getElementById('Tulpa-self').innerHTML = '<div class="' + tulpa_self.name + '_Back"></div>';
        document.getElementById('Tulpa-self').style.left = "10px";
        document.getElementById('Name-self').innerHTML = tulpa_self.name + " Lv. " + tulpa_self.Lv;
        document.getElementById('Name-self').style.opacity = "1";
        document.getElementById('LP-self').style.opacity = "1";
        console.log("Trainerbattle(", TulpaIndex, ") ✅");
    } else {
        document.getElementById("battle_menu").classList.toggle("hidethis", false);
        tulpa_HP = trainer[TulpaIndex].HP + (tulpa_lv * 3);
        tulpa_HP_Total = trainer[TulpaIndex].HP_Total + (tulpa_lv * 3);
        document.getElementById('fill-opp').style.width = Math.round(tulpa_HP / tulpa_HP_Total * 100) + "%";
        battleInfo.innerText = "" + trainer.name + " schickt " + Tulpas[tulpa_opp].name + " Lv. " + tulpa_lv + " in den Kampf!";
        console.log("Tulpa: ", tulpa_opp, " Level: ", tulpa_lv, " HP: ", tulpa_HP);
        await Delay(500);
        document.getElementById('Name-opp').innerHTML = Tulpas[tulpa_opp].name + " Lv. " + tulpa_lv;
        document.getElementById('Tulpa-opp').innerHTML = '<div class="' + tulpa_opp + '_Front"></div>';
        document.getElementById('Tulpa-opp').style.right = "10px";
        document.getElementById('Name-opp').style.opacity = "1";
        document.getElementById('LP-opp').style.opacity = "1";
        document.getElementById('Name-self').style.opacity = "1";
        document.getElementById('LP-self').style.opacity = "1";
        console.log("Trainerbattle(", TulpaIndex, ") ✅");
    }
}

async function battle() {
    console.log("Führe battle() aus...");
    let battleInfo = document.getElementById('battle_text');
    console.log("Ermittele Tulpa...");
    let zufall = Math.round(Math.random() * (maps[Player.actualMap].battleMaps[lastArea].opp_List.length - 1));
    tulpa_opp = maps[Player.actualMap].battleMaps[lastArea].opp_List[zufall];
    tulpa_lv = Math.round((Math.random() + 1) * (maps[Player.actualMap].battleMaps[lastArea].maxLv - 1));
    console.log("Tulpa:", tulpa_opp);
    console.log("Level:", tulpa_lv);
    for (Slot in Player.Tulpas) {
        if (Slot.startsWith("Slot")) {
            if (Player.Tulpas[Slot].HP > 0) { tulpa_self = Player.Tulpas[Slot]; break; }
        }
    }
    document.getElementById("movement_game").classList.toggle("hidethis", true);
    document.getElementById("battle_game").classList.toggle("hidethis", false);
    document.getElementById('Tulpa-self').innerHTML = '<div class="self_Back"></div>';
    document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%";
    tulpa_HP = Tulpas[tulpa_opp].HP_Total + (tulpa_lv * 3);
    console.log("Gegnerische HP:", Tulpas[tulpa_opp].HP_Total, "+", (tulpa_lv * 3), "=", tulpa_HP);
    tulpa_HP_Total = Tulpas[tulpa_opp].HP_Total + (tulpa_lv * 3);
    document.getElementById('fill-opp').style.width = Math.round(tulpa_HP / tulpa_HP_Total * 100) + "%";
    battleInfo.innerText = "Ein wildes " + Tulpas[tulpa_opp].name + " Lv. " + tulpa_lv + " greift an!";
    document.getElementById('Name-opp').innerHTML = Tulpas[tulpa_opp].name + " Lv. " + tulpa_lv;
    document.getElementById('Tulpa-opp').innerHTML = '<div class="' + tulpa_opp + '_Front"></div>';
    document.getElementById('Tulpa-opp').style.right = "10px";
    document.getElementById('Name-opp').style.opacity = "1";
    document.getElementById('LP-opp').style.opacity = "1";
    await Delay(2000);
    document.getElementById('Tulpa-self').style.left = "-500px"; await Delay(500);
    document.getElementById('Tulpa-self').innerHTML = '<div class="' + tulpa_self.name + '_Back"></div>';
    document.getElementById('Tulpa-self').style.left = "10px";
    document.getElementById("battle_menu").classList.toggle("hidethis", false);
    document.getElementById('Name-self').innerHTML = Tulpas[tulpa_self.name].name + " Lv. " + tulpa_self.Lv;
    document.getElementById('Name-self').style.opacity = "1";
    document.getElementById('LP-self').style.opacity = "1";
    console.log("battle() ✅");
}

async function escape() {
    console.log("Führe escape() aus...");
    document.getElementById('change_tulpa').classList.toggle("hidethis", true);
    document.getElementById('battle_game_menu').classList.toggle("hidethis", true);
    document.getElementById('use_item').classList.toggle("hidethis", true);
    document.getElementById('escape').disabled = true;
    let zufall = Math.round(Math.random() * 100);
    console.log("Berechnete Chance: ", zufall, ">=", 20, " => ", zufall >= 20);
    if (zufall >= 20 && trainerbattle == 0) {
        console.log("Bringe Spieler zurück auf die Karte...");
        document.getElementById('battle_text').innerText = "Flucht erfolgreich!";
        document.getElementById('bgr02-sound').pause();
        document.getElementById('bgr02-sound').currentTime = 0;
        document.getElementById('win-sound').play(); await Delay(3500);
        document.getElementById('bg03-sound').play();
        document.getElementById("movement_game").classList.toggle("hidethis", false);
        document.getElementById("battle_game").classList.toggle("hidethis", true);
        document.getElementById("battle_menu").classList.toggle("hidethis", true);
        document.getElementById('escape').disabled = false;
        document.getElementById('Name-opp').style.opacity = "0";
        document.getElementById('LP-opp').style.opacity = "0";
        document.getElementById('Name-self').style.opacity = "0";
        document.getElementById('LP-self').style.opacity = "0";
        trainerbattle = 0;
        console.log("escape() ✅");
        moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
    } else if (trainerbattle == 0) {
        console.warn("!Flucht => opp_Attack()");
        document.getElementById('battle_text').innerText = "Mist! Das hat nicht funktioniert";
        await Delay(1000);
        document.getElementById('escape').disabled = false;
        opp_Attack();
    } else {
        console.warn("catched escape()-ERROR: trainerbattle => escape() stoppen");
        document.getElementById('battle_text').innerText = "Ich kann mich doch nicht vor so einer Herausforderung drücken!";
        await Delay(1000);
        document.getElementById('escape').disabled = false;
    }
}

async function opp_Attack() {
    console.log("Führe opp_Attack() aus...");
    document.getElementById("battle_menu").classList.toggle("hidethis", true);
    let zufall = Math.round((Math.random()) * 4);
    let attack = Tulpas[tulpa_opp.toString()].attacks[zufall];
    if (attack == "-" || attack == undefined) {
        console.warn("catched opp_Attack()-ERROR: Attack = ", attack, " => restart opp_Attack()...");
        opp_Attack(); return;
    }
    document.getElementById('battle_text').innerText = tulpa_opp + " setzt " + attack + " ein.";
    document.getElementById('attack-sound').play(); await Delay(350);
    document.getElementById('Tulpa-opp').style.right = "50px"; await Delay(200);
    document.getElementById('Tulpa-opp').style.right = "10px"; await Delay(1000);
    let dmg = Attacks[attack].ATK_Power + (tulpa_lv * 2) * (Tulpas[tulpa_opp].ANG / Tulpas[tulpa_self.name].VER);
    tulpa_self.HP -= Math.round(dmg);
    console.log("Berechne Schaden:", Attacks[attack].ATK_Power, "+", tulpa_lv * 2, "*", Tulpas[tulpa_opp].ANG, "/", Tulpas[tulpa_self.name].VER, "=", Math.round(dmg)); // Log für Gegnerschaden
    if (tulpa_self.HP > 0) {
        console.log("Tulpa des Spieler bleibt am Leben.");
        document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%"; await Delay(300);
        document.getElementById("battle_menu").classList.toggle("hidethis", false);
    } else {
        console.warn("catched opp_Attach()-ERROR: Player-Tulpa-HP:", tulpa_self.HP, " => ()...");
        tulpa_self.HP = 0;
        document.getElementById('battle_text').innerText = "Dein Tulpa ist kampfunfähig!";
        document.getElementById('fill-self').style.width = "0%";
        let tulpa_list = 0;
        for (Slot in Player.Tulpas) {
            if (Slot.startsWith('Slot')) {
                let tulpa = Player.Tulpas[Slot];
                if (tulpa.name != "" && tulpa.HP > 0) { tulpa_list += 1; }
            }
        };
        if (tulpa_list > 0) {
            console.log("Kampffähige Tulpa gefunden! => changeTulpa()...");
            changeTulpa(); tulpa_list = 0;
        } else {
            console.warn("catched opp_Attack()-ERROR: No Tulpa found: tulpa_list = ", tulpa_list, " => ()...");
            document.getElementById('battle_text').innerText = "Du hast kein kampffähiges Tulpa mehr zur Verfügung";
            await Delay(1500);
            document.getElementById('bgr02-sound').pause();
            document.getElementById('bgr02-sound').currentTime = 0;
            document.getElementById('battle_text').innerText = "Du wurdest ohnmächtig!";
            await Delay(1500);
            for (Slot in Player.Tulpas) {
                if (Slot.startsWith('Slot')) {
                    let tulpa = Player.Tulpas[Slot];
                    if (tulpa.name != "") {
                        tulpa.HP = tulpa.HP_Total;
                    }
                }
            };
            console.log("Tulpas geheilt ✅");
            document.getElementById('bg03-sound').play();
            document.getElementById("movement_game").classList.toggle("hidethis", true);
            document.getElementById("battle_game").classList.toggle("hidethis", true);
            document.getElementById("battle_menu").classList.toggle("hidethis", true);
            document.getElementById("GameOver").classList.toggle("hidethis", false); await Delay(500)
            document.getElementById("Countdown").innerHTML = "Notruf wählen"; await Delay(500)
            document.getElementById("Countdown").innerHTML = "Notruf wählen."; await Delay(500)
            document.getElementById("Countdown").innerHTML = "Notruf wählen.."; await Delay(500)
            document.getElementById("Countdown").innerHTML = "Notruf wählen..."; await Delay(800);
            document.getElementById("Countdown").innerHTML = ""; await Delay(1000);
            document.getElementById("Countdown").innerHTML = "Transport nach Hause"; await Delay(500);
            document.getElementById("Countdown").innerHTML = "Transport nach Hause."; await Delay(500);
            document.getElementById("Countdown").innerHTML = "Transport nach Hause.."; await Delay(500)
            document.getElementById("Countdown").innerHTML = "Transport nach Hause..."; await Delay(800)
            document.getElementById("Countdown").innerHTML = "WACH AUF!!!"; await Delay(500);
            meinEingang();
            document.getElementById("GameOver").classList.toggle("hidethis", true);
            document.getElementById('Name-opp').style.opacity = "0";
            document.getElementById('LP-opp').style.opacity = "0";
            document.getElementById('Name-self').style.opacity = "0";
            document.getElementById('LP-self').style.opacity = "0";
            trainerbattle = 0;
            moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
        }
    }
}

function fight() {
    console.log("Führe fight() aus...");
    document.getElementById('change_tulpa').classList.toggle("hidethis", true);
    document.getElementById('battle_game_menu').classList.toggle("hidethis", true);
    document.getElementById('use_item').classList.toggle("hidethis", true);
    document.getElementById("battle_menu").classList.toggle("hidethis", true);
    document.getElementById("attack_menu").classList.toggle("hidethis", false);
    document.getElementById("Attack_1").innerHTML = Tulpas[tulpa_self.name].attacks[1];
    document.getElementById("Attack_2").innerHTML = Tulpas[tulpa_self.name].attacks[2];
    document.getElementById("Attack_3").innerHTML = Tulpas[tulpa_self.name].attacks[3];
    document.getElementById("Attack_4").innerHTML = Tulpas[tulpa_self.name].attacks[4];
    console.log("fight() ✅");
}

async function self_attack(attack) {
    console.log("Führe self_attack(", attack, ") aus...");
    if (attack != "-") {
        document.getElementById("attack_menu").classList.toggle("hidethis", true);
        let dmg = Attacks[attack].ATK_Power + (tulpa_self.Lv * 2) * (Tulpas[tulpa_self.name].ANG / Tulpas[tulpa_opp].VER);
        console.log("Berechneter Schaden des Spielers:", Attacks[attack].ATK_Power, "+", tulpa_self.Lv * 2, "*", Tulpas[tulpa_self.name].ANG, "/", Tulpas[tulpa_opp].VER, "=", Math.round(dmg)); //Log für Spielerschaden
        document.getElementById('battle_text').innerText = Tulpas[tulpa_self.name].name + " setzt " + attack + " ein.";
        document.getElementById('attack-sound').play(); await Delay(350);
        document.getElementById('Tulpa-self').style.left = "50px"; await Delay(200);
        document.getElementById('Tulpa-self').style.left = "10px"; await Delay(1000);
        console.log("Berechne Tulpa-HP: ", tulpa_HP, " - ", Math.round(dmg), " = ");
        tulpa_HP -= Math.round(dmg);
        console.log(tulpa_HP);
        if (tulpa_HP > 0) {
            console.log("Gegner bleibt am Leben. HP: ", tulpa_HP, " => opp_Attack()");
            document.getElementById('fill-opp').style.width = Math.round(tulpa_HP / tulpa_HP_Total * 100) + "%";
            await Delay(1500); opp_Attack();
        } else {
            console.log("Tulpa wurde besiegt. HP: ", tulpa_HP, " => Berechne EXP...");
            document.getElementById('fill-opp').style.width = "0%";
            document.getElementById('battle_text').innerText = "Du hast " + tulpa_opp + " besiegt!";
            if (trainerbattle == 1) { trainer[TulpaIndex] = { name: "", Lv: 0, HP: 0, HP_Total: 0 }; }; await Delay(500);
            document.getElementById('Tulpa-opp').style.right = "-500px";
            document.getElementById('bgr02-sound').pause();
            document.getElementById('bgr02-sound').currentTime = 0;
            document.getElementById('win-sound').play(); await Delay(2000);
            document.getElementById('bg03-sound').play(); await Delay(500);
            let exp = Math.round((25 * tulpa_lv) * ((8 + Math.random() * 4)) / 10);
            if (tulpa_lv > tulpa_self.Lv) { exp *= 2; };
            document.getElementById('battle_text').innerText = "Du hast " + exp + " EXP. erhalten!";
            console.log("XP vorher: ", tulpa_self.XP, " XP nachher:", tulpa_self.XP, "+", exp, "="); //EXP-Berechnung
            tulpa_self.XP += exp;
            console.log(tulpa_self.XP, " => Prüfe auf Level-Up...");
            console.log("Prüfung Level-Up: ", tulpa_self.XP, ">=", (25 * (tulpa_self.Lv + 1)) * (2 * (tulpa_self.Lv + 1)), "? Ergebnis: ", tulpa_self.XP >= (25 * (tulpa_self.Lv + 1)) * (2 * (1 + tulpa_self.Lv))); //Level-Up-Prüfung
            if (tulpa_self.XP >= (25 * (tulpa_self.Lv + 1) * (2 * (tulpa_self.Lv + 1)))) {
                tulpa_self.Lv = Math.floor(Math.sqrt(tulpa_self.XP / 25 / 2));
                tulpa_self.HP = Tulpas[tulpa_self.name].HP + (3 * tulpa_self.Lv);
                tulpa_self.HP_Total = tulpa_self.HP;
                await Delay(1000);
                console.log("Level-Up ✅ => Ändere Status des Tulpas...");
                console.log("Neues Level: ", tulpa_self.Lv, " HP:", tulpa_self.HP, " EXP:", tulpa_self.XP);
                document.getElementById('Name-self').innerHTML = tulpa_self.name + " Lv. " + tulpa_self.Lv;
                document.getElementById('battle_text').innerText = tulpa_self.name + " ist ein Level aufgestiegen";
            }
            await Delay(1000);
            document.getElementById('Name-opp').style.opacity = "0";
            document.getElementById('LP-opp').style.opacity = "0";
            document.getElementById('Name-self').style.opacity = "0";
            document.getElementById('LP-self').style.opacity = "0";
            console.log("Prüfe auf Trainerbattle:", trainerbattle != 0);
            if (trainerbattle == 0) {
                console.log("Kein Trainerkampf ✅ => Leite Spieler zurück zur Karte...");
                document.getElementById("movement_game").classList.toggle("hidethis", false);
                document.getElementById("battle_game").classList.toggle("hidethis", true);
                document.getElementById('fill-opp').style.width = "100%";
                trainerbattle = 0;
                moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
            } else if (trainerbattle == 1) {
                console.warn("Trainerkampf! => ()...");
                let nextTulpaFound = false;
                for (let i = 1; i <= 6; i++) {
                    const tulpaKey = "Tulpa" + i;
                    if (trainer.hasOwnProperty(tulpaKey) && trainer[tulpaKey].name !== "" && trainer[tulpaKey].HP > 0) {
                        TulpaIndex = "Tulpa" + i;
                        Trainerbattle("Tulpa" + i);
                        nextTulpaFound = true;
                        console.log("trainerbattle => Trainerbattle(Tulpa", i, ")...");
                        break;
                    }
                }
                if (!nextTulpaFound) {
                    console.log("!trainertulpa => ()...");
                    document.getElementById('battle_text').innerText = "Du hast " + trainer.name + " besiegt!";
                    Player.defeatedTrainer.push(document.getElementsByClassName("TrainerDialogBox")[0].getAttribute("TrainerID"));
                    await Delay(1500);
                    document.getElementById('battle_text').innerText = "Du hast " + trainer.gold + " Gold erhalten!";
                    console.log("Gold vorher: ", Player.Gold, " Gold nachher: ", Player.Gold, " + ", trainer.gold, " = ", Player.Gold += trainer.gold);//Goldabgabe an Spieler
                    Player.Gold += trainer.gold; trainer = {}; await Delay(1500);
                    console.log("Speicher Trainer als Besiegt ab...")
                    document.getElementById("movement_game").classList.toggle("hidethis", false);
                    document.getElementById("battle_game").classList.toggle("hidethis", true);
                    document.getElementById('fill-opp').style.width = "100%";
                    document.getElementsByClassName("TrainerDialogBox")[0].setAttribute("TrainerID", "");
                    trainerbattle = 0; TulpaIndex = "Tulpa1";
                    moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
                    console.log("self_attack(", attack, ") ✅");
                }
            }
        }
    }
}

function changeTulpa() {
    console.log("Führe changeTulpa() aus...");
    if (document.getElementById('change_tulpa').classList.contains("hidethis")) {
        console.log("Öffne Tulpa Liste des Spielers...");
        document.getElementById('use_item').classList.toggle("hidethis", true);
        document.getElementById('battle_game_menu').classList.toggle("hidethis", false);
        document.getElementById('change_tulpa').classList.toggle("hidethis", false);
        let html = '';
        console.log("Erstelle HTML-Element...");
        for (Slot in Player.Tulpas) {
            if (Slot.startsWith('Slot')) {
                let tulpa = Player.Tulpas[Slot];
                if (tulpa.name != "") {
                    if (tulpa.HP > 0) {
                        html += '<button class="change_tulpa_button" onclick="selectTulpa(\'' + Slot + '\')">' + tulpa.name + ' Lv. ' + tulpa.Lv + ' HP: ' + tulpa.HP + '/' + tulpa.HP_Total + '</button>';
                    } else {
                        html += '<button class="change_tulpa_button" disabled>' + tulpa.name + ' Lv. ' + tulpa.Lv + ' HP: ' + tulpa.HP + '/' + tulpa.HP_Total + '</button>';
                    }
                }
            }
        };
        document.getElementById('change_tulpa').innerHTML = html;
        console.log("changeTulpa() ✅");
    } else {
        console.log("Schließe Tulpa Liste des Spielers...");
        document.getElementById('change_tulpa').classList.toggle("hidethis", true);
        document.getElementById('battle_game_menu').classList.toggle("hidethis", true);
        console.log("changeTulpa() ✅");
    }
}

async function selectTulpa(Slot) {
    console.log("Führe selectTulpa(", Slot, ") aus...");
    if (Player.Tulpas[Slot] == tulpa_self) {
        console.warn("Tulpa bereits im Kampf! => selectTulpa(", Slot, ") stopped");
        document.getElementById('battle_text').innerText = "Das gewählte Tulpaist bereits im Kampf!";
    } else if (tulpa_self.HP <= 0) {
        document.getElementById('battle_game_menu').classList.toggle("hidethis", true);
        document.getElementById('change_tulpa').classList.toggle("hidethis", true);
        document.getElementById('Tulpa-self').style.left = "-500px";
        document.getElementById('Name-self').style.opacity = "0";
        document.getElementById('LP-self').style.opacity = "0"; await Delay(500);
        tulpa_self = Player.Tulpas[Slot];
        document.getElementById('Name-self').innerHTML = tulpa_self.name + " Lv. " + tulpa_self.Lv;
        document.getElementById('Tulpa-self').innerHTML = '<div class="' + tulpa_self.name + '_Back"></div>';
        document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%";
        document.getElementById('Tulpa-self').style.left = "10px";
        document.getElementById('Name-self').style.opacity = "1";
        document.getElementById('LP-self').style.opacity = "1"; await Delay(300);
        document.getElementById("battle_menu").classList.toggle("hidethis", false);
    } else {
        document.getElementById('battle_game_menu').classList.toggle("hidethis", true);
        document.getElementById('change_tulpa').classList.toggle("hidethis", true);
        document.getElementById('Tulpa-self').style.left = "-500px";
        document.getElementById('Name-self').style.opacity = "0";
        document.getElementById('LP-self').style.opacity = "0"; await Delay(500);
        tulpa_self = Player.Tulpas[Slot];
        document.getElementById('Name-self').innerHTML = tulpa_self.name + " Lv. " + tulpa_self.Lv;
        document.getElementById('Tulpa-self').innerHTML = '<div class="' + tulpa_self.name + '_Back"></div>';
        document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%";
        document.getElementById('Tulpa-self').style.left = "10px";
        document.getElementById('Name-self').style.opacity = "1";
        document.getElementById('LP-self').style.opacity = "1"; await Delay(500);
        console.log("selectTulpa(", Slot, " ✅ => opp_Attack()");
        opp_Attack();
    }
}

function useItem() {
    console.log("Führe useItem() aus...");
    if (document.getElementById('use_item').classList.contains("hidethis")) {
        console.log("Öffne Inventar des Spielers...");
        document.getElementById('change_tulpa').classList.toggle("hidethis", true);
        document.getElementById('battle_game_menu').classList.toggle("hidethis", false);
        document.getElementById('use_item').classList.toggle("hidethis", false);
        let html = '';
        console.log("Erstelle HTML-Element...");
        for (ball in Player.inventory.balls) {
            if (Player.inventory.balls[ball] > 0) {
                html += '<button class="change_tulpa_button" onclick="UseBall(\'' + ball + '\')">' + Player.inventory.balls[ball] + 'x ' + Item_List[ball].name + '</button>';
            }
        }
        for (drink in Player.inventory.drinks) {
            if (Player.inventory.drinks[drink] > 0) {
                html += '<button class="change_tulpa_button" onclick="UseDrink(\'' + drink + '\')">' + Player.inventory.drinks[drink] + 'x ' + Item_List[drink].name + '</button>';
            }
        }
        document.getElementById('use_item').innerHTML = html;
        console.log("useItem() ✅");
    } else {
        console.log("Schließe Inventar des Spielers...");
        document.getElementById('change_tulpa').classList.toggle("hidethis", true);
        document.getElementById('battle_game_menu').classList.toggle("hidethis", true);
        document.getElementById('use_item').classList.toggle("hidethis", true);
        console.log("useItem() ✅");
    }
}

async function UseBall(ball) {
    console.log("Führe UseBall", ball, ") aus...");
    console.log("Trainerkampf?");
    if (trainerbattle == 0) {
        console.log("!Trainerkampf => ()...");
        document.getElementById('change_tulpa').classList.toggle("hidethis", true);
        document.getElementById('battle_game_menu').classList.toggle("hidethis", true);
        document.getElementById('use_item').classList.toggle("hidethis", true);
        document.getElementById("battle_menu").classList.toggle("hidethis", true);
        console.log("Inventar: ", Player.inventory.balls[ball], " - 1", " = ");
        Player.inventory.balls[ball] -= 1;
        console.log(Player.inventory.balls[ball]);
        document.getElementById('battle_text').innerText = Player.name + " setzt " + Item_List[ball].name + " ein";
        let ballElement = document.createElement("img");
        ballElement.id = "tulpaball";
        ballElement.src = "img/textures/tBall.png";
        document.getElementById('battle_game').appendChild(ballElement);
        document.getElementById('tulpaball').style.left = "50px";
        document.getElementById('tulpaball').style.top = "320px"; await Delay(100);
        document.getElementById('tulpaball').style.left = "70px";
        document.getElementById('tulpaball').style.top = "250px"; await Delay(100);
        document.getElementById('tulpaball').style.left = "100px";
        document.getElementById('tulpaball').style.top = "190px"; await Delay(100);
        document.getElementById('tulpaball').style.left = "140px";
        document.getElementById('tulpaball').style.top = "140px"; await Delay(100);
        document.getElementById('tulpaball').style.left = "190px";
        document.getElementById('tulpaball').style.top = "100px"; await Delay(100);
        document.getElementById('tulpaball').style.left = "250px";
        document.getElementById('tulpaball').style.top = "70px"; await Delay(100);
        document.getElementById('tulpaball').style.left = "320px";
        document.getElementById('tulpaball').style.top = "50px";
        document.getElementById('tulpaball').style.left = "370px"; await Delay(100);
        document.getElementById('Tulpa-opp').style.opacity = "0"; await Delay(500);
        document.getElementById('tulpaball').style.left = "370px";
        document.getElementById('tulpaball').style.top = "150px"; await Delay(100);
        document.getElementById('tulpaball').style.top = "120px"; await Delay(100);
        document.getElementById('tulpaball').style.top = "150px"; await Delay(1000);
        document.getElementById('tulpaball').style.left = "360px";
        document.getElementById('tulpaball').style.transform = "rotate(-30deg)"; await Delay(300);
        document.getElementById('tulpaball').style.left = "370px";
        document.getElementById('tulpaball').style.transform = "rotate(0deg)"; await Delay(1000);
        document.getElementById('tulpaball').style.left = "360px";
        document.getElementById('tulpaball').style.transform = "rotate(-30deg)"; await Delay(300);
        document.getElementById('tulpaball').style.left = "370px";
        document.getElementById('tulpaball').style.transform = "rotate(0deg)"; await Delay(1000);
        document.getElementById('tulpaball').style.left = "360px";
        document.getElementById('tulpaball').style.transform = "rotate(-30deg)"; await Delay(300);
        document.getElementById('tulpaball').style.left = "370px";
        document.getElementById('tulpaball').style.transform = "rotate(0deg)";
        console.log("Berechne Chance: ", Item_List[ball].CR, "+ (10 / (", tulpa_lv, " / 5))) - (", tulpa_HP, " / ", tulpa_HP_Total, " * ", 100, " = ", (Item_List[ball].CR + (10 / (tulpa_lv / 5))) - (tulpa_HP / tulpa_HP_Total * 100));
        let chance = (Item_List[ball].CR + (10 / (tulpa_lv / 5))) - (tulpa_HP / tulpa_HP_Total * 100);
        console.log("Entscheidung:", chance, "+ 10 > 20 ~", chance + 10 > 20);
        if (chance + 10 > 20) {
            document.getElementById('battle_text').innerText = "Hurra! Du hast es gefangen";
            Player.catchedTulpas += 1; console.log("Tulpa gefangen +1");
            let catchedName = tulpa_opp;
            console.log("Tulpaname: ", catchedName, " Level: ", tulpa_lv, " HP: ", tulpa_HP, " HP-Max: ", tulpa_HP_Total);
            let catchedTulpa = { name: catchedName, Lv: tulpa_lv, HP: tulpa_HP, HP_Total: tulpa_HP_Total, XP: (25 * (tulpa_lv + 1)) * (2 * (tulpa_lv)), ID: Math.round(Math.random() * 1000000).toString() }
            console.log("Prüfe Platz des Spielers...");
            for (i in Player.Tulpas) {
                if (Player.Tulpas[i].name == "") { Player.Tulpas[i] = catchedTulpa; console.log("Füge Tulpe zu ", Player.Tulpas[i], " hinzu."); break; }
                else if (i == 'PC') { Player.Tulpas[i].push(catchedTulpa); console.log("Spieler kann keiner weiteren Tulpas tragen. Tulpa wurde an PC übertragen."); }
            }
            document.getElementById('bgr02-sound').pause();
            document.getElementById('bgr02-sound').currentTime = 0;
            document.getElementById('win-sound').play(); await Delay(3000);
            document.getElementById('bg03-sound').play();
            document.getElementById("movement_game").classList.toggle("hidethis", false);
            document.getElementById("battle_game").classList.toggle("hidethis", true);
            document.getElementById("battle_menu").classList.toggle("hidethis", true);
            document.getElementById('escape').disabled = false;
            document.getElementById('Tulpa-opp').style.opacity = "1";
            document.getElementById('tulpaball').parentNode.removeChild(document.getElementById('tulpaball'));
            document.getElementById('Name-opp').style.opacity = "0";
            document.getElementById('LP-opp').style.opacity = "0";
            document.getElementById('Name-self').style.opacity = "0";
            document.getElementById('LP-self').style.opacity = "0";
            trainerbattle = 0;
            moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
            console.log("UseBall(", ball, ") ✅ => Gefangen => Leite Spieler zurück auf Karte...");
        }
        else {
            ballElement.src = "img/textures/tBall_single.gif";; await Delay(1000);
            ballElement.src = "img/textures/tBall.png";
            document.getElementById('Tulpa-opp').style.opacity = "1";
            document.getElementById('tulpaball').parentNode.removeChild(document.getElementById('tulpaball'));
            document.getElementById('battle_text').innerText = "Mist, es hat sich befreit"; await Delay(2000);
            console.log("UseBall(", ball, ") ✅ => Nicht gefangen => opp_Attack()");
            opp_Attack();
        }
    } else {
        console.warn("catched UseBall()-ERROR: Trainerkampf erkannt! => UseBall(", ball, ") stopped");
        document.getElementById('battle_text').innerText = "Dieses Tulpa gehört schon jemandem!";
    }
}

async function UseDrink(drink) {
    console.log("Führe UseDrink(", drink, ") aus...");
    document.getElementById('use_item').classList.toggle("hidethis", true);
    console.log("Öffne Tulpa-Liste..."); changeTulpa();
    document.getElementById('change_tulpa').classList.toggle("hidethis", false); await Delay(100);
    console.log("Warte auf Eingabe...");
    let antwort = await showCustomPrompt("Bei welchem Slot, soll der Trank verwendet werden?", "Bitte gib eine Zahl (1-6) ein.");
    if (antwort > 0 && antwort <= 6) {
        let slot = "Slot_" + antwort;
        console.log("Eingabe", slot, "=> ()...");
        if (Player.Tulpas[slot].name != "") {
            if (Player.Tulpas[slot].HP != Player.Tulpas[slot].HP_Total) {
                console.log("Heile Tulpa...");
                Player.Tulpas[slot].HP += Item_List[drink].HP;
                if (Player.Tulpas[slot].HP > Player.Tulpas[slot].HP_Total) {
                    Player.Tulpas[slot].HP = Player.Tulpas[slot].HP_Total;
                }
                document.getElementById('battle_text').innerText = Player.name + " setzt " + Item_List[drink].name + " ein";
                document.getElementById('change_tulpa').classList.toggle("hidethis", true);
                document.getElementById('battle_game_menu').classList.toggle("hidethis", true);
                document.getElementById('use_item').classList.toggle("hidethis", true);
                document.getElementById("battle_menu").classList.toggle("hidethis", true);
                if (Player.Tulpas[slot] == tulpa_self) {
                    document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%";
                }
                Player.inventory.drinks[drink] -= 1;
                console.log("UseDrink(", drink, ") ✅ => opp_Attack()");
                await Delay(2000); opp_Attack();
            } else {
                console.warn("catched UseDrink()-ERROR: HP is max => UseDrink(", drink, ") stopped");
                document.getElementById('battle_text').innerText = Player.Tulpas[slot].name + " ist bereits vollständig geheilt!\nWähle ein anderes und versuche es nochmal.";
                document.getElementById('use_item').classList.toggle("hidethis", false);
                document.getElementById('change_tulpa').classList.toggle("hidethis", true);
            }
        } else {
            console.warn("catched UseDrink()-ERROR: Slot is empty => UseDrink(", drink, ") stopped");
            document.getElementById('battle_text').innerText = "Slot ist nicht belegt. Versuche es nochmal";
            document.getElementById('use_item').classList.toggle("hidethis", false);
            document.getElementById('change_tulpa').classList.toggle("hidethis", true);
        }
    } else {
        console.warn("catched UseDrink()-ERROR: Slot is NaN => UseDrink(", drink, ") stopped");
        document.getElementById('battle_text').innerText = "Ich sagte doch, gib eine Zahl zwischen 1 & 6 ein. Versuch es nochmal.";
        document.getElementById('use_item').classList.toggle("hidethis", false);
        document.getElementById('change_tulpa').classList.toggle("hidethis", true);
    }
}