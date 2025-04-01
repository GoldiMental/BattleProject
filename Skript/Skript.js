let mapX = 0;
let mapY = 0;
const moveSpeed = 50;
const moveInterval = 300;
let activeDirection = null;

function moveMap() {
    const bg = document.querySelector('.map');
    const player = document.getElementById('user');
    let direction = "";
    if (activeDirection==="w") {
        direction = "up";
        mapY += moveSpeed;
    }
    else if (activeDirection==='s') {
        direction = "down";
        mapY -= moveSpeed;
    }
    if (activeDirection==='a') {
        direction = "left";
        mapX += moveSpeed;
    }
    if (activeDirection==='d') {
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