const products = [
  { id: 1, name: "سماعة بلوتوث", price: 150, image: "https://via.placeholder.com/300x180?text=سماعة" },
  { id: 2, name: "ساعة ذكية", price: 300, image: "https://via.placeholder.com/300x180?text=ساعة" },
  { id: 3, name: "لابتوب", price: 2000, image: "https://via.placeholder.com/300x180?text=لابتوب" },
  { id: 4, name: "كاميرا", price: 800, image: "https://via.placeholder.com/300x180?text=كاميرا" },
];

const container = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(filtered = products) {
  container.innerHTML = "";
  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>السعر: ${product.price} ريال</p>
      <button onclick="addToCart(${product.id})">أضف إلى السلة</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  const item = cart.find((p) => p.id === id);
  if (item) {
    item.qty += 1;
  } else {
    const product = products.find((p) => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  cartCount.textContent = cart.reduce((sum, p) => sum + p.qty, 0);
}

searchInput.addEventListener("input", (e) => {
  const val = e.target.value.trim();
  const filtered = products.filter(p => p.name.includes(val));
  renderProducts(filtered);
});

// أول تحميل
renderProducts();
updateCartCount();