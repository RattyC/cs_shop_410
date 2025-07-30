// assets/js/cart.js

const products = [
    {
        id: 1,
        name: "เสื้อยืด 30 ปี CSMJU",
        color: "ดำ",
        size: "M",
        price: 350,
        image: "https://via.placeholder.com/300x200?text=เสื้อดำ+M",
    },
    {
        id: 2,
        name: "กระเป๋าผ้า 30 ปี CSMJU",
        price: 150,
        image: "https://via.placeholder.com/300x200?text=กระเป๋าผ้า",
    },
    {
        id: 3,
        name: "แก้วน้ำ 30 ปี CSMJU",
        price: 120,
        image: "https://via.placeholder.com/300x200?text=แก้วน้ำ",
    },
    {
        id: 4,
        name: "หมวก 30 ปี CSMJU",
        price: 250,
        image: "https://via.placeholder.com/300x200?text=หมวก",
    },
    // เพิ่มสินค้าตามต้องการ
];

// โหลดสินค้าลงหน้า
function loadProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>ราคา: ${product.price} บาท</p>
        <button onclick="addToCart(${product.id})">เพิ่มใส่ตะกร้า</button>
    `;
        productList.appendChild(div);
    });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// เพิ่มสินค้าใส่ตะกร้า
function addToCart(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
        cartItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    renderCart();
}

// แสดงตะกร้า
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>ไม่มีสินค้าในตะกร้า</p>";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.qty;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <div class="cart-item-name">${item.name} (${item.qty} ชิ้น)</div>
        <div class="cart-actions">
            <button onclick="changeQty(${index}, -1)">-</button>
            <button onclick="changeQty(${index}, 1)">+</button>
            <button onclick="removeItem(${index})">ลบ</button>
        </div>
        <div>${item.price * item.qty} บาท</div>
    `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = total;
}

// เปลี่ยนจำนวนสินค้า
function changeQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty < 1) cart[index].qty = 1;
    saveCart();
    renderCart();
}

// ลบสินค้า
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// โหลดสินค้าและแสดงตะกร้าทันทีเมื่อโหลดหน้า
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    renderCart();
});
const availableColors = ["ดำ", "ขาว", "เทา"]; // สีที่เลือกได้

function loadProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("product-card");

        // สร้าง dropdown เลือกสี
        let colorOptions = `<select id="color-select-${product.id}">`;
        availableColors.forEach((color) => {
            colorOptions += `<option value="${color}">${color}</option>`;
        });
        colorOptions += `</select>`;

        div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>ราคา: ${product.price} บาท</p>
        <label for="color-select-${product.id}">เลือกสี: </label>
        ${colorOptions}
        <button onclick="addToCart(${product.id})">เพิ่มใส่ตะกร้า</button>
    `;
        productList.appendChild(div);
    });
}

// ปรับฟังก์ชัน addToCart ให้รับค่าสีจาก dropdown ด้วย
function addToCart(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    // ดึงสีจาก select
    const colorSelect = document.getElementById(`color-select-${id}`);
    const selectedColor = colorSelect ? colorSelect.value : null;

    // ถ้าเลือกสีไม่ได้ ให้ใช้สีเริ่มต้น (ถ้ามี)
    const color = selectedColor || (product.color ? product.color : "");

    // หาในตะกร้าถ้ามีสินค้าชื่อ+สีเดียวกัน เพิ่ม qty
    const cartItem = cart.find((item) => item.id === id && item.color === color);

    if (cartItem) {
        cartItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1, color });
    }

    saveCart();
    renderCart();
}

// แก้ไขการแสดงตะกร้า ให้แสดงสีด้วย
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>ไม่มีสินค้าในตะกร้า</p>";
        cartTotal.textContent = "0";
        document.getElementById("checkoutBtn").disabled = true;
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.qty;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <div class="cart-item-name">${item.name} (สี: ${item.color}) x ${item.qty} ชิ้น</div>
        <div class="cart-actions">
            <button onclick="changeQty(${index}, -1)">-</button>
            <button onclick="changeQty(${index}, 1)">+</button>
            <button onclick="removeItem(${index})">ลบ</button>
        </div>
        <div>${item.price * item.qty} บาท</div>
        `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = total;
    document.getElementById("checkoutBtn").disabled = false;
}
