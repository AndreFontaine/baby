import { createHistoriqueContent } from "../components/historique.component.js";
import { get } from "../config/db.js";
import { changeDateFormat, sortByDateTimeDesc } from "../services/utils.js";

const bathH = sortByDateTimeDesc(get("bath") || []);

document.addEventListener("DOMContentLoaded", () => {
    const historiqueContainer = document.querySelector("#historiqueBath");
    createHisBathCon(historiqueContainer);
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", () => {
    window.location.href = "home.page.html";
});

function createHisBathCon(container) {
    for (let i = 0; i < bathH.length; i++) {
        bathH[i].date = changeDateFormat(bathH[i].date);
        bathH[i].time = bathH[i].time.substring(0, 5);
        container.appendChild(createHistoriqueContent(bathH[i]));
        const dateDiv = document.createElement("div");
        const textContent = document.createTextNode(bathH[i].date);
        dateDiv.appendChild(textContent);
        container.appendChild(dateDiv);
    }
}
