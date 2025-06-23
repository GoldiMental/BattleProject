const Shops = {
  Shop_1: ["Tulpaball", "Heiltrank"],
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
      '<input id="qty_'+itm+'" class="number_input" type="number" min="1" onchange="calculate(this.value ,\'product_' + itm + '\' ,' + Item_List[Shops[activeShop][itm]].price + ')" value="1">' +
      '<div class="productcost" id="product_' + itm + '">' + Item_List[Shops[activeShop][itm]].price + ' Gold</div>' +
      '<button class="BuyButton" onclick="BuyThis('+itm+')">Buy</button></div>';
  }
  html += '<button onclick="close_BuyList()">Exit</button>';
  ShopBuyList.innerHTML = html;
}

function calculate(qty, Product, Price) {
  console.log(qty, Product, Price)
  let output = document.getElementById(Product);
  output.innerHTML = qty * Price + " Gold";
}

function close_BuyList(){
  document.getElementById("ShopBuyList").style.visibility="hidden";
}
