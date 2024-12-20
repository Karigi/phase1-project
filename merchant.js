// Select elements for modal and content
const merchantLoginModal = document.getElementById("merchantLoginModal");
const merchantRegisterModal = document.getElementById("merchantRegisterModal");
const blurredContentMerchant = document.getElementById("merchantContent");
const motorcyclesContainerMerchant = document.getElementById("motorcyclesContainerMerchant");

// Select login and register buttons for merchant
const loginBtnMerchant = document.getElementById("loginBtnMerchant");
const registerBtnMerchant = document.getElementById("registerBtnMerchant");

// Open modals when buttons are clicked
loginBtnMerchant.addEventListener("click", () => merchantLoginModal.classList.remove("hidden"));
registerBtnMerchant.addEventListener("click", () => merchantRegisterModal.classList.remove("hidden"));

// Close modals
document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        merchantLoginModal.classList.add("hidden");
        merchantRegisterModal.classList.add("hidden");
    });
});

// Handle merchant login
document.getElementById("merchantLoginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("merchantLoginUsername").value;
    const password = document.getElementById("merchantLoginPassword").value;

    // Fetch users from db.json via json-server
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    // Find the matching user
    const user = users.find(u => u.username === username && u.password === password && u.role === "merchant");
    if (user) {
        alert("Login successful!");
        blurredContentMerchant.classList.remove("blur");
        merchantLoginModal.classList.add("hidden");

        // Fetch and display motorcycles after login
        fetchMotorcycles();
    } else {
        alert("Invalid login credentials!");
    }
});

// Handle merchant registration
document.getElementById("merchantRegisterForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUser = {
        username: document.getElementById("merchantRegisterUsername").value,
        password: document.getElementById("merchantRegisterPassword").value,
        role: "merchant"
    };

    // Register new merchant to db.json
    await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });
    alert("Registration successful! Please login.");
    merchantRegisterModal.classList.add("hidden");
});

// Fetch motorcycles from db.json and display them
async function fetchMotorcycles() {
    const response = await fetch("http://localhost:3000/motorcycles");
    const motorcycles = await response.json();

    // Clear the previous list
    motorcyclesContainerMerchant.innerHTML = "";

    // Loop through the motorcycles and display each one
    motorcycles.forEach(motorcycle => {
        const motorcycleElement = document.createElement("div");
        motorcycleElement.classList.add("motorcycle-card");
        motorcycleElement.innerHTML = `
            <h3>${motorcycle.name}</h3>
            <p>Model: ${motorcycle.model}</p>
            <p>Price: $${motorcycle.price}</p>
            <p>SOH: ${motorcycle.SoH}</p>
            <p>Age: ${motorcycle.age}</p>
            <button class="deleteBtn" data-id="${motorcycle.id}">Delete</button>
        `;
        motorcyclesContainerMerchant.appendChild(motorcycleElement);
    });

    // Handle delete motorcycle button click
    document.querySelectorAll(".deleteBtn").forEach(deleteBtn => {
        deleteBtn.addEventListener("click", async (e) => {
            const motorcycleId = e.target.getAttribute("data-id");

            // Delete the motorcycle from db.json
            await fetch(`http://localhost:3000/motorcycles/${motorcycleId}`, {
                method: "DELETE",
            });

            // Fetch and update the motorcycle list
            fetchMotorcycles();
        });
    });
}

// Select modal and buttons for adding a new motorcycle
const addNewMotorcycleBtn = document.getElementById("addNewMotorcycleBtn");
const addMotorcycleModal = document.getElementById("addMotorcycleModal");
const closeModalBtns = document.querySelectorAll(".close-btn");

// Open the modal when the "Add New Motorcycle" button is clicked
addNewMotorcycleBtn.addEventListener("click", () => addMotorcycleModal.classList.remove("hidden"));

// Close the modal
closeModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        addMotorcycleModal.classList.add("hidden");
    });
});

// Handle the form submission for adding a new motorcycle
document.getElementById("addMotorcycleForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const newMotorcycle = {
        name: document.getElementById("motorcycleName").value,
        model: document.getElementById("motorcycleModel").value,
        price: parseInt(document.getElementById("motorcyclePrice").value),
        SoH: document.getElementById("motorcycleBatSOH").value,
        age: document.getElementById("motorcycleBatAge").value
    };

    // Send the new motorcycle to db.json via json-server
    await fetch("http://localhost:3000/motorcycles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMotorcycle)
    });

    alert("Motorcycle added successfully!");
    addMotorcycleModal.classList.add("hidden");

    // Fetch and update the motorcycles list
    fetchMotorcycles();
});

