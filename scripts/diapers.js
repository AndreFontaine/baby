import { createHistoriqueContent } from "../components/historique.component.js";
import { get } from "../config/db.js";
import { historiqueContent } from "../services/templateUtils.js";
import { sortByDateTimeDesc } from "../services/utils.js";

const diaperH = sortByDateTimeDesc(get("diaper") || []);

document.addEventListener("DOMContentLoaded", () => {
    const historiqueContainer = document.querySelector("#historiqueDiapers");
    historiqueContent(diaperH, historiqueContainer, createHistoriqueContent);
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", () => {
    window.location.href = "home.page.html";
});
