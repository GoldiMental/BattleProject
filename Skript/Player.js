// Player Informations

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + '=' + (encodeURIComponent(value) || "") + expires + "path=/";
}

function getCookie(name) {
    let nameC = name + "=";
    let ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameC) == 0) return decodeURIComponent(c.substring(nameC.length, c.length));
    }
    return null;
}

let PlayerCookie = getCookie("PlayerData");

if (PlayerCookie) {
    var Player = JSON.parse(PlayerCookie);
}
else {
    var Player = {
        name: "Max",
        Gold: 500,
        Cheats: 0,
        Tulpas: {
            Slot_1: { name: "", Lv: 0, XP: 0, ID: 0 },
            Slot_2: { name: "", Lv: 0, XP: 0, ID: 0 },
            Slot_3: { name: "", Lv: 0, XP: 0, ID: 0 },
            Slot_4: { name: "", Lv: 0, XP: 0, ID: 0 },
            Slot_5: { name: "", Lv: 0, XP: 0, ID: 0 },
            Slot_6: { name: "", Lv: 0, XP: 0, ID: 0 },
            PC: [],
        },
        inventory: {
            balls: {
                Tulpaball: 0,
                Super_Tulpaball: 0,
                Hyper_Tulpaball: 0,
                Ultra_Tulpaball: 0,
            },
            drinks: {
                Heiltrank: 0,
                Super_Heiltrank: 0,
                Manarank: 0,
                Super_Manatrank: 0,
            },
            bonbons: {
                Bonbon: 0,
                Super_Bonbon: 0,
                Hyper_Bonbon: 0,
            }
        },
    }
    setCookie("PlayerData", JSON.stringify(Player), 30);
}