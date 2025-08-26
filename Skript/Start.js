// Skript/Start.js

// Hilfsfunktion für Verzögerungen
function Delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// Globales Objekt für Spielerdaten
let Player = {};

// Event-Listener für das Laden des DOMs
document.addEventListener('DOMContentLoaded', async () => {
    const storedUsername = localStorage.getItem('loggedInUsername');
    const authToken = localStorage.getItem('authToken');
    const storedPlayerData = localStorage.getItem('playerData');

    // Anzeige des Benutzernamens im neuen Auth-Container auf game.html
    const welcomeUsernameElement = document.getElementById('welcomeUsername');
    if (welcomeUsernameElement && storedUsername) {
        welcomeUsernameElement.textContent = storedUsername;
    }

    // Authentifizierung prüfen
    if (!authToken) {
        await showCustomAlert('Nicht eingeloggt. Bitte melde dich an.');
        await Delay(500); // Kurze Verzögerung nach dem Alert
        window.location.href = 'index.html';
        return;
    }

    // Versuche, Spielerdaten aus LocalStorage zu laden (als Fallback/vorab Anzeige)
    if (storedPlayerData) {
        try {
            Player = JSON.parse(storedPlayerData);
            // Optional: Setze den Namen, falls er im Player-Objekt nicht korrekt ist
            if (!Player.name && storedUsername) {
                Player.name = storedUsername;
            }
            console.log('Spielerdaten aus LocalStorage geladen (vorläufig).');
            // Zeige die geladenen Daten im Debug-Container an
            updatePlayerDataDisplay();
        } catch (e) {
            console.error('Fehler beim Parsen der Playerdata aus LocalStorage:', e);
            localStorage.removeItem('playerData'); // Beschädigte Daten entfernen
        }
    }

    // Aktualisiere die Meldung im Auth-Container
    const pageMessageElement = document.getElementById('pageMessage');
    if (pageMessageElement) {
        pageMessageElement.textContent = 'Lade Spielerdaten vom Server...';
    }


    // Spielerdaten vom Server abrufen
    try {
        const res = await fetch('http://20.79.178.244:3000/api/playerdata', {
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
            // Sicherstellen, dass der Playername korrekt gesetzt ist
            Player.name = data.username; // Verwende den vom Server bestätigten Namen
            localStorage.setItem('playerData', JSON.stringify(Player)); // LocalStorage aktualisieren
            localStorage.setItem('loggedInUsername', data.username); // Username im LocalStorage aktualisieren

            if (welcomeUsernameElement) {
                welcomeUsernameElement.textContent = data.username; // UI aktualisieren
            }
            if (pageMessageElement) {
                pageMessageElement.textContent = 'Spielerdaten erfolgreich geladen!';
            }
            updatePlayerDataDisplay(); // Aktualisiere die Anzeige im Debug-Container

            // Hier kannst du weitere Initialisierungen starten, die Player-Daten benötigen
            InitializeGameWorld(); // Beispiel: Funktion, die die Spielwelt mit Player-Daten aufbaut
            
        } else {
            console.error('Serverfehler beim Abrufen der Playerdata:', data);
            if (pageMessageElement) {
                pageMessageElement.textContent = `Fehler: ${data.message || 'Unbekannt.'}`;
            }

            if (res.status === 401 || res.status === 403) {
                await showCustomAlert('Sitzung abgelaufen oder ungültig. Bitte melde dich erneut an.');
                localStorage.clear(); // Alle Token/Daten entfernen
                await Delay(500);
                window.location.href = 'index.html';
                return;
            } else {
                await showCustomAlert(`Fehler beim Laden der Daten: ${data.message || 'Unbekannter Fehler.'}`);
                // Optional: Auch hier zum Login umleiten, wenn das Laden komplett fehlschlägt
                localStorage.clear();
                await Delay(500);
                window.location.href = 'index.html';
                return;
            }
        }
    } catch (error) {
        console.error('Netzwerk- oder Serverfehler beim Abrufen der Playerdata:', error);
        if (pageMessageElement) {
            pageMessageElement.textContent = 'Verbindungsfehler. Bitte Server prüfen.';
        }
        await showCustomAlert('Verbindungsfehler zum Server. Bitte überprüfe deine Internetverbindung oder versuche es später erneut.');
        localStorage.clear();
        await Delay(500);
        window.location.href = 'index.html';
        return;
    }

    // Audio-Lautstärken einstellen
    document.getElementById('bg01-sound').volume = 0.1;
    document.getElementById('bg02-sound').volume = 0.1;
    document.getElementById('bg03-sound').volume = 0.1;
    document.getElementById('bgr01-sound').volume = 0.1;
    document.getElementById('bgr02-sound').volume = 0.1;
    document.getElementById('alarm-sound').volume = 0.1;
    document.getElementById('win-sound').volume = 0.1;
    document.getElementById('door-sound').volume = 0.4;

    // Funktion zum Starten der Musik nach erster Benutzerinteraktion
    const startMusik = () => {
        const bgMusic = document.getElementById('bg03-sound');
        if (bgMusic) {
            bgMusic.play().catch(e => console.warn("Autoplay für Musik fehlgeschlagen:", e));
        }
        document.removeEventListener('click', startMusik);
        document.removeEventListener('mousedown', startMusik);
        document.removeEventListener('keydown', startMusik);
        document.removeEventListener('touchstart', startMusik);
    };
    document.addEventListener('click', startMusik);
    document.addEventListener('mousedown', startMusik);
    document.addEventListener('keydown', startMusik);
    document.addEventListener('touchstart', startMusik);
});

// Funktion, die die Debug-Anzeige der Spielerdaten auf der Seite aktualisiert
function updatePlayerDataDisplay() {
    const playerDataDisplayElement = document.getElementById('playerDataDisplay');
    if (playerDataDisplayElement) {
        // Zeige nur einen Teil der Daten an, um es lesbar zu halten
        const displayData = {
            name: Player.name,
            Gold: Player.Gold,
            catchedTulpas: Player.catchedTulpas,
            actualMap: Player.actualMap,
            // ... füge weitere relevante Felder hinzu
            // Tulpas: Player.Tulpas, // Das könnte sehr groß sein!
            // inventory: Player.inventory // Auch potenziell groß
        };
        playerDataDisplayElement.textContent = JSON.stringify(displayData, null, 2);
    }
}


// Beispiel für eine Funktion zur Spielinitialisierung (Aufruf nach Laden der Playerdaten)
function InitializeGameWorld() {
    console.log("Spielwelt wird mit geladenen Spielerdaten initialisiert...");
    // Hier würdest du die Spielwelt basierend auf 'Player' initialisieren:
    // z.B. Position des Spielers, Tulpa-Stats, Inventar, etc.
    // Beispiel: Stelle den Spieler auf die letzte gespeicherte Karte
    if (Player.actualMap) {
        document.querySelector('.map').className = 'map ' + Player.actualMap;
        console.log(`Spieler auf Karte ${Player.actualMap} gesetzt.`);
    }
    // Stelle sicher, dass diese Funktion alle notwendigen Initialisierungen für dein Spiel ausführt.
}


// Hilfsfunktion für Klick-Sound (unverändert)
function Click() {
    const clickSound = document.getElementById('click-sound');
    if (clickSound) {
        clickSound.play().catch(e => console.warn("Click-Sound Autoplay fehlgeschlagen:", e));
    }
    // Diese Promise-Implementierung ist absichtlich so gewählt,
    // um auf eine weitere Benutzerinteraktion (Klick) zu warten,
    // bevor sequentielle Spielaktionen (z.B. Dialogfortsetzung) fortgesetzt werden.
    return new Promise(resolve => {
        document.addEventListener("click", function handler() {
            document.removeEventListener("click", handler);
            resolve();
        });
    });
}


// --- Modale Dialogfunktionen (unverändert, aber eingebettet für Kontext) ---

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

// --- Speichern der Spielerdaten ---
async function SaveGame() {
    console.log("Speicherfunktion aufgerufen.");

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        await showCustomAlert('Nicht eingeloggt. Bitte melde dich an.');
        await Delay(500);
        window.location.href = 'index.html';
        return;
    }

    // Prüfe, ob Player-Objekt initialisiert und nicht leer ist
    if (!Player || Object.keys(Player).length === 0) {
        console.warn('Versuch, leere Spielerdaten zu speichern. Speichervorgang abgebrochen.');
        await showCustomAlert('Keine gültigen Spielerdaten zum Speichern vorhanden.');
        return;
    }

    try {
        const res = await fetch('http://20.79.178.244:3000/api/savegame', {
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
            // Lokale Player-Daten mit den vom Server zurückgegebenen Daten aktualisieren (für Konsistenz)
            if (data.playerdata) {
                Player = data.playerdata; // Player-Objekt im Frontend aktualisieren
                localStorage.setItem('playerData', JSON.stringify(Player));
                updatePlayerDataDisplay(); // Debug-Anzeige aktualisieren
            }
        } else {
            console.error('Fehler beim Speichern des Spiels:', data);
            if (res.status === 401 || res.status === 403) {
                await showCustomAlert('Sitzung abgelaufen oder ungültig. Bitte melde dich erneut an.');
                localStorage.clear();
                await Delay(500);
                window.location.href = 'index.html';
            } else {
                await showCustomAlert(`Fehler beim Speichern des Spiels: ${data.message || 'Unbekannter Fehler.'}`);
            }
        }
    } catch (error) {
        console.error('Netzwerkfehler beim Speichern des Spiels:', error);
        await showCustomAlert('Verbindungsfehler beim Speichern. Bitte überprüfe deine Internetverbindung oder versuche es später erneut.');
    }
}