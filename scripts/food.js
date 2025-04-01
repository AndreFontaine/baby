import { createfoodResumeContent } from "../components/foodResume.component.js";
import { createfoodRTodayResumeContent } from "../components/foodToday.component.js";
import { createHistoriqueContent } from "../components/historique.component.js";

import { foodHistorique } from "../data.js";

document.addEventListener("DOMContentLoaded", () => {
    const foodResumeContainer = document.querySelector("#foodResume");
    createFoodRes(foodResumeContainer);

    const foodTodayResumeContainer = document.querySelector("#foodTodayResume");
    createfoodTodayResume(foodTodayResumeContainer);

    const historiqueContainer = document.querySelector("#historiqueFood");
    createHisCon(historiqueContainer);
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", (event) => {
    console.log("Hello", event.target.classList);
    window.location.href = "home.page.html";
});

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

function createHisCon(container) {
    for (let i = 0; i < foodHistorique.length; i++) {
        container.appendChild(createHistoriqueContent(foodHistorique[i]));
    }
}