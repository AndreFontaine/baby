import { reset, saveLocalStorageToJson } from "../config/db.js";

document.getElementById("reset-btn").addEventListener("click", () => {
    reset();
});

document.getElementById("save-btn").addEventListener("click", () => {
    saveLocalStorageToJson();
});