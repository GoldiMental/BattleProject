function setcolor() {
    let color = Player.color;
    switch (color){
        case "Darkblue":
            document.getElementById('stil').setAttribute('href', 'Style/Style.css');
            break;
        case "Darkviolett":
            //document.getElementById('stil').setAttribute('href', 'Styles/Style-' + color + '.css');
            break;
        case "Lightblue":
            //document.getElementById('stil').setAttribute('href', 'Styles/Style-' + color + '.css');
            break;
        case "Darkgreen":
            document.getElementById('stil').setAttribute('href', 'Style/Style-Darkgreen.css');
            break;
        case undefined:
            Player.color = "Darkblue";
            break;
    }
    console.log("Eingeloggte Farbe:",Player.color);
}