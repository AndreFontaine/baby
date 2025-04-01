import { createHistoriqueContent } from "../components/historique.component.js";
import { createpoopPreviewContent } from "../components/diapersPreview.component.js";
import { createfoodPreviewContent } from "../components/foodPreview.component.js";
import { createfoodResumeContent } from "../components/foodResume.component.js";
import { createfoodRTodayResumeContent } from "../components/foodToday.component.js";

import { foodHistorique, poopHistorique } from "../data.js";

document.addEventListener("DOMContentLoaded", () => {
    
    const foodPreviewContainer = document.querySelector("#foodPreview");
    createFoodPre(foodPreviewContainer);

    const poopPreviewContainer = document.querySelector("#poopPreview");
    createDiapersPre(poopPreviewContainer);

    const foodResumeContainer = document.querySelector("#foodResume");
    createFoodRes(foodResumeContainer);

    const foodTodayResumeContainer = document.querySelector("#foodTodayResume");
    createfoodTodayResume(foodTodayResumeContainer);

    const historiqueContainer = document.querySelector("#historiqueFood");
    createHisCon(historiqueContainer);

    const historiquePoopContainer = document.querySelector("#historiquePoop");
    createHisDiapersCon(historiquePoopContainer);
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

function createFoodRes(container) {
    // create food resume content   
    const foodResume = {
        lastTime: 'Il y a 2 heures',
        type: 'bottle'
    };
    container.appendChild(createfoodResumeContent(foodResume));
}

function createfoodTodayResume(container) {
    // take total today from historique
    let totalVolume = 0; 
    let totalBottleTimes = 0;

    let totalDuration = 0;
    let totalBreastTimes = 0;

    for (let i = 0; i < foodHistorique.length; i++) {
        if (foodHistorique[i].type === 'bottle') {
            if (foodHistorique[i].volume) {
                totalVolume += parseInt(foodHistorique[i].volume, 10);
                totalBottleTimes += 1;
            }
        }
        if (foodHistorique[i].type === 'breast') {
            if (foodHistorique[i].duration) {
                totalDuration += parseInt(foodHistorique[i].duration.left, 10) + parseInt(foodHistorique[i].duration.right, 10);
                totalBreastTimes += 1;
            }
        }
    }

    const todayResume = {
        'bottle': {
            volume: totalVolume,
            times: totalBottleTimes
        },
        'breast': {
            duration: totalDuration,
            times: totalBottleTimes
        },

    }

    container.appendChild(createfoodRTodayResumeContent(todayResume));
}

function createDiapersPre(container) {
    // take total today from historique
    let totalPoopTimes = 0; 
    let totalPeeTimes = 0; 
    for (let i = 0; i < poopHistorique.length; i++) {
        if (poopHistorique[i].type === 'poop') {
            totalPoopTimes += 1;
        }
        if (poopHistorique[i].type === 'pee') {
            totalPeeTimes += 1;
        }
    }
    // create food preview content   
    const poopPreview = {
        date: '30 mars 2025',
        hour: '13h35',
        pee: totalPeeTimes,
        poop: totalPoopTimes,
        duration: '3h 42 min'
    };

    container.appendChild(createpoopPreviewContent(poopPreview));
}

function createHisCon(container) {
    for (let i = 0; i < foodHistorique.length; i++) {
        container.appendChild(createHistoriqueContent(foodHistorique[i]));
    }
}

function createHisDiapersCon(container) {
    for (let i = 0; i < poopHistorique.length; i++) {
        container.appendChild(createHistoriqueContent(poopHistorique[i]));
    }
}
