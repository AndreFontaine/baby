import { createDiapersPreviewContent } from "../components/diapersPreview.component.js";
import { createfoodPreviewContent } from "../components/foodPreview.component.js";
import { createPumpPreviewContent } from "../components/pumpPreview.component.js";
import { get } from "../config/db.js";
import { upsateLastDiaperTime, upsateLastMealTime, upsateLastPumpTime } from "../services/historique.js";

const foodH = get("food");
const diaperH = get("diaper");
const pumpH = get("pump");

document.addEventListener("DOMContentLoaded", () => {
    
    const foodPreviewContainer = document.querySelector("#foodPreview");
    createFoodPreview(foodPreviewContainer);

    const diapersPreviewContainer = document.querySelector("#diapersPreview");
    createPoopPreview(diapersPreviewContainer);

    const pumpPreviewContainer = document.querySelector("#pumpPreview");
    createPumpPreview(pumpPreviewContainer);

});

function createFoodPreview(container) {
    // take total today from historique
    let totalVolume = 0; 
    let totalTimes = 0;
    for (let i = 0; i < foodH?.length; i++) {
        if (foodH[i].type === 'bottle') {
            totalVolume += parseInt(foodH[i].volume);
            totalTimes += 1;
        }
    }
    // create food resume content   
    const foodPreview = {
        duration: foodH?.length > 0 ? upsateLastMealTime('preview') : 'à linstant',
        volume: totalVolume,
        times: totalTimes
    };
    container.appendChild(createfoodPreviewContent(foodPreview));
}

function createPoopPreview(container) {
    // take total today from historique
    let totalPoopTimes = 0; 
    let totalPeeTimes = 0;
    for (let i = 0; i < diaperH?.length; i++) {
        if (diaperH[i].type === 'poop') {
            totalPoopTimes += 1;
        }
        if (diaperH[i].type === 'pee') {
            totalPeeTimes += 1;
        }
    }
    // create food preview content   
    const diapersPreview = {
        pee: totalPeeTimes,
        poop: totalPoopTimes,
        duration: diaperH?.length > 0 ? upsateLastDiaperTime() : 'à linstant'
    };

    container.appendChild(createDiapersPreviewContent(diapersPreview));
}

function createPumpPreview(container) {
    // take total today from historique
    let totalPumpTimes = pumpH?.length;

    // create food preview content   
    const pumpsPreview = {
        times: totalPumpTimes,
        duration: pumpH?.length > 0 ? upsateLastPumpTime() : `à l'instant`
    };

    container.appendChild(createPumpPreviewContent(pumpsPreview));
}
