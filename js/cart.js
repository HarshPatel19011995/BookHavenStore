/* ============================
   ADD TO CART
============================= */

// Select all Add to Cart buttons
document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", function () {

        let card = this.closest(".book-card");

        let name = card.querySelector(".book-name").innerText;
        let price = card.querySelector(".book-price").innerText.replace("$", "").trim();
        let img = card.querySelector(".book-cover").src;

        // Get existing cart or empty array
        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        // Create cart item object
        let item = { name, price, img };

        // Add item to cart
        cart.push(item);

        // Save updated cart back to sessionStorage
        sessionStorage.setItem("cart", JSON.stringify(cart));

        alert(`${name} added to cart!`);
    });
});

/* ============================
   GALLERY PAGE: View Cart Button
============================= */

const viewCartBtn = document.querySelector(".view-cart-btn");

if (viewCartBtn) {
    viewCartBtn.addEventListener("click", (e) => {
        e.preventDefault();   // stop page reload

        cartIcon.click();     // open modal using cart icon logic
    });
}

/* ============================
   ADD TO CART (GALLERY PAGE)
============================= */

document.querySelectorAll(".gallery-add-btn").forEach(btn => {
    btn.addEventListener("click", function () {

        let row = this.closest(".gallery-row-item");

        let name = row.querySelector(".gallery-desc-col h3").innerText;
        let desc = row.querySelector(".gallery-desc-col p").innerText;
        let img = row.querySelector(".gallery-img-col img").src;

        // no price in gallery cards → optional default price
        let price = ""; 

        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        let item = { name, desc, price, img };

        cart.push(item);

        sessionStorage.setItem("cart", JSON.stringify(cart));

        alert(`${name} added to cart!`);
    });
});

/* ============================
   OPEN CART MODAL
============================= */

// ELEMENTS
const cartIcon = document.querySelector(".cart-icon");
const cartModal = document.getElementById("cartModal");
const cartItemsDiv = document.getElementById("cartItems");
const clearCartBtn = document.getElementById("clearCartBtn");

// When clicking the cart icon
cartIcon.addEventListener("click", () => {

    cartModal.style.display = "block";  // SHOW MODAL

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    cartItemsDiv.innerHTML = ""; // Clear previous items

    // If no items in cart
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    // Display each item as styled card
    cart.forEach((item, index) => {
        cartItemsDiv.innerHTML += `
            <div class="cart-item-card">

                <div class="cart-item-left">
                    <img src="${item.img}" class="cart-book-img">
                </div>

                <div class="cart-item-middle">
                    <h3 class="cart-book-title">${item.name}</h3>

                    ${item.desc ? `<p class="cart-book-desc">${item.desc}</p>` : ""}

                    ${item.price && item.price !== "" 
                        ? `<p class="cart-book-price">$${item.price}</p>` 
                        : ``}

                </div>

                <button class="remove-btn" data-index="${index}">×</button>
            </div>
        `;
    });

    // Add remove button functionality
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", function () {

            let index = this.dataset.index;

            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

            cart.splice(index, 1); // remove item

            sessionStorage.setItem("cart", JSON.stringify(cart));

            cartIcon.click(); // refresh modal
        });
    });
});




/* ============================
   CLEAR CART
============================= */

clearCartBtn.addEventListener("click", () => {
    sessionStorage.removeItem("cart");
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
});



/* ============================
   CLOSE CART MODAL
============================= */

document.getElementById("closeCartBtn").addEventListener("click", () => {
    cartModal.style.display = "none";
});



