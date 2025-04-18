import { createHistoriqueContent } from "../components/historique.component.js";
import { get } from "../config/db.js";
import { changeDateFormat, sortByDateTimeDesc } from "../services/utils.js";

const pumpH = sortByDateTimeDesc(get("pump") || []);

document.addEventListener("DOMContentLoaded", () => {
    const historiqueContainer = document.querySelector("#historiquePump");
    createHisPumpCon(historiqueContainer);
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", (event) => {
    window.location.href = "home.page.html";
});

function createHisPumpCon(container) {
    for (let i = 0; i < pumpH.length; i++) {
        pumpH[i].date = changeDateFormat(pumpH[i].date);
        container.appendChild(createHistoriqueContent(pumpH[i]));
    }
}
