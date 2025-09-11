function Delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function toggleClassElement(name, value) {
    document.getElementsByClassName(name)[0].classList.toggle("hidethis", value);
}

function toggleIDElement(name, value) {
    document.getElementById(name).classList.toggle("hidethis", value);
}

let Player = {};
navigator.getGamepads();
document.addEventListener('DOMContentLoaded', async () => {
    console.log("Starte Spiel...");
    const storedUsername = localStorage.getItem('loggedInUsername');
    const authToken = localStorage.getItem('authToken');
    const storedPlayerData = localStorage.getItem('playerData');
    if (!authToken) {
        console.error("JWT-TOKEN fehlt! Fehlerhafter Login oder Login fehlt komplett.");
        await showCustomAlert('Fehler beim Login. Bitte melde dich erneut an.');
        await Delay(500); window.location.href = GAME_SERVER_IP;
        return;
    }
    if (storedPlayerData) {
        console.log("Versuche Spielerdaten zu laden...");
        try {
            Player = JSON.parse(storedPlayerData);
            if (!Player.name && storedUsername) { Player.name = storedUsername; }
            console.log('Spielerdaten aus LocalStorage geladen (vorläufig).');
        } catch (e) {
            console.error('Fehler beim Parsen der Playerdata aus LocalStorage:', e);
            localStorage.removeItem('playerData');
        }
    }
    try {
        let link = GAME_SERVER_IP + "/api/playerdata";
        const res = await fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        const data = await res.json();
        if (res.ok) {
            console.log('Playerdata erfolgreich vom Server geladen:', data.playerdata);
            Player = data.playerdata; Player.name = data.username;
            localStorage.setItem('playerData', JSON.stringify(Player));
            localStorage.setItem('loggedInUsername', data.username);
            InitializeGameWorld();
        }
        else {
            console.error('Serverfehler beim Abrufen der Playerdata:', data);
            if (res.status === 401 || res.status === 403) {
                await showCustomAlert('Sitzung abgelaufen oder ungültig. Bitte melde dich erneut an.');
                localStorage.clear(); await Delay(500); window.location.href = GAME_SERVER_IP; return;
            } else {
                await showCustomAlert(`Fehler beim Laden der Daten: ${data.message || 'Unbekannter Fehler.'}`);
                localStorage.clear(); await Delay(500); window.location.href = GAME_SERVER_IP; return;
            }
        }
    } catch (error) {
        console.error('Netzwerk- oder Serverfehler beim Abrufen der Playerdata:', error);
        await showCustomAlert('Verbindungsfehler zum Server. Bitte überprüfe deine Internetverbindung oder melde dies dem Support.');
        localStorage.clear(); return;
    }
    const startMusik = () => {
        const bgMusic = document.getElementById('bg03-sound');
        console.log("Starte Hintergrungmusik...");
        if (bgMusic) { bgMusic.play().catch(e => console.warn("Autoplay für Hintergrundmusik fehlgeschlagen:", e)); }
        document.removeEventListener('click', startMusik); document.removeEventListener('mousedown', startMusik);
        document.removeEventListener('keydown', startMusik); document.removeEventListener('touchstart', startMusik);
    };
    document.addEventListener('click', startMusik); document.addEventListener('mousedown', startMusik);
    document.addEventListener('keydown', startMusik); document.addEventListener('touchstart', startMusik);
});

async function InitializeGameWorld() {
    console.log("Führe InitializeGameWorld() aus...");
    const movementGame = document.getElementById("movement_game");
    movementGame.classList.toggle("hidethis", true);
    setcolor();
    if (Player.MapX != 0 && Player.MapY != 0 && Player.MapX != undefined && Player.MapY != undefined) {
        console.log("Karte:", Player.actualMap);
        changeMap(Player.actualMap);
        console.log("MapX:", Player.MapX, " MapY:", Player.MapY);
        //Function LoadStory()
        loadStory()
        await Delay(300);
        movementGame.classList.toggle("hidethis", false);
        console.log(`Spieler auf letzte bekannte Position gesetzt.`);
    } else if (!Player.MapX && !Player.MapY && Player.tulpaGegeben) {
        Player.MapX = maps.MAP.startX; Player.MapY = maps.MAP.startY;
        changeMap('MAP');
        await Delay(300);
        movementGame.classList.toggle("hidethis", false);
        console.log(`Spieler auf Startposition (Update!) gesetzt. Folgende Koordinaten werden in Player gesetzt.`);
        console.log("MapX:", Player.MapX, " MapY:", Player.MapY);
        console.warn("Speichern nicht vergessen!!!");
    } else if ((Player.MapX == 0 && Player.MapY == 0) || (!Player.MapX && !Player.MapX && !Player.tulpaGegeben)) {
        await Delay(200); starteTutorial();
    }
}

function Click() {
    const clickSound = document.getElementById('click-sound');
    if (clickSound) {
        clickSound.play().catch(e => console.warn("Click-Sound Autoplay fehlgeschlagen:", e));
    }
    return new Promise(resolve => {
        document.addEventListener("click", function handler() {
            document.removeEventListener("click", handler);
            resolve();
        });
    });
}

async function SaveGame() {
    console.log("Führe SaveGame() aus...");
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        console.error("Sitzung abgelaufen...");
        await showCustomAlert('Sitzung abgelaufen. Bitte melde dich an.');
        await Delay(500); window.location.href = GAME_SERVER_IP; return;
    }
    if (!Player || Object.keys(Player).length === 0) {
        console.warn('catched SaveGame()-Error: Data is empty => SaveGame() stopped');
        await showCustomAlert('Keine gültigen Spielerdaten zum Speichern vorhanden.');
        return;
    }
    console.log("Verbinde mit Datenbank...");
    try {
        let link = GAME_SERVER_IP + "/api/savegame";
        const res = await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ playerdata: Player })
        });
        const data = await res.json();
        if (res.ok) {
            console.log('Spiel erfolgreich gespeichert:', data);
            await showCustomAlert('Spiel erfolgreich gespeichert!');
            if (data.playerdata) { Player = data.playerdata; localStorage.setItem('playerData', JSON.stringify(Player)); }
        } else {
            console.error('Fehler beim Speichern des Spiels:', data);
            if (res.status === 401 || res.status === 403) {
                await showCustomAlert('Sitzung abgelaufen oder ungültig. Bitte melde dich erneut an.');
                localStorage.clear(); await Delay(500); window.location.href = 'index.html';
            } else {
                await showCustomAlert(`Fehler beim Speichern des Spiels: ${data.message || 'Unbekannter Fehler.'}`);
            }
        }
    } catch (error) {
        console.error('Netzwerkfehler beim Speichern des Spiels:', error);
        await showCustomAlert('Verbindungsfehler beim Speichern. Bitte überprüfe deine Internetverbindung oder versuche es später erneut.');
    }
}
const sounds = [
    document.getElementById('click-sound'),
    document.getElementById('attack-sound'),
    document.getElementById('bg01-sound'),
    document.getElementById('bg02-sound'),
    document.getElementById('bg03-sound'),
    document.getElementById('bgr01-sound'),
    document.getElementById('bgr02-sound'),
    document.getElementById('alarm-sound'),
    document.getElementById('win-sound'),
    document.getElementById('door-sound')
];

sounds.forEach(s => { if (s) s.volume = 0.1; });
console.log("Soundeinstellungen übernommen.");

const volumeSlider = document.getElementById("volumeSlider");
const muteBtn = document.getElementById("muteBtn");

let lastVolume = 0.1;

volumeSlider.addEventListener("input", (e) => {
    const vol = parseFloat(e.target.value);
    sounds.forEach(s => { if (s) s.volume = vol; });
    if (vol > 0) lastVolume = vol;
});

muteBtn.addEventListener("click", () => {
    if (volumeSlider.value > 0) {
        volumeSlider.value = 0;
        sounds.forEach(s => { if (s) s.volume = 0; });
        muteBtn.textContent = "🔇";
    } else {
        volumeSlider.value = lastVolume;
        sounds.forEach(s => { if (s) s.volume = lastVolume; });
        muteBtn.textContent = "🔊";
    }
});

async function Exit_Game() {
    let antwort = await showCustomConfirm("Möchten Sie das Spiel wirklich verlassen?<br><br>Schon Gespeichert?");
    if (antwort) {
        window.location.href = GAME_SERVER_IP;
    }
}

const Story = document.getElementsByClassName("TrainerText");

function loadStory() {
    if (Player.Tulpas[Slot] == 0)
        Story.classList.toggle("hidethis", false);
    else 
        Story.classList.toggle("hidethis", true);
}