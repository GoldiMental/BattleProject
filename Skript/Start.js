function Delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const welcomeUsernameElement = document.getElementById('welcomeUsername');
const playerDataDisplayElement = document.getElementById('playerDataDisplay');
const pageMessageElement = document.getElementById('pageMessage');
const logoutButton = document.getElementById('logoutButton');

function showPageMessage(message, type = '') {
    pageMessageElement.textContent = message;
    pageMessageElement.className = 'message';
    if (type) {
        pageMessageElement.classList.add(type);
    }
}

let Player = {};

document.addEventListener('DOMContentLoaded', async () => {
    const storedUsername = localStorage.getItem('loggedInUsername');
    const authToken = localStorage.getItem('authToken');
    const storedPlayerData = localStorage.getItem('playerData');

    if (!authToken) {
        showCustomAlert('Nicht eingeloggt. Bitte melde dich an.');
        await Delay(2000);
        window.location.href = 'index.html';
        return;
    }

    if (storedUsername) {
        welcomeUsernameElement.textContent = storedUsername;
    } else {
        welcomeUsernameElement.textContent = "Unbekannter Spieler";
    }

    if (storedPlayerData) {
        try {
            Player = JSON.parse(storedPlayerData);
            playerDataDisplayElement.textContent = JSON.stringify(Player, null, 2);
            showPageMessage('Spielerdaten aus LocalStorage geladen.');
        } catch (e) {
            console.error('Fehler beim Parsen der Playerdata aus LocalStorage:', e);
            showPageMessage('Fehler beim Laden lokaler Spielerdaten.', 'error');
            localStorage.removeItem('playerData');
        }
    } else {
        showPageMessage('Lade Spielerdaten vom Server...');
    }

    try {
        const res = await fetch('http://localhost:3000/api/playerdata', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });

        const data = await res.json();

        if (res.ok) {
            console.log('Playerdata erfolgreich vom Server geladen:', data.playerdata);
            Player = data.playerdata;
            localStorage.setItem('playerData', JSON.stringify(Player));
            playerDataDisplayElement.textContent = JSON.stringify(Player, null, 2);
            showPageMessage('Spielerdaten erfolgreich vom Server aktualisiert.', 'success');
            if (data.username && !storedUsername) {
                welcomeUsernameElement.textContent = data.username;
                localStorage.setItem('loggedInUsername', data.username);
            }

        } else {
            showPageMessage(`Fehler beim Laden der Playerdata: ${data.message || res.statusText}`, 'error');
            console.error('Serverfehler beim Abrufen der Playerdata:', data);

            if (res.status === 401 || res.status === 403) {
                showCustomAlert('Sitzung abgelaufen oder ungültig. Bitte melde dich erneut an.');
                localStorage.clear();
                await Delay(2000);
                window.location.href = 'index.html';
                return;
            }
        }
    } catch (error) {
        console.error('Netzwerk- oder Serverfehler beim Abrufen der Playerdata:', error);
        showPageMessage('Es gab ein Problem beim Verbinden mit dem Server, um die Playerdata zu laden.', 'error');
        await Delay(2000);
        alert('Keine Spielerdaten gefunden. Versuche es bitte nochmal. Weiterleitung erfolgt automatisch.');
        localStorage.clear();
        await Delay(2000)
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('bg01-sound').volume = 0.1;
    document.getElementById('bg02-sound').volume = 0.1;
    document.getElementById('bg03-sound').volume = 0.1;
    document.getElementById('bgr01-sound').volume = 0.1;
    document.getElementById('bgr02-sound').volume = 0.1;
    document.getElementById('alarm-sound').volume = 0.1;
    document.getElementById('win-sound').volume = 0.1;
    document.getElementById('door-sound').volume = 0.4;

    const startMusik = () => {
        document.getElementById('bg03-sound').play();
        document.removeEventListener('click', startMusik);
        document.removeEventListener('mousedown', startMusik);
        document.removeEventListener('keydown', startMusik);
        document.removeEventListener('touchstart', startMusik);
    };
    document.addEventListener('click', startMusik);
    document.addEventListener('mousedown', startMusik);
    document.addEventListener('keydown', startMusik);
    document.addEventListener('touchstart', startMusik);

    if (Player && Player.name === "") {
        let antwort = "";
        showCustomAlert("Herzlich Willkommen!\nIch bin Prof. Troy und werde dich auf dem Weg zum Tulpa-King begleiten und unterstützen.\n\nAber zuerst möchte ich wissen, wie ich dich nennen soll.");
        while (true) {
            antwort = await showCustomPrompt("Wie heißt du?", "Max Mustermann");
            if (antwort === null || antwort.trim() === "") {
                showCustomAlert("Du musst mir schon sagen, wie Du heißt.");
                continue;
            }
            if (/^[a-zA-Z. ]+$/.test(antwort)) {
                Player.name = antwort;
                // Speichere den aktualisierten Player-Namen im localStorage
                localStorage.setItem("playerData", JSON.stringify(Player));
                showCustomAlert("Hallo: " + Player.name + "!\nMit den Tasten \"W,A,S,D\" kannst du deinen Charakter in die jeweilige Richtung laufen lassen.\nAlles weitere kannst du mit deiner Maus bedienen.\nWeiteres erfährst du, wenn es soweit ist.");
                break;
            } else {
                showCustomAlert("Ein Name besteht doch gewöhnlich nur aus Buchstaben.\n\nZahlen und Sonderzeichen machen daher keinen Sinn.");
            }
        }
        // Optional: Hier könntest du Player.name auch an den Server senden, um es permanent zu speichern
        // await fetch('http://localhost:3000/api/updatePlayerName', { /* ... */ });
    }

    // 5. Logout-Button Event Listener
    logoutButton.addEventListener('click', async () => {
        localStorage.clear();
        showCustomAlert('Du wurdest ausgeloggt.\n5s zurück zur Anmeldung.');
        await Delay(1000);
        showCustomAlert('Du wurdest ausgeloggt.\n4s zurück zur Anmeldung.');
        await Delay(1000);
        showCustomAlert('Du wurdest ausgeloggt.\n3s zurück zur Anmeldung.');
        await Delay(1000);
        showCustomAlert('Du wurdest ausgeloggt.\n2s zurück zur Anmeldung.');
        await Delay(1000);
        showCustomAlert('Du wurdest ausgeloggt.\n1s zurück zur Anmeldung.');
        await Delay(1000);
        window.location.href = 'index.html';
    });
});


// Die Click-Funktion kann außerhalb des DOMContentLoaded bleiben
function Click() {
    document.getElementById('click-sound').play();
    return new Promise(resolve => {
        document.addEventListener("click", function handler() {
            document.removeEventListener("click", handler);
            resolve();
        });
    });
}

function showCustomAlert(message) {
    const modalOverlay = document.getElementById('customModalOverlay');
    const modalTitle = document.getElementById('customModalTitle');
    const modalMessage = document.getElementById('customModalMessage');
    const modalInput = document.getElementById('customModalInput');
    const okButton = document.getElementById('customModalOkButton');
    const cancelButton = document.getElementById('customModalCancelButton');

    modalTitle.textContent = "Information";
    modalMessage.textContent = message;
    modalInput.classList.add('hidden');
    cancelButton.classList.add('hidden');
    modalOverlay.classList.add('visible');

    return new Promise(resolve => {
        okButton.onclick = () => {
            modalOverlay.classList.remove('visible');
            resolve(true);
        };
    });
}

function showCustomPrompt(title, defaultValue = '') {
    const modalOverlay = document.getElementById('customModalOverlay');
    const modalTitle = document.getElementById('customModalTitle');
    const modalMessage = document.getElementById('customModalMessage');
    const modalInput = document.getElementById('customModalInput');
    const okButton = document.getElementById('customModalOkButton');
    const cancelButton = document.getElementById('customModalCancelButton');

    modalTitle.textContent = title;
    modalMessage.textContent = "";
    modalInput.value = defaultValue;
    modalInput.classList.remove('hidden');
    cancelButton.classList.remove('hidden');
    modalOverlay.classList.add('visible');

    return new Promise(resolve => {
        okButton.onclick = () => {
            modalOverlay.classList.remove('visible');
            resolve(modalInput.value);
        };
        cancelButton.onclick = () => {
            modalOverlay.classList.remove('visible');
            resolve(null);
        };
    });
}
