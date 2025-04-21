import { save } from "../config/db.js";
import { dateConfig, durationConfig, hourConfig, volumeConfig } from "../config/forms.js";
import { setInputAttributes } from "../services/formUtils.js";
import { convertToInputDate, isEdit, loadDateAndTime, loadModal } from "../services/utils.js";

const pumpObj = {};
let params = null;

let volume;
let type;
let date;
let time;
let duration;

document.addEventListener("DOMContentLoaded", () => {
    const timeInput = document.getElementById("timeInput");
    const dateInput = document.getElementById("dateInput");
    loadDateAndTime(timeInput, dateInput);

    params = isEdit(window.location.search);
    if(params) loadParams(params);
    initForm();
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", (event) => {
    window.location.href = "home.page.html";
});

document.getElementById("savePump").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formObj = Object.fromEntries(formData.entries());
    const data = loadData(formObj);;

    // Save
    save("pump", data);
    const modal = document.getElementById("successModal");
    loadModal(modal);

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

function initForm() {
    /* Get all form inputs */
    // volume integer
    const volumeInput = document.getElementById("volume");
    // date: i.e. 18/04/2025 (2025-04-18)
    const dateInput = document.getElementById("dateInput");
    // time: i.e. 11:30
    const hourInput = document.getElementById("timeInput");
    // duration: pumping minutes
    const durationInput = document.getElementById("duration");

    loadDateAndTime(hourInput, dateInput);

    // update 
    if (params) {
        hourConfig.value = pumpObj.time;
        dateConfig.value = convertToInputDate(pumpObj.date);
        volumeConfig.value = Number(pumpObj.volume);
        durationConfig.value = Number(pumpObj.duration);
    }
    // end update

    setInputAttributes(volumeInput, volumeConfig);
    setInputAttributes(dateInput, dateConfig);
    setInputAttributes(hourInput, hourConfig);
    setInputAttributes(durationInput, durationConfig);

}

function loadParams(params) {

    const id = params.get("id");
    if (!id) return;
    pumpObj.id = id;

    // get all paramas
    volume = params.get("volume");
    type = params.get("type");
    date = params.get("date");
    time = params.get("time");
    duration = params.get("duration");

    if (volume) pumpObj.volume = Number(volume);
    if (type) pumpObj.type = type;
    if (date) pumpObj.date = date;
    if (time) pumpObj.time = time;
    if (duration) pumpObj.duration = Number(duration);

    console.log("pumpObj => ", pumpObj);

}

function loadData(form) {

    if (!form) {
        console.log('Invalid from');
        return;
    };

    const data = {};
    // map object
    data.id = Number(pumpObj.id ?? Date.now());

    data.duration = form.duration;
    data.date = form.dateInput;
    data.time = form.timeInput;
    data.volume = form.volume;
    data.type = "pump";

    return data;
}