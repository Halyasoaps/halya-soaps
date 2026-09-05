// =========================================
// HALYA SOAPS — CART & SITE INTERACTIONS
// =========================================

let cart = [];

// =========================================
// CART
// =========================================

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  // Open cart after adding
  const cartModal = document.getElementById("cartModal");

  if (cartModal) {
    cartModal.classList.add("active");
  }
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartCount || !cartTotal) return;

  // Update item count
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = totalItems;

  // Empty cart
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "0.00";
    return;
  }

  // Display cart items
  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">

      <div>
        <strong>${item.name}</strong>
        <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
      </div>

      <div class="cart-item-actions">
        <button onclick="changeQuantity(${index}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${index}, 1)">+</button>
        <button onclick="removeFromCart(${index})">×</button>
      </div>

    </div>
  `).join("");

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartTotal.textContent = total.toFixed(2);
}

function changeQuantity(index, amount) {
  if (!cart[index]) return;

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// =========================================
// CART MODAL
// =========================================

const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");

if (cartBtn && cartModal) {
  cartBtn.addEventListener("click", () => {
    cartModal.classList.add("active");
  });
}

if (closeCart && cartModal) {
  closeCart.addEventListener("click", () => {
    cartModal.classList.remove("active");
  });
}

// Close when clicking outside cart
if (cartModal) {
  cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal) {
      cartModal.classList.remove("active");
    }
  });
}

// =========================================
// CHECKOUT
// =========================================

// =========================================
// CHECKOUT
// =========================================
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  // Open Stripe Checkout
  window.location.href =
    "https://buy.stripe.com/aFacN7b7w6KIdKB6f01RC00";
}
// =========================================
// NEWSLETTER
// =========================================

function subscribe(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const subscribeMsg = document.getElementById("subscribeMsg");

  if (!emailInput || !subscribeMsg) return;

  const email = emailInput.value.trim();

  if (email === "") return;

  subscribeMsg.textContent =
    "Thank you for joining the HALYA list.";

  emailInput.value = "";
}

// =========================================
// MOBILE MENU
// =========================================

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector("nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("active");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen
    );
  });
}

// =========================================
// INITIALIZE
// =========================================

updateCart();
