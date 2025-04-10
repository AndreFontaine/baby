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

document.getElementById("saveFood").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Now you have your JSON object

    if (data?.foodType === "breast") {
        delete data.milkType;
    }

    if (data?.foodType === "bottle") {
        delete data["r-hours"];
        delete data["l-hours"];
        delete data["r-minutes"];
        delete data["l-minutes"];
        delete data["r-seconds"];
        delete data["l-seconds"];
    }

    // Optional: Convert to JSON string
    const jsonString = JSON.stringify(data, null, 2);
    console.log(jsonString);

    const modal = document.getElementById("successModal");
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
    }, 3000);

});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", (event) => {
    window.location.href = "home.page.html";
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

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("successModal").style.display = "none";
});