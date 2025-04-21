import { save } from "../config/db.js";
import { dateConfig, hourConfig, noteConfig } from "../config/forms.js";
import { setInputAttributes } from "../services/formUtils.js";
import { convertToInputDate, isEdit, loadDateAndTime, loadModal } from "../services/utils.js";

const diaperObj = {};

let type;
let date;
let time;
let note;

let params = null;

const DEFAULT_DIAPER_TYPE = "poo"; // pee or poo

let diaperTypeValue = DEFAULT_DIAPER_TYPE;

/* Event listeners */
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

document.getElementById("saveDiaper").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formObj = Object.fromEntries(formData.entries());
    const data = loadData(formObj);

    // Save
    save("diaper", data);
    const modal = document.getElementById("successModal");
    loadModal(modal);

});

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("successModal").style.display = "none";
});


function loadParams(params) {
    const id = params.get("id");
    if (!id) return;
    diaperObj.id = id;

    // get all paramas
    type = params.get("type");
    date = params.get("date");
    time = params.get("time");
    note = params.get("note");

    if (type) diaperObj.type = type;
    if (date) diaperObj.date = date;
    if (time) diaperObj.time = time;
    if (note) diaperObj.note = note;
}

function loadData(form) {

    if (!form) {
        console.log('Invalid from');
        return;
    };

    const data = {};
    // map object
    data.id = Number(diaperObj.id ?? Date.now());

    data.date = form.dateInput;
    data.time = form.timeInput;
    data.note = form.note;
    data.type = form.diaperType;

    return data;
}

function initForm() {
    /* Get all form inputs */
    // date: i.e. 18/04/2025 (2025-04-18)
    const dateInput = document.getElementById("dateInput");
    // time: i.e. 11:30
    const hourInput = document.getElementById("timeInput");
    // note
    const noteInput = document.getElementById("note");

    loadDateAndTime(hourInput, dateInput);

    // update 
    if (params) {
        hourConfig.value = diaperObj.time;
        dateConfig.value = convertToInputDate(diaperObj.date);
        noteConfig.value = diaperObj.note ?? '';
    }
    // end update

    const diaperTypeInput = document.querySelector(`input[name="diaperType"][value="${diaperTypeValue}"]`);
    if (diaperTypeInput && diaperTypeValue) diaperTypeInput.checked = true;
    setInputAttributes(dateInput, dateConfig);
    setInputAttributes(hourInput, hourConfig);
    setInputAttributes(noteInput, noteConfig);

}