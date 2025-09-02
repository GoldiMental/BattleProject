function setcolor() {
    let color = Player.color;
    switch (color) {
        case "Darkblue":
            document.getElementById('stil').setAttribute('href', 'Style/Style.css');
            break;
        case "Darkviolett":
            document.getElementById('stil').setAttribute('href', 'Style/Style-Darkviolett.css');
            break;
        case "Darkred":
            document.getElementById('stil').setAttribute('href', 'Style/Style-Darkred.css');
            break;
        case "Darkgreen":
            document.getElementById('stil').setAttribute('href', 'Style/Style-Darkgreen.css');
            break;
        case "Lightblue":
            document.getElementById('stil').setAttribute('href', 'Style/Style-Lightblue.css');
            break;
        case "Lightgreen":
            document.getElementById('stil').setAttribute('href', 'Style/Style-Lightgreen.css');
            break;
        case "Lightred":
            document.getElementById('stil').setAttribute('href', 'Style/Style-Lightred.css');
            break;
        case "Lightviolett":
            document.getElementById('stil').setAttribute('href', 'Style/Style-Lightviolett.css');
            break;
        case undefined:
            Player.color = "Darkblue";
            break;
    }
    console.log("Eingeloggte Farbe:", Player.color);
}