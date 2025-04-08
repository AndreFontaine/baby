const breastForm = document.querySelector("#formBreast");
const bottleForm = document.querySelector("#formBottle");

document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll('input[name="foodType"]');

    radioButtons.forEach(radio => {
        radio.addEventListener("change", () => {
            console.log(`Selected option: ${radio.value}`);
            // Load the corresponding template
            if (radio.value === "breast") {
                breastForm.style.display = "block";
                bottleForm.style.display = "none";
            }
            if (radio.value === "bottle") {
                bottleForm.style.display = "block";
                breastForm.style.display = "none";
            }
        });
    });

    loadDateAndTime();
});

function loadDateAndTime() {
    const timeInput = document.getElementById("timeInput");
    const dateInput = document.getElementById("dateInput");

    const now = new Date();

    // Format time as HH:MM
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    timeInput.value = `${hours}:${minutes}`;

    // Format date as YYYY-MM-DD
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = now.getDate().toString().padStart(2, "0");
    dateInput.value = `${year}-${month}-${day}`;
}