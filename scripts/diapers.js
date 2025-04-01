import { createHistoriqueContent } from "../components/historique.component.js";

import { diapersHistorique } from "../data.js";

document.addEventListener("DOMContentLoaded", () => {
    const historiqueContainer = document.querySelector("#historiqueDiapers");
    createHisPoopCon(historiqueContainer);
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", (event) => {
    window.location.href = "home.page.html";
});

function createHisPoopCon(container) {
    for (let i = 0; i < diapersHistorique.length; i++) {
        container.appendChild(createHistoriqueContent(diapersHistorique[i]));
    }
}