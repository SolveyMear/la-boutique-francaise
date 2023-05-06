//photo slider
const slide = [
  "./assets/images/fromage-main.jpeg",
  "./assets/images/fromage-7.jpeg",
  "./assets/images/fromage-3.jpeg",
];
let numero = 0;

function changeSlide(sens) {
  numero = numero + sens;
  if (numero < 0) numero = slide.length - 1;
  if (numero > slide.length - 1) numero = 0;
  document.getElementById("slide").src = slide[numero];
}

//change picture every 4secs
setInterval("changeSlide(1)", 4000);

//remove settings - shopping cart

const removeCartRowButton = document.getElementsByClassName("btn-danger");

for (i = 0; i < removeCartRowButton.length; i++) {
  button = removeCartRowButton[i];
  // this function creates a click event
  button.addEventListener("click", function (event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //first parentElement is cart-quantity and second parentElement is cart-row
    updateCartMegaTotal();
  });
}

function updateCartMegaTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  //get firt element of 'cart-items'
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace("€", ""));
    //this replaces the string '€' with nothing to get just a number and replace any string into a float
    let quantity = quantityElement.value;
    //get the value of the price input element and multiply it by the quantity and add to the total variable
    total = total + price * quantity;
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    total + "€";
}

//settings - to remove all shopping cart content

const removeAllItemsButton = document.getElementsByClassName("btn-mega-danger");

for (i = 0; i < removeAllItemsButton.length; i++) {
  button = removeAllItemsButton[i];
  button.addEventListener("click", function (event) {
    const cartItems = document.getElementsByClassName("cart-items")[0];
    cartItems.remove(cartItems);
    document.getElementsByClassName("cart-total-price")[0].innerText = 0 + "€";
    addElement();
  });
}

//alert window when 15 products max

const cartInputFirst = document.querySelector(".cart-quantity-input.first-row");
const cartInputSecond = document.querySelector(
  ".cart-quantity-input.second-row"
);
let firstValue = parseInt(cartInputFirst.value);
let secondValue = parseInt(cartInputSecond.value);
let newTotalValue = firstValue + secondValue;

cartInputFirst.addEventListener("change", function () {
  firstValue = parseInt(this.value);
  alertCommand();
});

cartInputSecond.addEventListener("change", function () {
  secondValue = parseInt(this.value);
  alertCommand();
});

function alertCommand() {
  updateCartMegaTotal();
  newTotalValue = firstValue + secondValue;
  if (newTotalValue >= 15) {
    alert("La quantité maximale a été atteinte!");
  }
}

//ADD TEXT WHEN CART EMPTY
function addElement() {
  const newDiv = document.createElement("div");
  newDiv.innerHTML =
    "Oh! Une petite souris est passée et a mangé tout le fromage!";
  const cartTotal = document.getElementsByClassName("cart-total")[0];
  const cartItems = document.getElementsByClassName("cart-items")[0];
  cartTotal.parentNode.insertBefore(newDiv, cartTotal.nextSibling);
  // ou
  // cartItems.appendChild(newDiv);
}
