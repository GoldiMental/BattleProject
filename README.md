# TulpaKing®
Zum Login: <br>
http://20.79.178.244:3000/index.html

Support-Mail:<br>
goldimental@gmx.de <br>
Discord-Server:<br>
https://discord.gg/nnxdhPxs<br>

## Entwicklung
#### Struktur
Selbst geschriebener server.js (NodeJS) mit NPM-Abhängigkeiten (Express, nodemailer, mongoose, dotenv, path, etc.) breitgestellt auf einer Azure VM mit PM2 Konfiguration.<br>
Datenbank wird über MongoDB Atlas bereitgestellt und konfiguriert.<br>

Alle anderen notwendigen Funktionen zum Betreiben des Spiels wurden ausschließlich von den teilnehmenden Entwicklern entwickelt. Dazu wurden themenspezifische Skripte (JavaScript) angelegt, um die Übersicht für die Entwickler zu vereinfachen.
Alle Skripte, inkl. server.js, befinden sich in einem Ordner.

Für Grafik wurden diverse Programme, wie Aseprite oder GIMP, verwendet, um eigene Grafiken zu erstellen bzw. anzupassen. Bilddateien befinden sich alle in einem Ordner.
Die meisten Bilddateien werden mittels background-image über CSS in die HTML transportiert. Nur selten über das img Element aus einer HTML heraus. Dies erzeugt eine bessere Übersicht im HTML-Code und erleichtert das programmieren von Javascript-Funktionen.