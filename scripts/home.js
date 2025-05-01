import { createBathPreviewContent } from "../components/bathPreview.component.js";
import { createDiapersPreviewContent } from "../components/diapersPreview.component.js";
import { createfoodPreviewContent } from "../components/foodPreview.component.js";
import { createPumpPreviewContent } from "../components/pumpPreview.component.js";
import { upsateLastBathTime, upsateLastDiaperTime, upsateLastMealTime, upsateLastPumpTime } from "../services/historique.js";
import { isThisMonth, isToday } from "../services/utils.js";
import { get } from "../config/db.js";

let foodHistoric = get('food') || [];
let diaperHistoric = get('diaper') || [];
let pumpHistoric = get('pump') || [];
let bathHistoric = get('bath') || [];

let newestFoodEntry = foodHistoric[0] || {};
let newestDiaperEntry = diaperHistoric[0] || {};
let newestBathEntry =bathHistoric[0] || {};
let newestPumpEntry = pumpHistoric[0] || {};

function loadContent() {
    const foodPreviewContainer = document.querySelector("#foodPreview");
    createFoodPreview(foodPreviewContainer);

    const diapersPreviewContainer = document.querySelector("#diapersPreview");
    createPoopPreview(diapersPreviewContainer);

    const pumpPreviewContainer = document.querySelector("#pumpPreview");
    createPumpPreview(pumpPreviewContainer);

    const bathPreviewContainer = document.querySelector("#bathPreview");
    createBathPreview(bathPreviewContainer);
}

document.addEventListener("DOMContentLoaded", async () => {
    //const loadPromises = TYPES.map(type => loadData(type));
    //await Promise.all(loadPromises);
    console.log('✅ All data loaded');
    loadContent();
});

function createFoodPreview(container) {
    // take total today from historique
    let totalVolume = 0;
    let totalTimes = 0;
    for (let i = 0; i < foodHistoric?.length; i++) {
        if (foodHistoric[i].type === 'bottle' && isToday(foodHistoric[i].date)) {
            totalVolume += parseInt(foodHistoric[i].volume);
            totalTimes += 1;
        }
    }
    // create food resume content   
    const foodPreview = {
        duration: foodHistoric?.length > 0 ? upsateLastMealTime(newestFoodEntry, 'preview') : 'à linstant',
        volume: totalVolume,
        times: totalTimes
    };
    container.appendChild(createfoodPreviewContent(foodPreview));
}

function createPoopPreview(container) {
    // take total today from historique
    let totalPoopTimes = 0;
    let totalPeeTimes = 0;
    for (let i = 0; i < diaperHistoric?.length; i++) {
        if (diaperHistoric[i].type === 'poop' && isToday(diaperHistoric[i].date)) {
            totalPoopTimes += 1;
        }
        if (diaperHistoric[i].type === 'pee' && isToday(diaperHistoric[i].date)) {
            totalPeeTimes += 1;
        }
    }
    // create food preview content   
    const diapersPreview = {
        pee: totalPeeTimes,
        poop: totalPoopTimes,
        duration: diaperHistoric?.length > 0 ? upsateLastDiaperTime(newestDiaperEntry, 'preview') : 'à linstant'
    };

    container.appendChild(createDiapersPreviewContent(diapersPreview, newestDiaperEntry));
}

function createPumpPreview(container) {

    console.log('createPumpPreview:', pumpHistoric);
    // take total today from historique
    let totalPumpTimes = 0;
    let totalVolume = 0;

    for (let i = 0; i < pumpHistoric?.length; i++) {
        if (isToday(pumpHistoric[i].date)) {
            totalPumpTimes += 1;
            totalVolume += parseInt(pumpHistoric[i].volume);
        }
    }

    // create food preview content   
    const pumpsPreview = {
        times: totalPumpTimes,
        volume: totalVolume,
        duration: pumpHistoric?.length > 0 ? upsateLastPumpTime(newestPumpEntry) : `à l'instant`
    };

    container.appendChild(createPumpPreviewContent(pumpsPreview));
}

function createBathPreview(container) {
    // take total today from historique
    let totalBathTimes = 0;

    for (let i = 0; i < bathHistoric?.length; i++) {
        if (isThisMonth(bathHistoric[i].date)) {
            totalBathTimes += 1;
        }
    }

    // create food preview content   
    const bathPreview = {
        times: totalBathTimes,
        duration: bathHistoric?.length > 0 ? upsateLastBathTime(newestBathEntry) : `à l'instant`
    };

    container.appendChild(createBathPreviewContent(bathPreview));
}
