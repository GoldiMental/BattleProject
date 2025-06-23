const Shops = {
  Shop_1: ["Tulpaball","Heiltrank"]
}

async function shopHandel() {
  clearInterval(moveIntervalID);
  let monologBox = document.getElementsByClassName("TrainerDialogBox")[0];
  let shopMenu = document.getElementById("shopMenu");
  monologBox.style.visibility = "visible";
  monologBox.innerHTML = "Herzlich Willkommen im Shop von Lavazza!"
  await Click();
  monologBox.innerHTML = "Wie kann ich Ihnen weiterhelfen?"
  shopMenu.style.visibility = "visible";
};

function closeShop() {
  let monologBox = document.getElementsByClassName("TrainerDialogBox")[0];
  let shopMenu = document.getElementById("shopMenu");
  shopMenu.style.visibility = "hidden";
  monologBox.style.visibility = "hidden";
  moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
}

