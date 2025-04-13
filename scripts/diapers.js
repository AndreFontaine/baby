import { createHistoriqueContent } from "../components/historique.component.js";

import { get } from "./db.js";

const diaperH = get("diaper");

console.log("diaperH", diaperH);

document.addEventListener("DOMContentLoaded", () => {
    const historiqueContainer = document.querySelector("#historiqueDiapers");
    createHisPoopCon(historiqueContainer);
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", (event) => {
    window.location.href = "home.page.html";
});

function createHisPoopCon(container) {
    for (let i = 0; i < diaperH.length; i++) {
        container.appendChild(createHistoriqueContent(diaperH[i]));
    }
}
