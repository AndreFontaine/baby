import { save } from "../config/db.js";
import { dateConfig, hourConfig, noteConfig } from "../config/forms.js";
import { setInputAttributes } from "../services/formUtils.js";
import { convertToInputDate, isEdit, loadDateAndTime, loadModal } from "../services/utils.js";

const bathObj = {};
let params = null;

let type;
let date;
let time;
let note;

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

document.getElementById("saveBath").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formObj = Object.fromEntries(formData.entries());
    const data = loadData(formObj);;

    // Save
    save("bath", data);
    const modal = document.getElementById("successModal");
    loadModal(modal);

});

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("successModal").style.display = "none";
});

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
        hourConfig.value = bathObj.time;
        dateConfig.value = convertToInputDate(bathObj.date);
        noteConfig.value = bathObj.note ?? '';
    }
    // end update

    setInputAttributes(dateInput, dateConfig);
    setInputAttributes(hourInput, hourConfig);
    setInputAttributes(noteInput, noteConfig);

}

function loadParams(params) {

    const id = params.get("id");
    if (!id) return;
    bathObj.id = id;

    // get all paramas
    type = params.get("type");
    date = params.get("date");
    time = params.get("time");
    note = params.get("note");

    if (type) bathObj.type = type;
    if (date) bathObj.date = date;
    if (time) bathObj.time = time;
    if (note) bathObj.note = note;

    console.log("bathObj => ", bathObj);

}

function loadData(form) {

    if (!form) {
        console.log('Invalid from');
        return;
    };

    const data = {};
    // map object
    data.id = Number(bathObj.id ?? Date.now());

    data.date = form.dateInput;
    data.time = form.timeInput;
    data.type = "bath";
    data.note = form.note;

    return data;
}