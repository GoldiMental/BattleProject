const Shops = {
  Names: {
    Shop_1: "von Lavazza!",
    Shop_2: "an der großen Wiese!"
  },
  Shop_1: ["Tulpaball", "Heiltrank"],
  Shop_2: ["Tulpaball", "Heiltrank", "Super_Tulpaball", "Super_Heiltrank"],
}

let activeShop = "";

async function shopHandel(SHOP) {
  console.log("Führe shopHandel(", SHOP, ") aus...");
  if (!monologBox.classList.contains("hidethis")) {
    clearInterval(moveIntervalID);
    activeShop = SHOP;
    let monologBox = document.getElementsByClassName("TrainerDialogBox")[0];
    let shopMenu = document.getElementById("shopMenu");
    monologBox.classList.toggle("hidethis", false);
    monologBox.innerHTML = "Herzlich Willkommen im Shop " + Shops.Names[SHOP]; await Delay(300); await Click();
    monologBox.innerHTML = "Wie kann ich Ihnen weiterhelfen?"; await Delay(300);
    shopMenu.classList.toggle("hidethis", false);
    console.log("shopHandel(", SHOP, ") ✅");
  }
};

function closeShop() {
  console.log("Führe closeShop() aus...");
  let monologBox = document.getElementsByClassName("TrainerDialogBox")[0];
  let shopMenu = document.getElementById("shopMenu");
  shopMenu.classList.toggle("hidethis", true); monologBox.classList.toggle("hidethis", true);
  moveIntervalID = setInterval(() => { if (activeDirection) { moveMap() }; }, moveInterval);
}

function buyItems() {
  console.log("Führe buyItems() aus...");
  let ShopBuyList = document.getElementById("ShopBuyList");
  let html = "";
  console.log("Erstelle HTML-Element...");
  document.getElementById("shopMenu").classList.toggle("hidethis", true);
  ShopBuyList.classList.toggle("hidethis", false);
  for (itm in Shops[activeShop]) {
    html += '<div style="height:50px;"><div class="producttitle">' + Item_List[Shops[activeShop][itm]].name + '</div>' +
      '<input id="qty_' + itm + '" class="number_input interactive-element" type="number" min="1" onchange="calculate(this.value ,\'product_' + itm + '\' ,' + Item_List[Shops[activeShop][itm]].price + ')" value="1">' +
      '<div class="productcost" id="product_' + itm + '">' + Item_List[Shops[activeShop][itm]].price + ' Gold</div>' +
      '<button class="BuyButton interactive-element" onclick="BuyThis(' + itm + ');Click()">Buy</button></div>';
  }
  html += '<button class="ExitBuyButton interactive-element" onclick="close_BuyList();Click()">Exit</button>';
  ShopBuyList.innerHTML = html;
  console.log("buyItems() ✅");
}

function calculate(qty, Product, Price) {
  let output = document.getElementById(Product);
  console.log("Berechnung: ", qty, " * ", Price, " Gold", " = ", qty * Price, " Gold");
  output.innerHTML = qty * Price + " Gold";
}

function close_BuyList() { document.getElementById("ShopBuyList").classList.toggle("hidethis", true); document.getElementById("shopMenu").classList.toggle("hidethis", false); }

function BuyThis(idnr) {
  console.log("Führe BuyThis(", idnr, ") aus...");
  let product = Item_List[Shops[activeShop][idnr]].name;
  let qty = document.getElementById("qty_" + idnr).value
  let price = qty * Item_List[Shops[activeShop][idnr]].price
  console.log("Spieler möchte ", qty, "x ", product, " für ", price, " Gold kaufen. Prüfe finanzielle Mittel...");
  if (Player.Gold >= price) {
    console.log("Finanzielle Mittle vorhanden. Kauf wird durchgeführt...");
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
    console.warn("Finanzielle Mittel nicht vorhanden: ", Player.Gold, " Preis: ", price, " => BuyThis(", idnr, ") stopped");
    showCustomAlert("Das scheint mir, als könntest Du Dir das nicht leisten. Wähle eine andere Menge oder ein anderes Produkt.");
  }
}


function sellItems() {
  let ShopSellList = document.getElementById("ShopSellList"); let html = "";
  document.getElementById("shopMenu").classList.toggle("hidethis", true);
  ShopSellList.classList.toggle("hidethis", false);
  for (itm in Shops[activeShop]) {
    let itemId = Shops[activeShop][itm]; let itemName = Item_List[itemId].name;
    let itemPrice = Item_List[itemId].price_sell; let playerQty = getPlayerItemQty(itemName);
    if (playerQty > 0) {
      html += '<div style="height:50px;"><div class="producttitle">' + itemName + ' (x' + playerQty + ')</div>' +
        '<input id="sellqty_' + itm + '" class="number_input interactive-element" type="number" min="1" max="' + playerQty + '" onchange="calculateSell(this.value ,\'sellproduct_' + itm + '\' ,' + itemPrice + ')" value="1">' +
        '<div class="productcost" id="sellproduct_' + itm + '">' + itemPrice + ' Gold</div>' +
        '<button class="SellButton interactive-element" onclick="SellThis(' + itm + ');Click()">Sell</button></div>';
    }
  }
  html += '<button class="ExitSellButton interactive-element" onclick="close_SellList();Click()">Exit</button>'; ShopSellList.innerHTML = html;
}

function calculateSell(qty, Product, Price) { let output = document.getElementById(Product); output.innerHTML = qty * Price + " Gold"; }

function close_SellList() { document.getElementById("ShopSellList").classList.toggle("hidethis", true); document.getElementById("shopMenu").classList.toggle("hidethis", false); }

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
  console.log("Führe SellThis(", idnr, ") aus...");
  let itemId = Shops[activeShop][idnr];
  let product = Item_List[itemId].name;
  let qty = parseInt(document.getElementById("sellqty_" + idnr).value);
  let price = qty * Item_List[itemId].price_sell;
  console.log("Spieler möchte ", qty, "x ", product, " verkaufen. Prüfe Inventar...");
  let currentQty = getPlayerItemQty(product);
  if (currentQty >= qty) {
    console.log("Produkt in der Menge verfügbar. Verkauf wird durchgeführt...");
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
    console.log("Spieler erhält: ", qty, " * ", Item_List[itemId].price_sell, " = ", price, " Gold.");
    Player.Gold += price;
    showCustomAlert("Du hast " + qty + "x " + product + " für " + price + " Gold verkauft!");
    sellItems();
  } else {
    console.warn("catched SellThis()-ERROR: Verfügbare Menge:", currentQty, " Spielereingabe:", qty, " => SellThis() stopped");
    showCustomAlert("Du hast nicht genug " + product + " zum Verkaufen.");
  }
}

async function healTulpas() {
  Player.Tulpas.Slot_1.HP = Player.Tulpas.Slot_1.HP_Total; Player.Tulpas.Slot_2.HP = Player.Tulpas.Slot_2.HP_Total;
  Player.Tulpas.Slot_3.HP = Player.Tulpas.Slot_3.HP_Total; Player.Tulpas.Slot_4.HP = Player.Tulpas.Slot_4.HP_Total;
  Player.Tulpas.Slot_5.HP = Player.Tulpas.Slot_5.HP_Total; Player.Tulpas.Slot_6.HP = Player.Tulpas.Slot_6.HP_Total;
  document.getElementsByClassName("TrainerDialogBox")[0].innerHTML = "Alle Deine Tulpas, die Du bei dir hast, wurden vollständig geheilt!";
  console.log("healTulpas() ✅"); await Delay(1500); await Click();
  document.getElementsByClassName("TrainerDialogBox")[0].innerHTML = "Wie kann ich Ihnen weiterhelfen?";
}