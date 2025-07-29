document.addEventListener('DOMContentLoaded', async () => {
    if (Player.name == "") {
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
                setCookie("PlayerData", JSON.stringify(Player), 30);
                showCustomAlert("Hallo: " + Player.name + "!\nMit den Tasten \"W,A,S,D\" kannst du deinen Charakter in die jeweilige Richtung laufen lassen.\nAlles weitere kannst du mit deiner Maus bedienen.\nWeiteres erfährst du, wenn es soweit ist.");
                break;
            } else {
                showCustomAlert("Ein Name besteht doch gewöhnlich nur aus Buchstaben.\n\nZahlen und Sonderzeichen machen daher keinen Sinn.");
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
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
    }
    document.addEventListener('click', startMusik);
    document.addEventListener('mousedown', startMusik);
    document.addEventListener('keydown', startMusik);
    document.addEventListener('touchstart', startMusik);
});

function Click() {
    document.getElementById('click-sound').play();
    return new Promise(resolve => {
        document.addEventListener("click", function handler() {
            document.removeEventListener("click", handler);
            resolve();
        });
    });
}

// Test 

document.addEventListener('DOMContentLoaded', async () => {
    const welcomeUsernameElement = document.getElementById('welcomeUsername');
    const playerDataDisplayElement = document.getElementById('playerDataDisplay');
    const logoutButton = document.getElementById('logoutButton');

    const storedUsername = localStorage.getItem('loggedInUsername');
    if (storedUsername) {
        welcomeUsernameElement.textContent = storedUsername;
    }

    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        alert('Nicht eingeloggt. Bitte melde dich an.');
        window.location.href = 'index.html';
        return;
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
            console.log('Playerdata erfolgreich geladen:', data.playerdata);
        } else {
            playerDataDisplayElement.textContent = `Fehler beim Laden der Playerdata: ${data.message || res.statusText}`;
            playerDataDisplayElement.style.color = 'red';
            if (res.status === 401 || res.status === 403) {
                alert('Sitzung abgelaufen oder ungültig. Bitte melde dich erneut an.');
                localStorage.clear();
                window.location.href = 'index.html';
            }
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Playerdata (Netzwerkproblem):', error);
        playerDataDisplayElement.textContent = 'Es gab ein Problem beim Verbinden mit dem Server, um die Playerdata zu laden.';
        playerDataDisplayElement.style.color = 'red';
    }
    logoutButton.addEventListener('click', () => {
        localStorage.clear();
        alert('Du wurdest ausgeloggt.');
        window.location.href = 'index.html';
    });
});