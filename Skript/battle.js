function Delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

let trainer = {};
let TulpaIndex = "Tulpa1";
let trainerbattle = 0;
let tulpa_HP = 0;
let tulpa_HP_Total = 0;
let tulpa_lv = 0;
let tulpa_self;

async function traineranimation(Trainer) {
    trainer = Trainer;
    TrainerDialogBox = document.getElementsByClassName("TrainerDialogBox")[0];
    TrainerDialogBox.style.visibility = "visible";
    TrainerDialogBox.innerHTML = Trainer.text1;
    await Delay(2000);
    if (Trainer.text2 != "") {
        TrainerDialogBox.innerHTML = Trainer.text2;
        await Delay(2000);
        if (Trainer.text3 != "") {
            TrainerDialogBox.innerHTML = Trainer.text3;
            await Delay(2000)
            if (Trainer.text4 != "") {
                TrainerDialogBox.innerHTML = Trainer.text4;
                await Delay(2000);
                TrainerDialogBox.style.visibility = "hidden";
                trainerbattle = 1;
                battleanimation(1);
            } else {
                TrainerDialogBox.style.visibility = "hidden";
                trainerbattle = 1;
                battleanimation(1);
            }
        } else {
            TrainerDialogBox.style.visibility = "hidden";
            trainerbattle = 1;
            battleanimation(1);
        }
    } else {
        TrainerDialogBox.style.visibility = "hidden";
        trainerbattle = 1;
        battleanimation(1);
    }
}

async function battleanimation(trainerbattle) {
    document.getElementById('bg03-sound').pause();
    document.getElementById('bg03-sound').currentTime = 0;
    document.getElementById('alarm-sound').play();
    for (i = 0; i < 15; i++) {
        await Delay(80);
        if (document.getElementById("movement_game").style.visibility == "hidden") { document.getElementById("movement_game").style.visibility = "visible" }
        else { document.getElementById("movement_game").style.visibility = "hidden" }
    }
    document.getElementById('bgr02-sound').play();
    if (trainerbattle == 0) {
        battle();
    } else {
        Trainerbattle("Tulpa1");
    }
}

async function Trainerbattle(TulpaIndex) {
    let battleInfo = document.getElementById('battle_text');
    let tulpa_opp = trainer[TulpaIndex].name;
    tulpa_lv = trainer[TulpaIndex].Lv;
    for (Slot in Player.Tulpas) {
        if (Slot.startsWith("Slot")) {
            if (Player.Tulpas[Slot].HP > 0) {
                tulpa_self = Player.Tulpas[Slot];
                break;
            }
        }
    }

    document.getElementById("movement_game").style.visibility = "hidden";
    document.getElementById("battle_game").style.visibility = "visible";
    document.getElementById("battle_menu").style.visibility = "visible";
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

    await Delay(2000);
    document.getElementById('Tulpa-self').style.left = "-500px";
    await Delay(500);
    document.getElementById('Tulpa-self').innerHTML = '<div class="' + tulpa_self.name + '_Back"></div>';
    document.getElementById('Tulpa-self').style.left = "10px";

    document.getElementById('Name-self').innerHTML = tulpa_self.name + " Lv. " + tulpa_self.Lv;
    document.getElementById('Name-self').style.opacity = "1";
    document.getElementById('LP-self').style.opacity = "1";
}

async function battle() {
    let battleInfo = document.getElementById('battle_text');
    let zufall = Math.round(Math.random() * (maps[Player.actualMap].opp_List.length - 1));
    let tulpa_opp = maps[Player.actualMap].opp_List[zufall];
    tulpa_lv = Math.round((Math.random() + 1) * (maps[Player.actualMap].maxLv - 1));
    for (Slot in Player.Tulpas) {
        if (Slot.startsWith("Slot")) {
            if (Player.Tulpas[Slot].HP > 0) {
                tulpa_self = Player.Tulpas[Slot];
                break;
            }
        }
    }

    document.getElementById("movement_game").style.visibility = "hidden";
    document.getElementById("battle_game").style.visibility = "visible";
    document.getElementById("battle_menu").style.visibility = "visible";
    document.getElementById('Tulpa-self').innerHTML = '<div class="self_Back"></div>';
    document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%";

    tulpa_HP = Tulpas[tulpa_opp].HP_Total + (tulpa_lv * 3);
    tulpa_HP_Total = Tulpas[tulpa_opp].HP_Total + (tulpa_lv * 3);
    document.getElementById('fill-opp').style.width = Math.round(tulpa_HP / tulpa_HP_Total * 100) + "%";
    battleInfo.innerText = "Ein wildes " + tulpa_opp + " Lv. " + tulpa_lv + " greift an!";
    document.getElementById('Name-opp').innerHTML = tulpa_opp + " Lv. " + tulpa_lv;
    document.getElementById('Tulpa-opp').innerHTML = '<div class="' + tulpa_opp + '_Front"></div>';

    document.getElementById('Tulpa-opp').style.right = "10px";
    document.getElementById('Name-opp').style.opacity = "1";
    document.getElementById('LP-opp').style.opacity = "1";

    await Delay(2000);
    document.getElementById('Tulpa-self').style.left = "-500px";
    await Delay(500);
    document.getElementById('Tulpa-self').innerHTML = '<div class="' + tulpa_self.name + '_Back"></div>';
    document.getElementById('Tulpa-self').style.left = "10px";

    document.getElementById('Name-self').innerHTML = tulpa_self.name + " Lv. " + tulpa_self.Lv;
    document.getElementById('Name-self').style.opacity = "1";
    document.getElementById('LP-self').style.opacity = "1";
}

async function escape() {
    document.getElementById('change_tulpa').style.visibility = "hidden";
    document.getElementById('battle_game_menu').style.visibility = "hidden";
    document.getElementById('use_item').style.visibility = "hidden";
    document.getElementById('escape').disabled = true;
    let zufall = Math.round(Math.random() * 100);
    if (zufall >= 20 && trainerbattle == 0) {
        document.getElementById('battle_text').innerText = "Flucht erfolgreich!";
        document.getElementById('bgr02-sound').pause();
        document.getElementById('bgr02-sound').currentTime = 0;
        document.getElementById('win-sound').play();
        await Delay(3500);
        setCookie("PlayerData", JSON.stringify(Player), 30);
        document.getElementById('bg03-sound').play();
        document.getElementById("movement_game").style.visibility = "visible";
        document.getElementById("battle_game").style.visibility = "hidden";
        document.getElementById("battle_menu").style.visibility = "hidden";
        document.getElementById('escape').disabled = false;
        document.getElementById('Name-opp').style.opacity = "0";
        document.getElementById('LP-opp').style.opacity = "0";
        document.getElementById('Name-self').style.opacity = "0";
        document.getElementById('LP-self').style.opacity = "0";
        moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
    } else if(trainerbattle == 0) {
        document.getElementById('battle_text').innerText = "Mist! Das hat nicht funktioniert";
        await Delay(1000);
        document.getElementById('escape').disabled = false;
        opp_Attack();
    } else {
        document.getElementById('battle_text').innerText = "Ich kann mich doch nicht vor so einer Herausforderung drücken!";
        await Delay(1000);
        document.getElementById('escape').disabled = false;
    }
}

async function opp_Attack() {
    document.getElementById("battle_menu").style.visibility = "hidden";
    let tulpa_opp = document.getElementById('Name-opp').innerHTML.split(" ")[0];
    let tulpa_opp_lv = document.getElementById('Name-opp').innerHTML.split(" ")[2];
    let zufall = Math.round((Math.random()) * 4);
    let attack = Tulpas[tulpa_opp.toString()].attacks[zufall];
    if (attack == "-" || attack == undefined) {
        opp_Attack();
        return;
    }
    document.getElementById('battle_text').innerText = tulpa_opp + " setzt " + attack + " ein.";
    document.getElementById('attack-sound').play();
    await Delay(350);
    document.getElementById('Tulpa-opp').style.right = "50px";
    await Delay(200);
    document.getElementById('Tulpa-opp').style.right = "10px";
    await Delay(1000);
    let dmg = Math.round((Tulpas[tulpa_opp.toString()].ANG - (Math.random() * 0.5 * Tulpas[tulpa_self.name].VER) + parseInt(tulpa_opp_lv)) * (1 + (Attacks[attack].ATK_Power / 10)));
    tulpa_self.HP -= dmg;
    console.log(dmg);
    if (tulpa_self.HP > 0) {
        document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%";
        await Delay(300);
        document.getElementById("battle_menu").style.visibility = "visible";
    } else {
        tulpa_self.HP = 0;
        document.getElementById('battle_text').innerText = "Dein Tulpa ist kampfunfähig!";
        document.getElementById('fill-self').style.width = "0%";
        let tulpa_list = 0;
        for (Slot in Player.Tulpas) {
            if (Slot.startsWith('Slot')) {
                let tulpa = Player.Tulpas[Slot];
                if (tulpa.name != "" && tulpa.HP > 0) {
                    tulpa_list += 1;
                }
            }
        };
        if (tulpa_list > 0) {
            changeTulpa();
            tulpa_list = 0;
        } else {
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
            setCookie("PlayerData", JSON.stringify(Player), 30);
            document.getElementById('bg03-sound').play();
            document.getElementById("movement_game").style.visibility = "visible";
            document.getElementById("battle_game").style.visibility = "hidden";
            document.getElementById("battle_menu").style.visibility = "hidden";
            document.getElementById('Name-opp').style.opacity = "0";
            document.getElementById('LP-opp').style.opacity = "0";
            document.getElementById('Name-self').style.opacity = "0";
            document.getElementById('LP-self').style.opacity = "0";
            moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
        }
    }
}

function fight() {
    document.getElementById('change_tulpa').style.visibility = "hidden";
    document.getElementById('battle_game_menu').style.visibility = "hidden";
    document.getElementById('use_item').style.visibility = "hidden";
    document.getElementById("battle_menu").style.visibility = "hidden";
    document.getElementById("attack_menu").style.visibility = "visible";
    document.getElementById("Attack_1").innerHTML = Tulpas[tulpa_self.name].attacks[1];
    document.getElementById("Attack_2").innerHTML = Tulpas[tulpa_self.name].attacks[2];
    document.getElementById("Attack_3").innerHTML = Tulpas[tulpa_self.name].attacks[3];
    document.getElementById("Attack_4").innerHTML = Tulpas[tulpa_self.name].attacks[4];
}

async function self_attack(attack) {
    if (attack != "-") {
        document.getElementById("attack_menu").style.visibility = "hidden";
        let tulpa_opp = document.getElementById('Name-opp').innerHTML;
        let tulpa_opp_name = tulpa_opp.split(' ')[0];
        let tulpa_opp_lv = tulpa_opp.split(' ')[2];
        let dmg = Math.round((Tulpas[tulpa_self.name].ANG - (Math.random() * 0.5 * Tulpas[tulpa_opp_name].VER) + tulpa_self.Lv) * (1 + (Attacks[attack].ATK_Power / 10)));
        console.log(dmg);
        document.getElementById('battle_text').innerText = tulpa_self.name + " setzt " + attack + " ein.";
        document.getElementById('attack-sound').play();
        await Delay(350);
        document.getElementById('Tulpa-self').style.left = "50px";
        await Delay(200);
        document.getElementById('Tulpa-self').style.left = "10px";
        await Delay(1000);
        tulpa_HP -= dmg;
        if (tulpa_HP > 0) {
            document.getElementById('fill-opp').style.width = Math.round(tulpa_HP / tulpa_HP_Total * 100) + "%";
            await Delay(1500);
            opp_Attack();
        } else {
            document.getElementById('fill-opp').style.width = "0%";
            document.getElementById('battle_text').innerText = "Du hast " + tulpa_opp + " besiegt!";
            if (trainerbattle == 1){
                trainer[TulpaIndex] = {name: "", Lv: 0, HP: 0, HP_Total: 0};
            }
            await Delay(500);
            document.getElementById('Tulpa-opp').style.right = "-500px";
            document.getElementById('bgr02-sound').pause();
            document.getElementById('bgr02-sound').currentTime = 0;
            document.getElementById('win-sound').play();
            await Delay(2000);
            document.getElementById('bg03-sound').play();
            await Delay(500);
            let exp = Math.round((Tulpas[tulpa_opp_name].HP / Tulpas[tulpa_opp_name].ANG) / tulpa_self.Lv);
            document.getElementById('battle_text').innerText = "Du hast " + exp + " EXP. erhalten!";
            tulpa_self.XP += exp;
            if (tulpa_self.XP >= 100) {
                tulpa_self.Lv += 1;
                tulpa_self.XP = 0;
                tulpa_self.HP += 3;
                tulpa_self.HP_Total += 3;
                setCookie("PlayerData", JSON.stringify(Player), 30);
                await Delay(1000);
                document.getElementById('Name-self').innerHTML = tulpa_self.name + " Lv. " + tulpa_self.Lv;
                document.getElementById('battle_text').innerText = tulpa_self.name + " ist ein Level aufgestiegen";
            }
            await Delay(3000);
            document.getElementById('Name-opp').style.opacity = "0";
            document.getElementById('LP-opp').style.opacity = "0";
            document.getElementById('Name-self').style.opacity = "0";
            document.getElementById('LP-self').style.opacity = "0";
            if (trainerbattle == 0){
                document.getElementById("movement_game").style.visibility = "visible";
                document.getElementById("battle_game").style.visibility = "hidden";
                document.getElementById('fill-opp').style.width = "100%";
                moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
            } else if(trainerbattle == 1){
                let nextTulpaFound = false;
                for (let i = 1; i <= 6; i++) {
                    const tulpaKey = "Tulpa" + i;
                    if (trainer.hasOwnProperty(tulpaKey) && trainer[tulpaKey].name !== "" && trainer[tulpaKey].HP > 0) {
                        TulpaIndex = "Tulpa"+i;
                        Trainerbattle("Tulpa"+i);
                        nextTulpaFound = true;
                        break;
                    }
                }
                if (!nextTulpaFound) {
                    document.getElementById('battle_text').innerText = "Du hast " + trainer.name + " besiegt!";
                    await Delay(1500);
                    document.getElementById('battle_text').innerText = "Du hast " + trainer.gold + " Gold erhalten!";
                    Player.Gold += trainer.gold;
                    setCookie("PlayerData", JSON.stringify(Player), 30);
                    trainer = {};
                    await Delay(1500);
                    document.getElementById("movement_game").style.visibility = "visible";
                    document.getElementById("battle_game").style.visibility = "hidden";
                    document.getElementById('fill-opp').style.width = "100%";
                    moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
                }
            }
        }
    }
}

document.getElementById('change_tulpa').style.visibility = "hidden";

function changeTulpa() {
    if (document.getElementById('change_tulpa').style.visibility == "hidden") {
        document.getElementById('use_item').style.visibility = "hidden";
        document.getElementById('battle_game_menu').style.visibility = "visible";
        document.getElementById('change_tulpa').style.visibility = "visible";
        let html = '';
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
    } else {
        document.getElementById('change_tulpa').style.visibility = "hidden";
        document.getElementById('battle_game_menu').style.visibility = "hidden";
    }
}

async function selectTulpa(Slot) {
    if (Player.Tulpas[Slot] == tulpa_self) {
        document.getElementById('battle_text').innerText = "Das gewählte Tulpaist bereits im Kampf!";
    } else if (tulpa_self.HP <= 0) {
        document.getElementById('battle_game_menu').style.visibility = "hidden";
        document.getElementById('change_tulpa').style.visibility = "hidden";
        document.getElementById('Tulpa-self').style.left = "-500px";
        document.getElementById('Name-self').style.opacity = "0";
        document.getElementById('LP-self').style.opacity = "0";
        await Delay(500);
        tulpa_self = Player.Tulpas[Slot];
        document.getElementById('Name-self').innerHTML = tulpa_self.name + " Lv. " + tulpa_self.Lv;
        document.getElementById('Tulpa-self').innerHTML = '<div class="' + tulpa_self.name + '_Back"></div>';
        document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%";
        document.getElementById('Tulpa-self').style.left = "10px";
        document.getElementById('Name-self').style.opacity = "1";
        document.getElementById('LP-self').style.opacity = "1";
        await Delay(300);
        document.getElementById("battle_menu").style.visibility = "visible";
    } else {
        document.getElementById('battle_game_menu').style.visibility = "hidden";
        document.getElementById('change_tulpa').style.visibility = "hidden";
        document.getElementById('Tulpa-self').style.left = "-500px";
        document.getElementById('Name-self').style.opacity = "0";
        document.getElementById('LP-self').style.opacity = "0";
        await Delay(500);
        tulpa_self = Player.Tulpas[Slot];
        document.getElementById('Name-self').innerHTML = tulpa_self.name + " Lv. " + tulpa_self.Lv;
        document.getElementById('Tulpa-self').innerHTML = '<div class="' + tulpa_self.name + '_Back"></div>';
        document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%";
        document.getElementById('Tulpa-self').style.left = "10px";
        document.getElementById('Name-self').style.opacity = "1";
        document.getElementById('LP-self').style.opacity = "1";
        await Delay(500);
        opp_Attack();
    }
}

document.getElementById('use_item').style.visibility = "hidden";

function useItem() {
    if (document.getElementById('use_item').style.visibility == "hidden") {
        document.getElementById('change_tulpa').style.visibility = "hidden";
        document.getElementById('battle_game_menu').style.visibility = "visible";
        document.getElementById('use_item').style.visibility = "visible";
        let html = '';
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
    } else {
        document.getElementById('change_tulpa').style.visibility = "hidden";
        document.getElementById('battle_game_menu').style.visibility = "hidden";
        document.getElementById('use_item').style.visibility = "hidden";
    }
}

async function UseBall(ball) {
    if (trainerbattle == 0) {
        document.getElementById('change_tulpa').style.visibility = "hidden";
        document.getElementById('battle_game_menu').style.visibility = "hidden";
        document.getElementById('use_item').style.visibility = "hidden";
        document.getElementById("battle_menu").style.visibility = "hidden";
        Player.inventory.balls[ball] -= 1;
        setCookie("PlayerData", JSON.stringify(Player), 30);
        document.getElementById('battle_text').innerText = Player.name + " setzt " + Item_List[ball].name + " ein";
        let ballElement = document.createElement("div");
        ballElement.id = "tulpaball";
        document.getElementById('battle_game').appendChild(ballElement);
        document.getElementById('tulpaball').style.left = "50px";
        document.getElementById('tulpaball').style.top = "320px";
        await Delay(100);
        document.getElementById('tulpaball').style.left = "70px";
        document.getElementById('tulpaball').style.top = "250px";
        await Delay(100);
        document.getElementById('tulpaball').style.left = "100px";
        document.getElementById('tulpaball').style.top = "190px";
        await Delay(100);
        document.getElementById('tulpaball').style.left = "140px";
        document.getElementById('tulpaball').style.top = "140px";
        await Delay(100);
        document.getElementById('tulpaball').style.left = "190px";
        document.getElementById('tulpaball').style.top = "100px";
        await Delay(100);
        document.getElementById('tulpaball').style.left = "250px";
        document.getElementById('tulpaball').style.top = "70px";
        await Delay(100);
        document.getElementById('tulpaball').style.left = "320px";
        document.getElementById('tulpaball').style.top = "50px";
        document.getElementById('tulpaball').style.left = "370px";
        await Delay(100);
        document.getElementById('Tulpa-opp').style.opacity = "0";
        await Delay(500);
        document.getElementById('tulpaball').style.left = "370px";
        document.getElementById('tulpaball').style.top = "150px";
        await Delay(100);
        document.getElementById('tulpaball').style.top = "120px";
        await Delay(100);
        document.getElementById('tulpaball').style.top = "150px";
        await Delay(1000);//First
        document.getElementById('tulpaball').style.left = "360px";
        document.getElementById('tulpaball').style.transform = "rotate(-30deg)";
        await Delay(300);
        document.getElementById('tulpaball').style.left = "370px";
        document.getElementById('tulpaball').style.transform = "rotate(0deg)";
        await Delay(1000);//Second Chance
        document.getElementById('tulpaball').style.left = "360px";
        document.getElementById('tulpaball').style.transform = "rotate(-30deg)";
        await Delay(300);
        document.getElementById('tulpaball').style.left = "370px";
        document.getElementById('tulpaball').style.transform = "rotate(0deg)";
        await Delay(1000);//Third Chance
        document.getElementById('tulpaball').style.left = "360px";
        document.getElementById('tulpaball').style.transform = "rotate(-30deg)";
        await Delay(300);
        document.getElementById('tulpaball').style.left = "370px";
        document.getElementById('tulpaball').style.transform = "rotate(0deg)";
        let chance = (Item_List[ball].CR + (10 / (tulpa_lv / 5))) - (tulpa_HP / tulpa_HP_Total * 100);
        if (chance + 10 > 20) {
            document.getElementById('battle_text').innerText = "Hurra! Du hast es gefangen";
            Player.catchedTulpas += 1;
            let catchedName = document.getElementById('Name-opp').innerHTML.split(' ')[0];
            let catchedTulpa = { name: catchedName, Lv: tulpa_lv, HP: tulpa_HP, HP_Total: tulpa_HP_Total, XP: 0, ID: Math.round(Math.random() * 1000000).toString() }
            for (i in Player.Tulpas) {
                if (Player.Tulpas[i].name == "") {
                    Player.Tulpas[i] = catchedTulpa;
                    break;
                } else if (i == 'PC') {
                    Player.Tulpas[i].push(catchedTulpa);
                }
            }
            setCookie("PlayerData", JSON.stringify(Player), 30);
            document.getElementById('bgr02-sound').pause();
            document.getElementById('bgr02-sound').currentTime = 0;
            document.getElementById('win-sound').play();
            await Delay(3000);
            document.getElementById('bg03-sound').play();
            document.getElementById("movement_game").style.visibility = "visible";
            document.getElementById("battle_game").style.visibility = "hidden";
            document.getElementById("battle_menu").style.visibility = "hidden";
            document.getElementById('escape').disabled = false;
            document.getElementById('Tulpa-opp').style.opacity = "1";
            document.getElementById('tulpaball').parentNode.removeChild(document.getElementById('tulpaball'));
            document.getElementById('Name-opp').style.opacity = "0";
            document.getElementById('LP-opp').style.opacity = "0";
            document.getElementById('Name-self').style.opacity = "0";
            document.getElementById('LP-self').style.opacity = "0";
            moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
        }
        else {
            document.getElementById('Tulpa-opp').style.opacity = "1";
            document.getElementById('tulpaball').parentNode.removeChild(document.getElementById('tulpaball'));
            document.getElementById('battle_text').innerText = "Mist, es hat sich befreit";
            await Delay(2000);
            opp_Attack();
        }
    } else {
        document.getElementById('battle_text').innerText = "Dieses Tulpa gehört schon jemandem!";
    }
}

async function UseDrink(drink) {
    document.getElementById('use_item').style.visibility = "hidden";
    changeTulpa();
    document.getElementById('change_tulpa').style.visibility = "visible";
    await Delay(100);
    let antwort = prompt("Bei welchem Slot, soll der Trank verwendet werden?", "Bitte gib eine Zahl (1-6) ein.");
    if (antwort > 0 && antwort <= 6) {
        let slot = "Slot_" + antwort;
        if (Player.Tulpas[slot].name != "") {
            if (Player.Tulpas[slot].HP != Player.Tulpas[slot].HP_Total) {
                Player.Tulpas[slot].HP += Item_List[drink].HP;
                if (Player.Tulpas[slot].HP > Player.Tulpas[slot].HP_Total) {
                    Player.Tulpas[slot].HP = Player.Tulpas[slot].HP_Total;
                }
                document.getElementById('battle_text').innerText = Player.name + " setzt " + Item_List[drink].name + " ein";
                document.getElementById('change_tulpa').style.visibility = "hidden";
                document.getElementById('battle_game_menu').style.visibility = "hidden";
                document.getElementById('use_item').style.visibility = "hidden";
                document.getElementById("battle_menu").style.visibility = "hidden";
                if (Player.Tulpas[slot] == tulpa_self) {
                    document.getElementById('fill-self').style.width = Math.round(tulpa_self.HP / tulpa_self.HP_Total * 100) + "%";
                }
                Player.inventory.drinks[drink] -= 1;
                setCookie("PlayerData", JSON.stringify(Player), 30);
                await Delay(2000);
                opp_Attack();
            } else {
                document.getElementById('battle_text').innerText = Player.Tulpas[slot].name + " ist bereits vollständig geheilt!\nWähle ein anderes und versuche es nochmal.";
                document.getElementById('use_item').style.visibility = "visible";
                document.getElementById('change_tulpa').style.visibility = "hidden";
            }
        } else {
            document.getElementById('battle_text').innerText = "Slot ist nicht belegt. Versuche es nochmal";
            document.getElementById('use_item').style.visibility = "visible";
            document.getElementById('change_tulpa').style.visibility = "hidden";
        }
    } else {
        document.getElementById('battle_text').innerText = "Ich sagte doch, gib eine Zahl zwischen 1 & 6 ein. Versuch es nochmal.";
        document.getElementById('use_item').style.visibility = "visible";
        document.getElementById('change_tulpa').style.visibility = "hidden";
    }
}