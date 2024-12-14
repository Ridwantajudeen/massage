// Get the current year dynamically
const currentYear = new Date().getFullYear();
const websiteName = "AMG Touch";

// Set the copyright text
document.getElementById("copyright").textContent = `Copyright © ${currentYear} ${websiteName}. All rights reserved.`;

// Initialize EmailJS with your public key
emailjs.init("Yv3AsBD26iuphF_45"); // Replace with your actual public key from EmailJS

// Set default price on page load
window.onload = function () {
    const defaultOption = document.getElementById("massageType").options[0];
    const price = defaultOption.getAttribute("data-price");
    document.getElementById("priceDisplay").textContent = `Price: $${price}`;
};

// Update price when a new massage type is selected
document.getElementById("massageType").addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const price = selectedOption.getAttribute("data-price");
    document.getElementById("priceDisplay").textContent = `Price: $${price}`;
});

// Handle form submission
document.getElementById("appointmentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const massageType = document.getElementById("massageType").value;
    const selectedOption = document.getElementById("massageType").options[
        document.getElementById("massageType").selectedIndex
    ];
    const price = selectedOption.getAttribute("data-price");
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Send email using EmailJS
    emailjs
        .send("service_psp505s", "template_oi0enme", {
            name: name,
            email: email,
            phone: phone,
            massageType: massageType,
            price: `$${price}`,
            date: date,
            time: time,
        })
        .then(
            function (response) {
                document.getElementById("status").textContent = "Appointment booked successfully!";
                console.log("Success:", response.status, response.text);
            },
            function (error) {
                document.getElementById("status").textContent =
                    "Failed to book appointment. Please try again.";
                console.error("Error:", error);
            }
        );
});
