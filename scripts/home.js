import { createDiapersPreviewContent } from "../components/diapersPreview.component.js";
import { createfoodPreviewContent } from "../components/foodPreview.component.js";

import { foodHistorique, diapersHistorique } from "../data.js";

document.addEventListener("DOMContentLoaded", () => {
    
    const foodPreviewContainer = document.querySelector("#foodPreview");
    createFoodPre(foodPreviewContainer);

    const diapersPreviewContainer = document.querySelector("#diapersPreview");
    createPoopPre(diapersPreviewContainer);

});

function createFoodPre(container) {
    // take total today from historique
    let totalVolume = 0; 
    let totalTimes = 0; 
    for (let i = 0; i < foodHistorique.length; i++) {
        if (foodHistorique[i].type === 'bottle') {
            totalVolume += parseInt(foodHistorique[i].volume);
            totalTimes += 1;
        }
    }
    // create food resume content   
    const foodPreview = {
        date: '30 mars 2025',
        hour: '13h35',
        volume: totalVolume,
        times: totalTimes,
        duration: '1h 36 min',
        type: 'bottle'
    };
    container.appendChild(createfoodPreviewContent(foodPreview));
}

function createPoopPre(container) {
    // take total today from historique
    let totalPoopTimes = 0; 
    let totalPeeTimes = 0; 
    for (let i = 0; i < diapersHistorique.length; i++) {
        if (diapersHistorique[i].type === 'poop') {
            totalPoopTimes += 1;
        }
        if (diapersHistorique[i].type === 'pee') {
            totalPeeTimes += 1;
        }
    }
    // create food preview content   
    const diapersPreview = {
        date: '30 mars 2025',
        hour: '13h35',
        pee: totalPeeTimes,
        poop: totalPoopTimes,
        duration: '3h 42 min'
    };

    container.appendChild(createDiapersPreviewContent(diapersPreview));
}

