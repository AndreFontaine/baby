import { save } from "../config/db.js";
import { dateConfig, hourConfig, lHoursConfig, lMinutesConfig, lSecondsConfig, noteConfig, rHoursConfig, rMinutesConfig, rSecondsConfig, volumeConfig } from "../config/forms.js";
import { setInputAttributes } from "../services/formUtils.js";

const breastForm = document.querySelector("#formBreast");
const bottleForm = document.querySelector("#formBottle");

const foodObj = {};

let milkType;
let volume;
let type;
let date;
let time;
let note;
let durationParam;

/* Init form configuration */

// Type
const foodType = "bottle"
setSelectedForm(foodType);
const foodTypeEl = document.querySelector(`input[name="foodType"][value="${foodType}"]`);
if (foodTypeEl) foodTypeEl.checked = true;

// Breast
const rHoursInput = document.getElementById("r-hours");
const rMinutesInput = document.getElementById("r-minutes");
const rSecondsInput = document.getElementById("r-seconds");

setInputAttributes(rHoursInput, rHoursConfig);
setInputAttributes(rMinutesInput, rMinutesConfig);
setInputAttributes(rSecondsInput, rSecondsConfig);

const lHoursInput = document.getElementById("l-hours");
const lMinutesInput = document.getElementById("l-minutes");
const lSecondsInput = document.getElementById("l-seconds");

setInputAttributes(lHoursInput, lHoursConfig);
setInputAttributes(lMinutesInput, lMinutesConfig);
setInputAttributes(lSecondsInput, lSecondsConfig);

// Volume
const volumeInput = document.getElementById("volume");
setInputAttributes(volumeInput, volumeConfig);

// Milk type
const milkTypeInput = "breast"
setSelectedForm(foodType);
const milkTypeEl = document.querySelector(`input[name="milkType"][value="${milkTypeInput}"]`);
if (milkTypeInput && milkTypeEl) milkTypeEl.checked = true;

// Date
const dateInput = document.getElementById("volume");
setInputAttributes(dateInput, dateConfig);

// Hour
const hourInput = document.getElementById("volume");
setInputAttributes(hourInput, hourConfig);

// Note
const noteInput = document.getElementById("note");
setInputAttributes(noteInput, noteConfig);


document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll('input[name="foodType"]');

    radioButtons.forEach(radio => {
        radio.addEventListener("change", () => {
            console.log(`Selected option: ${radio.value}`);
            // Load the corresponding template
            setSelectedForm(radio.value);
        });
    });
    loadDateAndTime();
    isEdit();
});

function setSelectedForm(rdioValue) {
    if (rdioValue === "breast") {
        breastForm.style.display = "block";
        bottleForm.style.display = "none";
    }
    if (rdioValue === "bottle") {
        bottleForm.style.display = "block";
        breastForm.style.display = "none";
    }
}

document.getElementById("up-milk").addEventListener("click", function (e) {
    e.preventDefault();
    updateMilkQuantity();
});

document.getElementById("down-milk").addEventListener("click", function (e) {
    e.preventDefault();
    updateMilkQuantity(-5);
});

function updateMilkQuantity(step = 5) {
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

document.getElementById("saveFood").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formObj = Object.fromEntries(formData.entries());
    const data = {};
    data.id = Date.now();

    if (formObj?.foodType === "breast") {
        data.duration = {
            left: parseInt((formObj["l-hours"] * 60), 10) + parseInt(formObj["l-minutes"], 10) + parseInt((formObj["l-seconds"] / 60), 10),
            right: parseInt((formObj["r-hours"] * 60), 10) + parseInt(formObj["r-minutes"], 10) + parseInt((formObj["r-seconds"] / 60), 10),
        }
    }

    if (formObj?.foodType === "bottle") {
        data.milkType = formObj?.milkType;
        data.volume = formObj?.volume;
    }

    data.type = formObj?.foodType;
    data.date = formObj?.dateInput;
    data.time = formObj?.timeInput;
    data.note = formObj?.note;

    // Save
    save("food", data);

    const modal = document.getElementById("successModal");
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "./home.page.html";
    }, 1200);

});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", (event) => {
    window.location.href = "./home.page.html";
});

function loadDateAndTime(isUpdate = false) {
    const timeInput = document.getElementById("timeInput");
    const dateInput = document.getElementById("dateInput");

    let time = new Date();
    if (isUpdate) time = new Date();

    // Format time as HH:MM
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    timeInput.value = `${hours}:${minutes}`;

    // Format date as YYYY-MM-DD
    const year = time.getFullYear();
    const month = (time.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = time.getDate().toString().padStart(2, "0");
    dateInput.value = `${year}-${month}-${day}`;
}

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("successModal").style.display = "none";
});

function loadParams(params) {
    let durationObj = {};
    let left;
    let right;

    const id = params.get("id");
    if (!id) return;
    foodObj.id = id;

    // get all paramas
    milkType = params.get("milkType");
    volume = params.get("volume");
    type = params.get("type");
    date = params.get("date");
    time = params.get("time");
    note = params.get("note");
    durationParam = params.get("duration");

    try {
        if (durationParam) {
            durationObj = JSON.parse(durationParam);
            left = durationObj.left;
            right = durationObj.right;
        }
    } catch (e) {
        console.error("Invalid duration object", e);
    }

    if (id) foodObj.id = id;
    if (milkType) foodObj.milkType = milkType;
    if (volume) foodObj.volume = volume;
    if (type) foodObj.type = type;
    if (date) foodObj.date = date;
    if (time) foodObj.time = time;
    if (note) foodObj.note = note;
    if (left) foodObj.left = left;
    if (right) foodObj.right = right;

    console.log("foodObj => ", foodObj);

}

function isEdit() {
    const params = new URLSearchParams(window.location.search);
    if (params.size !== 0) {
        loadParams(params);
        return true;
    }
}