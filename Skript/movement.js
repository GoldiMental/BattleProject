let mapX = -25;
let mapY = -25;
const moveSpeed = 50;
const moveInterval = 300;
let activeDirection = null;

let map_size = window.getComputedStyle(document.querySelector(".map"));


let minX = -(parseInt(map_size.width)-500)  //Linke Grenze
let maxX = 0;   // Rechte Grenze
let minY = -(parseInt(map_size.height)-500)  // Obere Grenze
let maxY = 0;   // Untere Grenze

function refreshMap() {
    map_size = window.getComputedStyle(document.querySelector(".map"));


    minX = -(parseInt(map_size.width)-500);  //Linke Grenze
    maxX = 0;   // Rechte Grenze
    minY = -(parseInt(map_size.height)-500);  // Obere Grenze
    maxY = 0;   // Untere Grenze

}

function moveMap() {
    const bg = document.querySelector('.map');
    const player = document.getElementById('user');
    let direction = "";
    if (activeDirection==="w" && mapY + moveSpeed <= maxY) {
        direction = "up";
        mapY += moveSpeed;
    }
    else if (activeDirection==='s' && mapY - moveSpeed >= minY) {
        direction = "down";
        mapY -= moveSpeed;
    }
    if (activeDirection==='a' && mapX + moveSpeed <= maxX) {
        direction = "left";
        mapX += moveSpeed;
    }
    if (activeDirection==='d' && mapX - moveSpeed >= minX) {
        direction = "right";
        mapX -= moveSpeed;
    }
    if(direction) {
        player.className = 'Player m_'+direction;
    }
    bg.style.left = mapX + 'px';
    bg.style.top = mapY + 'px';
}

function stopMovement(){
    const player = document.getElementById('user');
    if(player.className.startsWith('Player m_')){
        let lastDir = player.className.split('_')[1];
        player.className = 'Player '+lastDir;
    } else {player.className = 'Player down';}
}

document.addEventListener('keydown', (event) => {
    if(event.key==='w'||event.key==='s'||event.key==='d'||event.key ==='a'){
        activeDirection = event.key;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === activeDirection){
        activeDirection = null;
        stopMovement();
    }
});

setInterval(()=>{
    if(activeDirection){moveMap()};
},moveInterval);