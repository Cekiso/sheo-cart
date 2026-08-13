const products = [
    {
        id: 1,
        tatle: "Air Force",
        price: 1800,
        colors: [
            { code: "white", img: "img/airforcewhite.png" },
            { code: "red", img: "img/airforcered.png" },
        ],
    },
    {
        id: 2,
        tatle: "Dunck",
        price: 2800,
        colors: [
            { code: "brown", img: "img/dunckbrown.png" },
            { code: "maroon", img: "img/dunckmeron.png" },
        ],
    },
    {
        id: 3,
        tatle: "Jordan",
        price: 3100,
        colors: [
            { code: "blue", img: "img/jordanblue.png" },
            { code: "yellow", img: "img/jordanyellow.png" },
        ],
    },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        wrapper.style.transform = `translateX(${-100 * index}vw)`;

        choosenProduct = products[index];

        currentProductTitle.textContent = choosenProduct.tatle;
        currentProductPrice.textContent = "R" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;

        currentProductColors.forEach((color, i) => {
            color.style.backgroundColor = choosenProduct.colors[i].code;
        });
    });
});

currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
        currentProductImg.src = choosenProduct.colors[index].img;
    });
});

currentProductSizes.forEach((size) => {
    size.addEventListener("click", () => {
        currentProductSizes.forEach((s) => {
            s.style.backgroundColor = "white";
            s.style.color = "black";
        });
        size.style.backgroundColor = "black";
        size.style.color = "white";
    });
});

// ---- PAYMENT MODAL ELEMENTS ----
const productButton = document.querySelector("#buyProductBtn");
const payment = document.querySelector("#payment");
const close = document.querySelector("#closePayment");
const paymentOverlay = document.querySelector("#paymentOverlay");
const payButton = document.querySelector("#payButton");
const successOverlay = document.querySelector("#successOverlay");
const successClose = document.querySelector("#successClose");

function openPayment() {
    payment.style.display = "flex";
    paymentOverlay.classList.add("open");
}

function closePayment() {
    payment.style.display = "none";
    paymentOverlay.classList.remove("open");
}

function openSuccess() {
    payment.style.display = "none";
    paymentOverlay.classList.remove("open");
    successOverlay.classList.add("open");
}

function closeSuccess() {
    successOverlay.classList.remove("open");
}

close.addEventListener("click", closePayment);
paymentOverlay.addEventListener("click", closePayment);
successClose.addEventListener("click", closeSuccess);

payButton.addEventListener("click", () => {
    const name = document.querySelector("#payName").value.trim();
    const phone = document.querySelector("#payPhone").value.trim();
    const address = document.querySelector("#payAddress").value.trim();
    const cardNumber = document.querySelector("#payCardNumber").value.trim();
    const mm = document.querySelector("#payMM").value.trim();
    const yyyy = document.querySelector("#payYYYY").value.trim();
    const cvv = document.querySelector("#payCVV").value.trim();

    if (!name || !phone || !address || !cardNumber || !mm || !yyyy || !cvv) {
        alert("Please fill in all fields before checking out.");
        return;
    }

    cart = [];
    saveCart();
    renderCart();
    openSuccess();
});

// ---- CART STATE ----
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartIcon = document.querySelector(".cart-icon");
const cartDrawer = document.querySelector(".cart-drawer");
const cartOverlay = document.querySelector(".cart-overlay");
const cartClose = document.querySelector(".cart-close");
const cartItemsEl = document.querySelector(".cart-items");
const cartCountEl = document.querySelector(".cart-count");
const cartTotalEl = document.querySelector(".cart-total");
const checkoutBtn = document.querySelector(".checkout-btn");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
    const existing = cart.find((item) => item.name === product.name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    renderCart();
    openCart();
}

function removeFromCart(name) {
    cart = cart.filter((item) => item.name !== name);
    saveCart();
    renderCart();
}

function changeQty(name, delta) {
    const item = cart.find((item) => item.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(name);
    } else {
        saveCart();
        renderCart();
    }
}

function renderCart() {
    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
        cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
    }

    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.qty;

        const itemEl = document.createElement("div");
        itemEl.classList.add("cart-item");
        itemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <p><strong>${item.name}</strong></p>
        <p>R ${item.price} x ${item.qty}</p>
        <div class="qty-controls">
          <button class="decrease">-</button>
          <span>${item.qty}</span>
          <button class="increase">+</button>
        </div>
      </div>
      <button class="remove-item">&times;</button>
    `;

        itemEl.querySelector(".increase").addEventListener("click", () => changeQty(item.name, 1));
        itemEl.querySelector(".decrease").addEventListener("click", () => changeQty(item.name, -1));
        itemEl.querySelector(".remove-item").addEventListener("click", () => removeFromCart(item.name));

        cartItemsEl.appendChild(itemEl);
    });

    cartTotalEl.textContent = total;
    cartCountEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
}

function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
}

cartIcon.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// ---- WIRE UP SLIDER "BUY NOW" BUTTONS ----
document.querySelectorAll(".buyButton").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const product = products[index];
        addToCart({
            name: product.tatle,
            price: product.price,
            img: product.colors[0].img,
        });
    });
});

// ---- WIRE UP MAIN "BUY NOW" BUTTON ----
productButton.addEventListener("click", () => {
    addToCart({
        name: choosenProduct.tatle,
        price: choosenProduct.price,
        img: currentProductImg.src,
    });
});

// ---- CHECKOUT ----
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    closeCart();
    openPayment();
});

// ---- INIT ----
renderCart();