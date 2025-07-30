const products = [
    { name: "เสื้อยืด", price: 250, image: "https://via.placeholder.com/300x200?text=เสื้อยืด" },
    { name: "กระเป๋า", price: 350, image: "https://via.placeholder.com/300x200?text=กระเป๋า" },
    { name: "แก้ว", price: 150, image: "https://via.placeholder.com/300x200?text=แก้ว" },
    { name: "หมวก", price: 180, image: "https://via.placeholder.com/300x200?text=หมวก" },
    { name: "ร่ม", price: 290, image: "https://via.placeholder.com/300x200?text=ร่ม" },
    { name: "เข็มกลัด", price: 90, image: "https://via.placeholder.com/300x200?text=เข็มกลัด" },
    { name: "สมุด", price: 120, image: "https://via.placeholder.com/300x200?text=สมุด" },
    { name: "ปากกา", price: 60, image: "https://via.placeholder.com/300x200?text=ปากกา" }
];

let cart = [];

function renderProducts() {
    const list = document.getElementById("product-list");
    list.innerHTML = "";
    products.forEach((p, i) => {
        list.innerHTML += `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}" />
            <h4>${p.name}</h4>
            <p>${p.price} บาท</p>
            <button onclick="addToCart(${i})">เพิ่มใส่ตะกร้า</button>
        </div>`;
    });
}

function addToCart(index) {
    cart.push(products[index]);
    renderCart();
}

function renderCart() {
    const container = document.getElementById("cart-items");
    container.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
        container.innerHTML += `<p>${item.name} - ${item.price} บาท</p>`;
        total += item.price;
    });
    document.getElementById("cart-total").textContent = total;
}

function checkout() {
    alert("ยังไม่เชื่อมต่อระบบ Payment Gateway");
}

renderProducts();
