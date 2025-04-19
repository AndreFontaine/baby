import { save } from "../config/db.js";
import { dateConfig, hourConfig, lHoursConfig, lMinutesConfig, lSecondsConfig, noteConfig, rHoursConfig, rMinutesConfig, rSecondsConfig, volumeConfig } from "../config/forms.js";
import { setInputAttributes } from "../services/formUtils.js";
import { convertToInputDate, isEdit, loadDateAndTime, loadModal } from "../services/utils.js";

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

let params = null;

const DEFAULT_FOOD_TYPE = "bottle"; // breast or bottle
const DEFAULT_MILK_TYPE = "breast"; // breast or formula

let foodTypeValue = DEFAULT_FOOD_TYPE;
let milkTypeValue = DEFAULT_MILK_TYPE;

/* Listeners */

document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll('input[name="foodType"]');

    radioButtons.forEach(radio => {
        radio.addEventListener("change", () => {
            console.log(`Selected option: ${radio.value}`);
            // Load the corresponding template
            setSelectedForm(radio.value);
        });
    });
    params = isEdit(window.location.search);
    if(params) loadParams(params);
    initForm();
});

document.getElementById("up-milk").addEventListener("click", function (e) {
    e.preventDefault();
    updateMilkQuantity();
});

document.getElementById("down-milk").addEventListener("click", function (e) {
    e.preventDefault();
    updateMilkQuantity(-5);
});

document.querySelector("#back").addEventListener("click", (event) => {
    window.location.href = "./home.page.html";
});

document.getElementById("saveFood").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formObj = Object.fromEntries(formData.entries());
    const data = loadData(formObj);

    // Save
    save("food", data);
    const modal = document.getElementById("successModal");
    loadModal(modal);
});

function initForm() {
    /* Get all form inputs */
    // volume integer
    const volumeInput = document.getElementById("volume");
    // date: i.e. 18/04/2025 (2025-04-18)
    const dateInput = document.getElementById("dateInput");
    // time: i.e. 11:30
    const hourInput = document.getElementById("timeInput");
    // note: string
    const noteInput = document.getElementById("note");
    // duration: r (right), l (left) both in hours, mibutes and seconds
    const rHoursInput = document.getElementById("r-hours");
    const rMinutesInput = document.getElementById("r-minutes");
    const rSecondsInput = document.getElementById("r-seconds");
    const lHoursInput = document.getElementById("l-hours");
    const lMinutesInput = document.getElementById("l-minutes");
    const lSecondsInput = document.getElementById("l-seconds");

    loadDateAndTime(hourInput, dateInput);

    // update 
    if (params) {
        if (type === "breast") {
            rMinutesConfig.value = foodObj.right;
            lMinutesConfig.value = foodObj.left;
        }

        if (type === "bottle") {
            volumeConfig.value = Number(foodObj.volume);
            milkTypeValue = foodObj.milkType;
        }

        hourConfig.value = foodObj.time;
        dateConfig.value = convertToInputDate(foodObj.date);
        noteConfig.value = (foodObj.note) ? foodObj.note : '';

        foodTypeValue = foodObj.type;
    }
    // end update

    // foodType: bootle, breast
    const foodTypeInput = document.querySelector(`input[name="foodType"][value="${foodTypeValue}"]`);
    // milktype: breast, formula
    const milkTypeInput = document.querySelector(`input[name="milkType"][value="${milkTypeValue}"]`);
    setSelectedForm(foodTypeValue);
    if (foodTypeInput && foodTypeValue) foodTypeInput.checked = true;
    if (milkTypeInput && milkTypeValue) milkTypeInput.checked = true;

    setInputAttributes(rHoursInput, rHoursConfig);
    setInputAttributes(rMinutesInput, rMinutesConfig);
    setInputAttributes(rSecondsInput, rSecondsConfig);
    setInputAttributes(lHoursInput, lHoursConfig);
    setInputAttributes(lMinutesInput, lMinutesConfig);
    setInputAttributes(lSecondsInput, lSecondsConfig);
    setInputAttributes(volumeInput, volumeConfig);
    setInputAttributes(dateInput, dateConfig);
    setInputAttributes(hourInput, hourConfig);
    setInputAttributes(noteInput, noteConfig);

}

function loadData(form) {

    if (!form) {
        console.log('Invalid from');
        return;
    };

    const data = {};
    data.id = Number(foodObj.id ?? Date.now());

    data.type = form.foodType;
    data.date = form.dateInput;
    data.time = form.timeInput;
    data.note = form.note;

    if (form?.foodType === "breast") {
        data.duration = {
            left: parseInt((form["l-hours"] * 60), 10) + parseInt(form["l-minutes"], 10) + parseInt((form["l-seconds"] / 60), 10),
            right: parseInt((form["r-hours"] * 60), 10) + parseInt(form["r-minutes"], 10) + parseInt((form["r-seconds"] / 60), 10),
        }
    }

    if (form?.foodType === "bottle") {
        data.milkType = form?.milkType;
        data.volume = form?.volume;
    }

    return data;
}

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("successModal").style.display = "none";
});

/* Helpers */

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
