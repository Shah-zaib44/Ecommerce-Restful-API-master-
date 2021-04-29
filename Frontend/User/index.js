if (
  document.querySelector(".title").lastElementChild.innerText ===
  "SHOPPING CART "
) {
  console.log("user is logge in");
} else {
  console.log("user is logged out");
}
document.querySelector("#ml-webforms-popup-3482830").style.display = "none";
document.addEventListener("DOMContentLoaded", getProductFromLocalStorage);
document.addEventListener("DOMContentLoaded", showProducts);

function showProducts() {
  (async () => {
    const result = await fetch("http://localhost:5000/api/v1/products", {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5000/api/v1/products",
      },
    });

    const article = await result.json();

    let i = 0;
    while (i < article.data.recordset.length) {
      let a = `<div class="shop-item col-4">
        <span class="shop-item-title">${article.data.recordset[i].product_title}</span>
        <img class="shop-item-image" src="../../public/uploads/${article.data.recordset[i].product_image}">
        <div class="shop-item-details mb-2">
            <span class="shop-item-price ">${article.data.recordset[i].product_price}</span>
            </div>
            <button class="btn btn-primary shop-item-button mb-5" type="button">ADD TO CART</button>
                        </div>`;
      let b = document.querySelector(".shop-items");
      b.innerHTML += a;
      i++;
    }

    let addToCartButtons = document.querySelectorAll(".shop-item-button");
    for (let i = 0; i < addToCartButtons.length; i++) {
      let button = addToCartButtons[i];
      button.addEventListener("click", addToCartClicked);
    }

    let removeCartItemButtons = document.querySelectorAll(".btn-danger");
    for (let i = 0; i < removeCartItemButtons.length; i++) {
      let button = removeCartItemButtons[i];
      button.addEventListener("click", removeCartItem);
    }

    let quantityInputs = document.querySelectorAll(".cart-quantity-input");
    for (let i = 0; i < quantityInputs.length; i++) {
      let input = quantityInputs[i];
      input.addEventListener("change", quantityChanged);
    }

    document
      .querySelector(".btn-purchase")
      .addEventListener("click", purchaseClicked);
  })();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement;
  let title = shopItem.querySelector(".shop-item-title").innerText;
  let price = shopItem.querySelector(".shop-item-price").innerText;
  let imageSrc = shopItem.querySelector(".shop-item-image").src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  let cartItemTitle =
    buttonClicked.parentElement.parentElement.firstElementChild.lastElementChild
      .innerText;
  removeProductFromLocalStorage(cartItemTitle);
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.parentElement.parentElement.remove();
    let cartItemTitle =
      input.parentElement.parentElement.firstElementChild.lastElementChild
        .innerText;
    removeProductFromLocalStorage(cartItemTitle);
  }
  updateCartTotal();
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  let cartItems = document.querySelector(".cart-items");
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.querySelector(".cart-items");
  let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  setProductInLocalStorage(title, price, imageSrc);
  let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);

  cartRow
    .querySelector(".btn-danger")
    .addEventListener("click", removeCartItem);
  cartRow
    .querySelector(".cart-quantity-input")
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  let cartItemContainer = document.querySelector(".cart-items");

  let cartRows = cartItemContainer.querySelectorAll(".cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.querySelector(".cart-price");

    let quantityElement = cartRow.querySelector(".cart-quantity-input");
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.querySelector(".cart-total-price").innerText = "$" + total;
}

function setProductInLocalStorage(title, price, imageSrc) {
  let product;
  if (localStorage.getItem("product") === null) {
    product = [];
  } else {
    product = JSON.parse(localStorage.getItem("product"));
  }
  product.push({
    product_title: title,
    product_price: price,
    product_image: imageSrc,
  });
  localStorage.setItem("product", JSON.stringify(product));
}

function getProductFromLocalStorage() {
  let products;
  if (localStorage.getItem("product") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }
  products = JSON.parse(localStorage.getItem("product"));
  for (let i = 0; i < products.length; i++) {
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    let cartItems = document.querySelector(".cart-items");
    let cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${products[i].product_image}" width="100" height="100">
        <span class="cart-item-title">${products[i].product_title}</span>
    </div>
    <span class="cart-price cart-column">${products[i].product_price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    cartRow
      .querySelector(".btn-danger")
      .addEventListener("click", removeCartItem);
    cartRow
      .querySelector(".cart-quantity-input")
      .addEventListener("change", quantityChanged);
  }
  updateCartTotal();
}

function removeProductFromLocalStorage(cartItemTitle) {
  let products;
  if (localStorage.getItem("product") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("product"));
  }
  products.forEach(function (product, index) {
    if (product.product_title == cartItemTitle) {
      products.splice(index, 1);
    }
  });
  localStorage.setItem("product", JSON.stringify(products));
}
