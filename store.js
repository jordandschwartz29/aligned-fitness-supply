/* ============================================================
   STRENGTH MERCHANT — STORE LOGIC
   Handles: rendering products, the shopping cart, and page setup.
   The cart is saved in the browser (localStorage) so it survives
   page reloads. You should not need to edit this file to add
   products — edit js/products.js instead.
   ============================================================ */

/* ---------- Helpers ---------- */

function money(n) {
  return "$" + n.toFixed(2);
}

function getCategory(slug) {
  return CATEGORIES.find(c => c.slug === slug);
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function productImageHTML(product) {
  if (product.image) {
    return '<img src="' + product.image + '" alt="' + product.name + '">';
  }
  return '<span class="image-placeholder">Photo coming</span>';
}

/* ---------- Cart (stored in the browser) ---------- */

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("sm_cart")) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("sm_cart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }
  saveCart(cart);
}

function setCartQty(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    const item = cart.find(i => i.id === productId);
    if (item) item.qty = qty;
  }
  saveCart(cart);
}

function cartTotal() {
  return getCart().reduce((sum, item) => {
    const p = getProduct(item.id);
    return p ? sum + p.price * item.qty : sum;
  }, 0);
}

function updateCartBadge() {
  const badge = document.querySelector(".cart-count");
  if (!badge) return;
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  badge.classList.toggle("visible", count > 0);
}

/* ---------- Rendering ---------- */

function productCardHTML(p) {
  const cat = getCategory(p.category);
  return (
    '<a class="product-card" href="product.html?id=' + p.id + '">' +
      '<div class="product-image">' + productImageHTML(p) + '</div>' +
      '<div class="product-info">' +
        '<span class="cat-label">' + (cat ? cat.name : "") + '</span>' +
        '<h3>' + p.name + '</h3>' +
        '<span class="price">' + money(p.price) + '</span>' +
      '</div>' +
    '</a>'
  );
}

function renderProductGrid(container, products) {
  container.innerHTML = products.length
    ? products.map(productCardHTML).join("")
    : '<p class="empty-note">No products in this category yet.</p>';
}

/* ---------- Page: homepage ---------- */

function initHomePage() {
  const catGrid = document.getElementById("category-grid");
  catGrid.innerHTML = CATEGORIES.map(c => {
    const count = PRODUCTS.filter(p => p.category === c.slug).length;
    return (
      '<a class="category-tile" href="shop.html?category=' + c.slug + '">' +
        '<h3>' + c.name + '</h3>' +
        '<p>' + count + ' product' + (count === 1 ? "" : "s") + '</p>' +
      '</a>'
    );
  }).join("");

  const featured = PRODUCTS.filter(p => p.featured);
  renderProductGrid(document.getElementById("featured-grid"), featured);
}

/* ---------- Page: shop ---------- */

function initShopPage() {
  const grid = document.getElementById("shop-grid");
  const filterBar = document.getElementById("filter-bar");
  const params = new URLSearchParams(window.location.search);
  let active = params.get("category") || "all";

  function render() {
    const products = active === "all"
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === active);
    renderProductGrid(grid, products);
    filterBar.querySelectorAll("button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.cat === active);
    });
  }

  const cats = [{ slug: "all", name: "All" }].concat(CATEGORIES);
  filterBar.innerHTML = cats.map(c =>
    '<button data-cat="' + c.slug + '">' + c.name + '</button>'
  ).join("");

  filterBar.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;
    active = e.target.dataset.cat;
    history.replaceState(null, "", active === "all" ? "shop.html" : "shop.html?category=" + active);
    render();
  });

  render();
}

/* ---------- Page: product detail ---------- */

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const product = getProduct(params.get("id"));
  const el = document.getElementById("product-detail");

  if (!product) {
    el.innerHTML = '<p class="empty-note">Product not found. <a href="shop.html" style="text-decoration:underline">Back to shop</a>.</p>';
    return;
  }

  document.title = product.name + " — Strength Merchant";
  const cat = getCategory(product.category);

  el.innerHTML =
    '<div class="product-image">' + productImageHTML(product) + '</div>' +
    '<div>' +
      '<span class="cat-label" style="color:var(--accent);text-transform:uppercase;font-size:0.8rem;letter-spacing:0.1em">' + (cat ? cat.name : "") + '</span>' +
      '<h1>' + product.name + '</h1>' +
      '<div class="price">' + money(product.price) + '</div>' +
      '<p class="description">' + product.description + '</p>' +
      '<div class="qty-row">' +
        '<label for="qty">Qty</label>' +
        '<input type="number" id="qty" value="1" min="1" max="99">' +
      '</div>' +
      '<button class="btn" id="add-btn">Add to Cart</button>' +
    '</div>';

  document.getElementById("add-btn").addEventListener("click", () => {
    const qty = Math.max(1, parseInt(document.getElementById("qty").value) || 1);
    addToCart(product.id, qty);
    const btn = document.getElementById("add-btn");
    btn.textContent = "Added ✓";
    setTimeout(() => { btn.textContent = "Add to Cart"; }, 1500);
  });
}

/* ---------- Page: cart ---------- */

function initCartPage() {
  const listEl = document.getElementById("cart-items");
  const summaryEl = document.getElementById("cart-summary");

  function render() {
    const cart = getCart();

    if (cart.length === 0) {
      listEl.innerHTML = '<p class="empty-note">Your cart is empty. <a href="shop.html" style="text-decoration:underline">Go lift something into it</a>.</p>';
      summaryEl.style.display = "none";
      return;
    }
    summaryEl.style.display = "flex";

    listEl.innerHTML = cart.map(item => {
      const p = getProduct(item.id);
      if (!p) return "";
      return (
        '<div class="cart-item">' +
          '<div class="product-image">' + productImageHTML(p) + '</div>' +
          '<div><h3>' + p.name + '</h3><span style="color:var(--text-dim);font-size:0.85rem">' + money(p.price) + ' each</span></div>' +
          '<input type="number" min="0" max="99" value="' + item.qty + '" data-id="' + p.id + '" aria-label="Quantity">' +
          '<strong>' + money(p.price * item.qty) + '</strong>' +
          '<button class="remove-btn" data-remove="' + p.id + '">Remove</button>' +
        '</div>'
      );
    }).join("");

    document.getElementById("cart-total").textContent = money(cartTotal());

    listEl.querySelectorAll("input[data-id]").forEach(input => {
      input.addEventListener("change", () => {
        setCartQty(input.dataset.id, parseInt(input.value) || 0);
        render();
      });
    });
    listEl.querySelectorAll("button[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        setCartQty(btn.dataset.remove, 0);
        render();
      });
    });
  }

  document.getElementById("checkout-btn").addEventListener("click", () => {
    /* ============================================================
       STRIPE CHECKOUT GOES HERE (Week 2)
       This will send the cart to our serverless function, which
       creates a Stripe Checkout session and redirects the customer
       to Stripe's secure payment page.
       ============================================================ */
    alert("Checkout wiring comes in Week 2 — Stripe integration.");
  });

  render();
}

/* ---------- Run on every page ---------- */

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  const page = document.body.dataset.page;
  if (page === "home") initHomePage();
  if (page === "shop") initShopPage();
  if (page === "product") initProductPage();
  if (page === "cart") initCartPage();
});
