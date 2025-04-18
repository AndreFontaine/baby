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

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("successModal").style.display = "none";
});