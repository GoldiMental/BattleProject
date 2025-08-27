const Shops = {
  Shop_1: ["Tulpaball", "Heiltrank"],
  Shop_2: ["Tulpaball", "Heiltrank", "Super_Tulpaball"],
  //weitere Shops folgen...
}

let activeShop = "";

async function shopHandel(SHOP) {
  clearInterval(moveIntervalID);
  document.getElementById("ShopHandel").classList.toggle("hidethis",true);
  activeShop = SHOP;
  let monologBox = document.getElementsByClassName("TrainerDialogBox")[0];
  let shopMenu = document.getElementById("shopMenu");
  monologBox.classList.toggle("hidethis",false);
  monologBox.innerHTML = "Herzlich Willkommen im Shop von Lavazza!"; await Delay(300); await Click();
  monologBox.innerHTML = "Wie kann ich Ihnen weiterhelfen?"; await Delay(300);
  shopMenu.classList.toggle("hidethis",false);
};

function closeShop() {
  let monologBox = document.getElementsByClassName("TrainerDialogBox")[0];
  let shopMenu = document.getElementById("shopMenu");
  shopMenu.classList.toggle("hidethis",true);
  monologBox.classList.toggle("hidethis",true);
  document.getElementById("ShopHandel").classList.toggle("hidethis",false);
  moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
}

function buyItems() {
  let ShopBuyList = document.getElementById("ShopBuyList");
  let html = "";
  document.getElementById("shopMenu").classList.toggle("hidethis",true);
  ShopBuyList.classList.toggle("hidethis",false);
  for (itm in Shops[activeShop]) {
    html += '<div style="height:50px;"><div class="producttitle">' + Item_List[Shops[activeShop][itm]].name + '</div>' +
      '<input id="qty_' + itm + '" class="number_input" type="number" min="1" onchange="calculate(this.value ,\'product_' + itm + '\' ,' + Item_List[Shops[activeShop][itm]].price + ')" value="1">' +
      '<div class="productcost" id="product_' + itm + '">' + Item_List[Shops[activeShop][itm]].price + ' Gold</div>' +
      '<button class="BuyButton" onclick="BuyThis(' + itm + ');Click()">Buy</button></div>';
  }
  html += '<button class="ExitBuyButton" onclick="close_BuyList();Click()">Exit</button>';
  ShopBuyList.innerHTML = html;
}

function calculate(qty, Product, Price) {
  let output = document.getElementById(Product);
  output.innerHTML = qty * Price + " Gold";
}

function close_BuyList() {
  document.getElementById("ShopBuyList").classList.toggle("hidethis",true);
  document.getElementById("shopMenu").classList.toggle("hidethis",false);
}

function BuyThis(idnr) {
  let product = Item_List[Shops[activeShop][idnr]].name;
  let qty = document.getElementById("qty_" + idnr).value
  let price = qty * Item_List[Shops[activeShop][idnr]].price
  if (Player.Gold >= price) {
    switch (product) {
      case "Tulpaball":
        Player.inventory.balls.Tulpaball += parseInt(qty); break;
      case "Super Tulpaball":
        Player.inventory.balls.Super_Tulpaball += parseInt(qty); break;
      case "Hyper Tulpaball":
        Player.inventory.balls.Hyper_Tulpaball += parseInt(qty); break;
      case "Ultra Tulpaball":
        Player.inventory.balls.Ultra_Tulpaball += parseInt(qty); break;
      case "Heiltrank":
        Player.inventory.drinks.Heiltrank += parseInt(qty); break;
      case "Super Heiltrank":
        Player.inventory.drinks.Super_Heiltrank += parseInt(qty); break;
      case "Manatrank":
        Player.inventory.drinks.Manatrank += parseInt(qty); break;
      case "Super Manatrank":
        Player.inventory.drinks.Super_Manatrank += parseInt(qty); break;
      case "Bonbon":
        Player.inventory.bonbons.Bonbon += parseInt(qty); break;
      case "Super Bonbon":
        Player.inventory.bonbons.Super_Bonbon += parseInt(qty); break;
      case "Hyper Bonbon":
        Player.inventory.bonbons.Hyper_Bonbon += parseInt(qty); break;
      default:
        break;
    }
    Player.Gold -= price;
    showCustomAlert("Du hast " + qty + "x " + product + " für " + price + " Gold erhalten!");
  } else {
    showCustomAlert("Das scheint mir, als könntest Du dir das nicht leisten.")
  }
}


function sellItems() {
  let ShopSellList = document.getElementById("ShopSellList");
  let html = "";
  document.getElementById("shopMenu").classList.toggle("hidethis",true);
  ShopSellList.classList.toggle("hidethis",false);

  for (itm in Shops[activeShop]) {
    let itemId = Shops[activeShop][itm];
    let itemName = Item_List[itemId].name;
    let itemPrice = Item_List[itemId].price_sell;
    let playerQty = getPlayerItemQty(itemName);

    if (playerQty > 0) {
      html += '<div style="height:50px;"><div class="producttitle">' + itemName + ' (x' + playerQty + ')</div>' +
        '<input id="sellqty_' + itm + '" class="number_input" type="number" min="1" max="' + playerQty + '" onchange="calculateSell(this.value ,\'sellproduct_' + itm + '\' ,' + itemPrice + ')" value="1">' +
        '<div class="productcost" id="sellproduct_' + itm + '">' + itemPrice + ' Gold</div>' +
        '<button class="SellButton" onclick="SellThis(' + itm + ');Click()">Sell</button></div>';
    }
  }

  html += '<button class="ExitSellButton" onclick="close_SellList();Click()">Exit</button>';
  ShopSellList.innerHTML = html;
}

function calculateSell(qty, Product, Price) {
  let output = document.getElementById(Product);
  output.innerHTML = qty * Price + " Gold";
}

function close_SellList() {
  document.getElementById("ShopSellList").classList.toggle("hidethis",true);
  document.getElementById("shopMenu").classList.toggle("hidethis",false);
}

function getPlayerItemQty(itemName) {
  switch (itemName) {
    case "Tulpaball": return Player.inventory.balls.Tulpaball;
    case "Super Tulpaball": return Player.inventory.balls.Super_Tulpaball;
    case "Hyper Tulpaball": return Player.inventory.balls.Hyper_Tulpaball;
    case "Ultra Tulpaball": return Player.inventory.balls.Ultra_Tulpaball;
    case "Heiltrank": return Player.inventory.drinks.Heiltrank;
    case "Super Heiltrank": return Player.inventory.drinks.Super_Heiltrank;
    case "Manatrank": return Player.inventory.drinks.Manatrank;
    case "Super Manatrank": return Player.inventory.drinks.Super_Manatrank;
    case "Bonbon": return Player.inventory.bonbons.Bonbon;
    case "Super Bonbon": return Player.inventory.bonbons.Super_Bonbon;
    case "Hyper Bonbon": return Player.inventory.bonbons.Hyper_Bonbon;
    default: return 0;
  }
}

function SellThis(idnr) {
  let itemId = Shops[activeShop][idnr];
  let product = Item_List[itemId].name;
  let qty = parseInt(document.getElementById("sellqty_" + idnr).value);
  let price = qty * Item_List[itemId].price_sell;

  let currentQty = getPlayerItemQty(product);

  if (currentQty >= qty) {
    switch (product) {
      case "Tulpaball":
        Player.inventory.balls.Tulpaball -= qty; break;
      case "Super Tulpaball":
        Player.inventory.balls.Super_Tulpaball -= qty; break;
      case "Hyper Tulpaball":
        Player.inventory.balls.Hyper_Tulpaball -= qty; break;
      case "Ultra Tulpaball":
        Player.inventory.balls.Ultra_Tulpaball -= qty; break;
      case "Heiltrank":
        Player.inventory.drinks.Heiltrank -= qty; break;
      case "Super Heiltrank":
        Player.inventory.drinks.Super_Heiltrank -= qty; break;
      case "Manatrank":
        Player.inventory.drinks.Manatrank -= qty; break;
      case "Super Manatrank":
        Player.inventory.drinks.Super_Manatrank -= qty; break;
      case "Bonbon":
        Player.inventory.bonbons.Bonbon -= qty; break;
      case "Super Bonbon":
        Player.inventory.bonbons.Super_Bonbon -= qty; break;
      case "Hyper Bonbon":
        Player.inventory.bonbons.Hyper_Bonbon -= qty; break;
      default:
        break;
    }
    Player.Gold += price;
    showCustomAlert("Du hast " + qty + "x " + product + " für " + price + " Gold verkauft!");
    sellItems();
  } else {
    showCustomAlert("Du hast nicht genug " + product + " zum Verkaufen.");
  }
}

async function healTulpas() {
  Player.Tulpas.Slot_1.HP = Player.Tulpas.Slot_1.HP_Total;
  Player.Tulpas.Slot_2.HP = Player.Tulpas.Slot_2.HP_Total;
  Player.Tulpas.Slot_3.HP = Player.Tulpas.Slot_3.HP_Total;
  Player.Tulpas.Slot_4.HP = Player.Tulpas.Slot_4.HP_Total;
  Player.Tulpas.Slot_5.HP = Player.Tulpas.Slot_5.HP_Total;
  Player.Tulpas.Slot_6.HP = Player.Tulpas.Slot_6.HP_Total;
  document.getElementsByClassName("TrainerDialogBox")[0].innerHTML = "Alle Deine Tulpas, die Du bei dir hast, wurden vollständig geheilt!"; await Delay(2500); await Click();
  document.getElementsByClassName("TrainerDialogBox")[0].innerHTML = "Wie kann ich Ihnen weiterhelfen?";
}