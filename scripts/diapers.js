import { createHistoriqueContent } from "../components/historique.component.js";
import { get } from "../config/db.js";
import { changeDateFormat, sortByDateTimeDesc } from "../services/utils.js";

const diaperH = sortByDateTimeDesc(get("diaper") || []);

document.addEventListener("DOMContentLoaded", () => {
    const historiqueContainer = document.querySelector("#historiqueDiapers");
    createHisPoopCon(historiqueContainer);
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", () => {
    window.location.href = "home.page.html";
});

function createHisPoopCon(container) {
    if(diaperH) {
        for (let i = 0; i < diaperH.length; i++) {
            diaperH[i].date = changeDateFormat(diaperH[i].date);
            diaperH[i].time = diaperH[i].time.substring(0, 5);
            container.appendChild(createHistoriqueContent(diaperH[i]));
        }
    }
    // TODO: mensaje cuando no hay registros
}
