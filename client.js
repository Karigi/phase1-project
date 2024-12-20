// Select elements for modal and content
const clientLoginModal = document.getElementById("clientLoginModal");
const clientRegisterModal = document.getElementById("clientRegisterModal");
const blurredContent = document.getElementById("clientContent");
const motorcyclesContainer = document.getElementById("motorcyclesContainer");

// Select login and register buttons
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

// Open modals when buttons are clicked
loginBtn.addEventListener("click", () => clientLoginModal.classList.remove("hidden"));
registerBtn.addEventListener("click", () => clientRegisterModal.classList.remove("hidden"));

// Close modals
document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        clientLoginModal.classList.add("hidden");
        clientRegisterModal.classList.add("hidden");
    });
});

// Handle client login
document.getElementById("clientLoginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("clientLoginUsername").value;
    const password = document.getElementById("clientLoginPassword").value;

    // Fetch users from db.json via json-server
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    // Find the matching user
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert("Login successful!");
        blurredContent.classList.remove("blur");
        clientLoginModal.classList.add("hidden");

        // Fetch and display motorcycles after login
        fetchMotorcycles();
    } else {
        alert("Invalid login credentials!");
    }
});

// Handle client registration
document.getElementById("clientRegisterForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUser = {
        username: document.getElementById("clientRegisterUsername").value,
        password: document.getElementById("clientRegisterPassword").value
    };

    // Register new user to db.json
    await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });
    alert("Registration successful! Please login.");
    clientRegisterModal.classList.add("hidden");
});

// Fetch motorcycles from db.json and display them
async function fetchMotorcycles() {
    const response = await fetch("http://localhost:3000/motorcycles");
    const motorcycles = await response.json();

    // Clear the previous list
    motorcyclesContainer.innerHTML = "";

    // Loop through the motorcycles and display each one
    motorcycles.forEach(motorcycle => {
        const motorcycleElement = document.createElement("div");
        motorcycleElement.classList.add("motorcycle-card");
        motorcycleElement.innerHTML = `
            <h3>${motorcycle.name}</h3>
            <p>Model: ${motorcycle.model}</p>
            <p>Price: $${motorcycle.price}</p>
            <button class="buyBtn" data-id="${motorcycle.id}">Buy Now</button>
        `;
        motorcyclesContainer.appendChild(motorcycleElement);
    });
}

// Select payment modal and buttons
const paymentOptionsModal = document.getElementById("paymentOptionsModal");
const closePaymentModalBtn = document.querySelector(".close-btn");
const buyBtns = document.querySelectorAll(".buyBtn");

// Show payment options when the "Buy Now" button is clicked
buyBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        paymentOptionsModal.classList.remove("hidden");
    });
});

// Close the payment modal
closePaymentModalBtn.addEventListener("click", () => {
    paymentOptionsModal.classList.add("hidden");
});

