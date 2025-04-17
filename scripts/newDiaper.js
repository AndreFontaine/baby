import { save } from "../config/db.js";

document.addEventListener("DOMContentLoaded", () => {
    loadDateAndTime();
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", (event) => {
    window.location.href = "home.page.html";
});

document.getElementById("saveDiaper").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formObj = Object.fromEntries(formData.entries());
    const data = {};

    // map object
    data.id = Date.now();
    data.type = formObj?.type;
    data.date = formObj?.dateInput;
    data.time = formObj?.timeInput;
    data.note = formObj?.note;

    console.log(data);

    // Save
    save("diaper", data);

    const modal = document.getElementById("successModal");
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "./home.page.html";
    }, 1200);

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