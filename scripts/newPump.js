import { save } from "../config/db.js";
import { loadDateAndTime } from "../services/utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const timeInput = document.getElementById("timeInput");
    const dateInput = document.getElementById("dateInput");
    loadDateAndTime(timeInput, dateInput);
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
    data.type = "pump";

    // Save
    save("pump", data);

    const modal = document.getElementById("successModal");
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "./home.page.html";
    }, 1200);

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

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("successModal").style.display = "none";
});