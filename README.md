# 🎮 TulpaKing® - Dein Browser-Rollenspiel

Willkommen im GitHub-Repository von TulpaKing®, einem spannenden Browser-Rollenspiel, das mit Node.js (Express), MongoDB Atlas und Vanilla JavaScript/HTML/CSS entwickelt wird!

Dieses Projekt dient als Basis für ein browserbasiertes Abenteuer, in dem Spieler Tulpas fangen, trainieren und gegen andere antreten lassen können. Es verfügt über ein robustes Backend für Benutzerauthentifizierung und Datenpersistenz, um dein Spielerlebnis zu speichern.

## ✨ Features

* **Benutzerauthentifizierung:** Sichere Registrierung und Login-Funktionalität mit gehashten Passwörtern und JSON Web Tokens (JWTs).
* **Spielerdatenpersistenz:** Speichern und Laden des Spielfortschritts (Gold, gefangene Tulpas, Inventar, aktuelle Karte etc.) in einer MongoDB Atlas Cloud-Datenbank.
* **API-gestützte Kommunikation:** Frontend und Backend kommunizieren über RESTful APIs.
* **Statische Dateibereitstellung:** Der Node.js-Server liefert alle Frontend-Ressourcen (HTML, CSS, JavaScript, Bilder) aus.
* **Modulare Struktur:** Trennung von Frontend- und Backend-Logik für bessere Wartbarkeit.

## 🚀 Erste Schritte

Befolge diese Schritte, um das Projekt lokal einzurichten und auszuführen.

### Voraussetzungen

Stelle sicher, dass du folgende Software installiert hast:

* **Node.js** (LTS-Version empfohlen)
* **npm** (wird mit Node.js installiert)
* Ein **MongoDB Atlas** Konto (kostenloses Tier ist ausreichend)

### Installation

1.  **Repository klonen:**
    ```bash
    git clone [https://github.com/DEIN_BENUTZERNAME/DEIN_REPO_NAME.git](https://github.com/DEIN_BENUTZERNAME/DEIN_REPO_NAME.git)
    cd DEIN_REPO_NAME
    ```
    *(Ersetze `DEIN_BENUTZERNAME` und `DEIN_REPO_NAME` durch deine tatsächlichen GitHub-Informationen)*

2.  **Abhängigkeiten installieren:**
    Navigiere in das Stammverzeichnis des geklonten Projekts (`BattleProjekt/BattleProject/` oder wie dein oberstes Projektverzeichnis heißt, das die `package.json` enthält) und installiere die Node.js-Abhängigkeiten:
    ```bash
    npm install
    ```

### MongoDB Atlas Konfiguration

1.  **Datenbank erstellen:** Melde dich bei deinem MongoDB Atlas Konto an und erstelle einen neuen Cluster.
2.  **Datenbankbenutzer erstellen:** Erstelle einen neuen Datenbankbenutzer mit einem sicheren Passwort.
3.  **IP-Zugriff konfigurieren:** Füge deine aktuelle IP-Adresse zur IP-Zugriffsliste hinzu, damit du eine Verbindung herstellen kannst. Für die lokale Entwicklung kannst du temporär auch `0.0.0.0/0` (Zugriff von überall) erlauben, was aber für die Produktion unsicher ist.
4.  **Verbindungs-String abrufen:** Wähle "Connect" für deinen Cluster, dann "Connect your application" und kopiere den Node.js Connection String.

### Umgebungsvariablen einrichten

Erstelle im **Wurzelverzeichnis** deines Projekts (dort, wo auch die `package.json` liegt) eine Datei namens `.env` und füge folgende Zeilen ein:

```dotenv
jwt_Key=DEIN_SUPER_GEHEIMER_JWT_SCHLUESSEL_HIER
MongoDB_Uri=DEIN_MONGODB_CONNECTION_STRING_HIER