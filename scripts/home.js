import { createDiapersPreviewContent } from "../components/diapersPreview.component.js";
import { createfoodPreviewContent } from "../components/foodPreview.component.js";

import { diapersHistorique } from "../data.js";

import { get } from "./db.js";

const foodH = get("food");

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
    for (let i = 0; i < foodH?.length; i++) {
        if (foodH[i].type === 'bottle') {
            totalVolume += parseInt(foodH[i].volume);
            totalTimes += 1;
        }
    }
    // create food resume content   
    const foodPreview = {
        date: new Date(),
        hour: '13h35',
        volume: totalVolume,
        times: totalTimes,
        duration: foodH?.length >0 ? upsateLastMealTime() : '0h0m',
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

function upsateLastMealTime() {
    const lastMealTime = new Date(`${newestEntry.date}T${newestEntry.time}`); 
    console.log(lastMealTime);
    const now = new Date();
    console.log(now);
    const diffMsx = now - lastMealTime; // difference in milliseconds
    const diffMinsx = Math.floor(diffMsx / 1000 / 60);
    const hours = Math.floor(diffMinsx / 60);
    const minutes = diffMinsx % 60;
    const text = `${hours}h${minutes}m`;
    return text;
}

const newestEntry = foodH?.reduce((latest, current) => {
    const latestDate = new Date(`${latest.date}T${latest.time}`);
    const currentDate = new Date(`${current.date}T${current.time}`);
    return currentDate > latestDate ? current : latest;
});

