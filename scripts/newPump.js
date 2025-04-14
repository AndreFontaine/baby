import { save } from "./db.js";

document.addEventListener("DOMContentLoaded", () => {
    loadDateAndTime();
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", (event) => {
    window.location.href = "home.page.html";
});

document.getElementById("savePump").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formObj = Object.fromEntries(formData.entries());
    const data = {};

    // map object
    data.id = Date.now();
    data.duration = formObj?.duration;
    data.date = formObj?.dateInput;
    data.time = formObj?.timeInput;
    data.volume = formObj?.volume;
    data.note = formObj?.note;

    console.log(data);

    // Save
    save("pump", data);

    const modal = document.getElementById("successModal");
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
    }, 3000);

});

document.getElementById("up-quantity").addEventListener("click", function (e) {
    e.preventDefault();
    updatequantityQuantity();
});

document.getElementById("down-quantity").addEventListener("click", function (e) {
    e.preventDefault();
    updatequantityQuantity(-5);
});

// TODO: move to updateQuantity
function updatequantityQuantity(step = 5) {
    const input = document.getElementById("volume");
    if (!input) {
        console.error("Input element with id 'volume' not found.");
        return;
    }
    let current = parseInt(input.value, 10) || 0;
    const min = parseInt(input.min, 10) || 0;
    const max = parseInt(input.max, 10) || 999;
    let newValue = current + step;
    newValue = Math.max(min, Math.min(max, newValue));
    input.value = newValue;
};

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