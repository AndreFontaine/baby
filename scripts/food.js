import { createfoodResumeContent } from "../components/foodResume.component.js";
import { createfoodRTodayResumeContent } from "../components/foodToday.component.js";
import { createHistoriqueContent } from "../components/historique.component.js";
import { updateLastMealTime } from "../services/historique.js";
import { get } from "../config/db.js";
import { isToday, sortByDateTimeDesc } from "../services/utils.js";
import { historiqueContent } from "../services/templateUtils.js";

const foodH = sortByDateTimeDesc(get("food") || []);
const newestFoodEntry = foodH[0];

document.addEventListener("DOMContentLoaded", () => {
    const foodResumeContainer = document.querySelector("#foodResume");
    createFoodRes(foodResumeContainer);

    const foodTodayResumeContainer = document.querySelector("#foodTodayResume");
    createfoodTodayResume(foodTodayResumeContainer);

    const historiqueContainer = document.querySelector("#historiqueFood");
    foodH.forEach((item) => {
        item.milkType = item.milkType ? item.milkType : null;
    });
    historiqueContent(foodH, historiqueContainer, createHistoriqueContent);
});

const backBtn = document.querySelector("#back");

backBtn.addEventListener("click", () => {
    window.location.href = "home.page.html";
});

function createFoodRes(container) {
    // create food resume content
    if (newestFoodEntry) {
        const foodResume = {
            lastTime: updateLastMealTime(newestFoodEntry, 'resume'),
            type: newestFoodEntry.type,
        };
        container.appendChild(createfoodResumeContent(foodResume));
    }  
}

function createfoodTodayResume(container) {
    // take total today from historique
    let totalVolume = 0; 
    let totalBottleTimes = 0;

    let totalDuration = 0;
    let totalBreastTimes = 0;

    for (let i = 0; i < foodH.length; i++) {
        if (foodH[i].type === 'bottle' && isToday(foodH[i].date)) {
            if (foodH[i].volume) {
                totalVolume += parseInt(foodH[i].volume, 10);
                totalBottleTimes += 1;
            }
        }
        if (foodH[i].type === 'breast' && isToday(foodH[i].date)) {
            if (foodH[i].duration) {
                totalDuration += parseInt(foodH[i].duration.left, 10) + parseInt(foodH[i].duration.right, 10);
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
            times: totalBreastTimes
        },

    }

    container.appendChild(createfoodRTodayResumeContent(todayResume));
}
