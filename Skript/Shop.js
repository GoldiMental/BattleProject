const Shops = {
  Shop_1: ["Tulpaball", "Heiltrank", "Hyper_Tulpaball"],
  Shop_2: ["Tulpaball", "Heiltrank", "Super_Tulpaball"],
}

let activeShop = "";

async function shopHandel(SHOP) {
  clearInterval(moveIntervalID);
  activeShop = SHOP;
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

function buyItems() {
  let ShopBuyList = document.getElementById("ShopBuyList");
  let html = "";
  ShopBuyList.style.visibility = "visible";
  for (itm in Shops[activeShop]) {
    html += '<div style="height:50px;"><div class="producttitle">' + Item_List[Shops[activeShop][itm]].name + '</div>' +
      '<input id="qty_' + itm + '" class="number_input" type="number" min="1" onchange="calculate(this.value ,\'product_' + itm + '\' ,' + Item_List[Shops[activeShop][itm]].price + ')" value="1">' +
      '<div class="productcost" id="product_' + itm + '">' + Item_List[Shops[activeShop][itm]].price + ' Gold</div>' +
      '<button class="BuyButton" onclick="BuyThis(' + itm + ')">Buy</button></div>';
  }
  html += '<button class="ExitBuyButton" onclick="close_BuyList()">Exit</button>';
  ShopBuyList.innerHTML = html;
}

function calculate(qty, Product, Price) {
  let output = document.getElementById(Product);
  output.innerHTML = qty * Price + " Gold";
}

function close_BuyList() {
  document.getElementById("ShopBuyList").style.visibility = "hidden";
}

function BuyThis(idnr) {
  let product = Item_List[Shops[activeShop][idnr]].name;
  let qty = document.getElementById("qty_" + idnr).value
  let price = qty * Item_List[Shops[activeShop][idnr]].price
  if (Player.Gold >= price) {
    switch (product) {
      case "Tulpaball":
        Player.inventory.balls.Tulpaball += parseInt(qty);
        break;
      case "Super Tulpaball":
        Player.inventory.balls.Super_Tulpaball += parseInt(qty);
        break;
      case "Hyper Tulpaball":
        Player.inventory.balls.Hyper_Tulpaball += parseInt(qty);
        break;
      case "Ultra Tulpaball":
        Player.inventory.balls.Ultra_Tulpaball += parseInt(qty);
        break;
      case "Heiltrank":
        Player.inventory.drinks.Heiltrank += parseInt(qty);
        break;
      case "Super Heiltrank":
        Player.inventory.drinks.Super_Heiltrank += parseInt(qty);
        break;
      case "Manatrank":
        Player.inventory.drinks.Manatrank += parseInt(qty);
        break;
      case "Super Manatrank":
        Player.inventory.drinks.Super_Manatrank += parseInt(qty);
        break;
      case "Bonbon":
        Player.inventory.bonbons.Bonbon += parseInt(qty);
        break;
      case "Super Bonbon":
        Player.inventory.bonbons.Super_Bonbon += parseInt(qty);
        break;
      case "Hyper Bonbon":
        Player.inventory.bonbons.Hyper_Bonbon += parseInt(qty);
        break;
      default:
        break;
    }
    Player.Gold -= price;
    setCookie("PlayerData", JSON.stringify(Player), 30);
    showCustomAlert("Du hast " + qty + "x " + product + " für " + price + " Gold erhalten!");
  } else {
    showCustomAlert("Das scheint mir, als könntest Du dir das nicht leisten.")
  }
}
