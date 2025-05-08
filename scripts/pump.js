import { createHistoriqueContent } from "../components/historique.component.js";
import { get } from "../config/db.js";
import { historiqueContent } from "../services/templateUtils.js";
import { sortByDateTimeDesc } from "../services/utils.js";

const pumpH = sortByDateTimeDesc(get("pump") || []);

document.addEventListener("DOMContentLoaded", () => {
    const historiqueContainer = document.querySelector("#historiquePump");
    historiqueContent(pumpH, historiqueContainer, createHistoriqueContent);
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", () => {
    window.location.href = "home.page.html";
});
