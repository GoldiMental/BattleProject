const spieler = document.getElementById("spieler");
const kampfzone = document.querySelector(".kampfzone");

let posX = 0;
let posY = 0;
const schritt = 10;

function prüfeZufallsbegegnung(spielerX, spielerY, zoneX, zoneY, zoneBreite, zoneHöhe, wahrscheinlichkeit = 0.2) {
  const istInZone =
    spielerX >= zoneX &&
    spielerX <= zoneX + zoneBreite &&
    spielerY >= zoneY &&
    spielerY <= zoneY + zoneHöhe;

  if (istInZone && Math.random() < wahrscheinlichkeit) {
    return true;
  }
  return false;
}