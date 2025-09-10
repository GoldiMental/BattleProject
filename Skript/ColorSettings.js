function setcolor() {
    let color = Player.color;
    switch (color) {
        case "Dark": document.getElementById('stil').setAttribute('href', 'Style/Dark.css'); break;
        case "Darkblue": document.getElementById('stil').setAttribute('href', 'Style/Darkblue.css'); break;
        case "Darkviolett": document.getElementById('stil').setAttribute('href', 'Style/Darkviolett.css'); break;
        case "Darkred": document.getElementById('stil').setAttribute('href', 'Style/Darkred.css'); break;
        case "Darkgreen": document.getElementById('stil').setAttribute('href', 'Style/Darkgreen.css'); break;
        case "Lightblue": document.getElementById('stil').setAttribute('href', 'Style/Lightblue.css'); break;
        case "Lightviolett": document.getElementById('stil').setAttribute('href', 'Style/Lightviolett.css'); break;
        case "Lightred": document.getElementById('stil').setAttribute('href', 'Style/Lightred.css'); break;
        case "Lightgreen": document.getElementById('stil').setAttribute('href', 'Style/Lightgreen.css'); break;
        case "Light": document.getElementById('stil').setAttribute('href', 'Style/Light.css'); break;
        case undefined: Player.color = "Darkblue"; break;
    }
    console.log("Farbe:", Player.color);
}

document.getElementById("FullscreenOption").addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
            .catch(err => { console.warn("FullscreenOption()-ERROR:", err.message) });
        document.getElementById("ScreenOption").src = "img/tabscreen.svg";
    }
    else {
        document.exitFullscreen()
            .catch(err => { console.warn("FullscreenOption()-ERROR:", err.message) });
        document.getElementById("ScreenOption").src = "img/fullscreen.svg";
    }
});

document.getElementById("LogoOption").addEventListener('click', () => {
    document.getElementById("TulpaGameLogo").classList.toggle("hidethis");
});

let currentScale = 1;
document.getElementById("ZoomInOption").addEventListener('click', () => {
    currentScale += 0.1;
    document.querySelector('.Playground').style.transform = 'scale(' + currentScale + ') !important';
});

document.getElementById("ZoomOutOption").addEventListener('click', () => {
    currentScale -= 0.1;
    document.querySelector('.Playground').style.transform = 'scale(' + currentScale + ') !important';
});