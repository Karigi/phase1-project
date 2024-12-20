document.addEventListener('DOMContentLoaded', () => {
    const clientBtn = document.getElementById('clientBtn');
    const merchantBtn = document.getElementById('merchantBtn');

    // Redirect to Client Page
    clientBtn.addEventListener('click', () => {
        window.location.href = "client.html";
    });

    // Redirect to Merchant Page
    merchantBtn.addEventListener('click', () => {
        window.location.href = "merchant.html";
    });
});
