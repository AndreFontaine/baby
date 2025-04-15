import { createDiapersPreviewContent } from "../components/diapersPreview.component.js";
import { createfoodPreviewContent } from "../components/foodPreview.component.js";
import { createPumpPreviewContent } from "../components/pumpPreview.component.js";
import { get, reset } from "../config/db.js";
import { upsateLastDiaperTime, upsateLastMealTime, upsateLastPumpTime } from "../services/historique.js";
import { isToday, sortByDateTimeDesc } from "../services/utils.js";

const foodH = sortByDateTimeDesc(get("food") || []);
const diaperH = sortByDateTimeDesc(get("diaper") || []);
const pumpH = sortByDateTimeDesc(get("pump") || []);

const newestFoodEntry = foodH[0];
const newestDiaperEntry = diaperH[0];
const newestPumpEntry = pumpH[0];

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
        if (foodH[i].type === 'bottle' && isToday(foodH[i].date)) {
            totalVolume += parseInt(foodH[i].volume);
            totalTimes += 1;
        }
    }
    // create food resume content   
    const foodPreview = {
        duration: foodH?.length > 0 ? upsateLastMealTime(newestFoodEntry, 'preview') : 'à linstant',
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
        if (diaperH[i].type === 'poop' && isToday(diaperH[i].date)) {
            totalPoopTimes += 1;
        }
        if (diaperH[i].type === 'pee' && isToday(diaperH[i].date)) {
            totalPeeTimes += 1;
        }
    }
    // create food preview content   
    const diapersPreview = {
        pee: totalPeeTimes,
        poop: totalPoopTimes,
        duration: diaperH?.length > 0 ? upsateLastDiaperTime(newestDiaperEntry) : 'à linstant'
    };

    container.appendChild(createDiapersPreviewContent(diapersPreview, newestDiaperEntry));
}

function createPumpPreview(container) {
    // take total today from historique
    let totalPumpTimes = 0;

    for (let i = 0; i < pumpH?.length; i++) {
        if ( isToday(pumpH[i].date)) totalPumpTimes += 1;
    }

    // create food preview content   
    const pumpsPreview = {
        times: totalPumpTimes,
        duration: pumpH?.length > 0 ? upsateLastPumpTime(newestPumpEntry) : `à l'instant`
    };

    container.appendChild(createPumpPreviewContent(pumpsPreview));
}

document.getElementById("reset-btn").addEventListener("click", () => {
    reset();
    console.log("test");
});