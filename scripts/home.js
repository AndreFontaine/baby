import { createBathPreviewContent } from "../components/bathPreview.component.js";
import { createDiapersPreviewContent } from "../components/diapersPreview.component.js";
import { createfoodPreviewContent } from "../components/foodPreview.component.js";
import { createPumpPreviewContent } from "../components/pumpPreview.component.js";
import { updateLastBathTime, updateLastDiaperTime, updateLastMealTime, updateLastPumpTime } from "../services/historique.js";
import { isThisMonth, isToday, sortByDateTimeDesc } from "../services/utils.js";
import { init } from "../config/db.js";

function loadContent(data) {
    const foodPreviewContainer = document.querySelector("#foodPreview");
    createFoodPreview(foodPreviewContainer, data.food);

    const diapersPreviewContainer = document.querySelector("#diapersPreview");
    createPoopPreview(diapersPreviewContainer, data.diaper);

    const pumpPreviewContainer = document.querySelector("#pumpPreview");
    createPumpPreview(pumpPreviewContainer, data.pump);

    const bathPreviewContainer = document.querySelector("#bathPreview");
    createBathPreview(bathPreviewContainer, data.bath);
}

document.addEventListener("DOMContentLoaded", async () => {
    const data = await init();
    loadContent(data);
});

function createFoodPreview(container, historic) {

    historic = sortByDateTimeDesc(historic);
    // take total today from historique
    let totalVolume = 0;
    let totalTimes = 0;
    for (let i = 0; i < historic?.length; i++) {
        if (historic[i].type === 'bottle' && isToday(historic[i].date)) {
            totalVolume += parseInt(historic[i].volume);
            totalTimes += 1;
        }
    }
    // create food resume content   
    const foodPreview = {
        duration: historic?.length > 0 ? updateLastMealTime(historic[0] || {}, 'preview') : 'à linstant',
        volume: totalVolume,
        times: totalTimes
    };
    container.appendChild(createfoodPreviewContent(foodPreview));
}

function createPoopPreview(container, historic) {
    // take total today from historique
    let totalPoopTimes = 0;
    let totalPeeTimes = 0;

    historic = sortByDateTimeDesc(historic);

    for (let i = 0; i < historic?.length; i++) {
        if (historic[i].type === 'poop' && isToday(historic[i].date)) {
            totalPoopTimes += 1;
        }
        if (historic[i].type === 'pee' && isToday(historic[i].date)) {
            totalPeeTimes += 1;
        }
    }
    // create food preview content   
    const diapersPreview = {
        pee: totalPeeTimes,
        poop: totalPoopTimes,
        duration: historic?.length > 0 ? updateLastDiaperTime(historic[0] || {}, 'preview') : 'à linstant'
    };

    container.appendChild(createDiapersPreviewContent(diapersPreview, historic[0] || {}));
}

function createPumpPreview(container, historic) {

    historic = sortByDateTimeDesc(historic);
    // take total today from historique
    let totalPumpTimes = 0;
    let totalVolume = 0;

    for (let i = 0; i < historic?.length; i++) {
        if (isToday(historic[i].date)) {
            totalPumpTimes += 1;
            totalVolume += parseInt(historic[i].volume);
        }
    }

    // create food preview content   
    const pumpsPreview = {
        times: totalPumpTimes,
        volume: totalVolume,
        duration: historic?.length > 0 ? updateLastPumpTime(historic[0] || {}) : `à l'instant`
    };

    container.appendChild(createPumpPreviewContent(pumpsPreview));
}

function createBathPreview(container, historic) {
    // take total today from historique
    historic = sortByDateTimeDesc(historic);
    let totalBathTimes = 0;

    for (let i = 0; i < historic?.length; i++) {
        if (isThisMonth(historic[i].date)) {
            totalBathTimes += 1;
        }
    }

    // create food preview content   
    const bathPreview = {
        times: totalBathTimes,
        duration: historic?.length > 0 ? updateLastBathTime(historic[0] || {}) : `à l'instant`
    };

    container.appendChild(createBathPreviewContent(bathPreview));
}
