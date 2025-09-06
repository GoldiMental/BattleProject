function setcolor() {
    console.log("Führe setcolor() aus...");
    let color = Player.color;
    switch (color) {
        case "Dark": document.getElementById('stil').setAttribute('href', 'Style/Dark.css'); break;
        case "Darkblue": document.getElementById('stil').setAttribute('href', 'Style/Darkblue.css'); break;
        case "Darkviolett": document.getElementById('stil').setAttribute('href', 'Style/Darkviolett.css'); break;
        case "Darkred": document.getElementById('stil').setAttribute('href', 'Style/Darkred.css'); break;
        case "Darkgreen": document.getElementById('stil').setAttribute('href', 'Style/Darkgreen.css'); break;
        case "Lightblue": document.getElementById('stil').setAttribute('href', 'Style/Lightblue.css'); break;
        case "Lightgreen": document.getElementById('stil').setAttribute('href', 'Style/Lightgreen.css'); break;
        case "Lightred": document.getElementById('stil').setAttribute('href', 'Style/Lightred.css'); break;
        case "Lightviolett": document.getElementById('stil').setAttribute('href', 'Style/Lightviolett.css'); break;
        case "Light": document.getElementById('stil').setAttribute('href', 'Style/Light.css'); break;
        case undefined: Player.color = "Darkblue"; break;
    }
    console.log("Farbe:", Player.color);
    console.log("setcolor() ✅");
}