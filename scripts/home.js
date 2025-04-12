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

function upsateLastMealTime() {
    const lastMeal = foodH[foodH.length - 1];
    const currentDate = new Date();
    const lastMealDate = new Date(lastMeal.date + " " + lastMeal.time);
    const diffMs = currentDate - lastMealDate; // milliseconds
    const diffMins = Math.floor(diffMs / 60000); // minutes
    return diffMins;

    const lastMealTime = new Date("2024-04-11T13:00:00"); 
    const now = new Date();
    const diffMsx = now - lastMealTime; // difference in milliseconds

    const diffMinsx = Math.floor(diffMsx / 1000 / 60);
    const hours = Math.floor(diffMinsx / 60);
    const minutes = diffMinsx % 60;

    const text = `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''} since the last meal`;

    document.getElementById("meal-time").textContent = text;
}
