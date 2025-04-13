import { get } from "../scripts/db.js";

const foodH = get("food");
const diaperH = get("diaper");
console.log("diaperH", diaperH);

// export const newestFoodEntry = [foodH]?.reduce((latest, current) => {
//     const latestDate = new Date(`${latest.date}T${latest.time}`);
//     const currentDate = new Date(`${current.date}T${current.time}`);
//     return currentDate > latestDate ? current : latest;
// });

export const newestFoodEntry = {
    "id": 1744562344706,
    "milkType": "breast",
    "volume": "50",
    "type": "bottle",
    "date": "2025-04-13",
    "time": "18:39",
    "note": ""
};

export const upsateLastMealTime = (view) => {
    const lastMealTime = new Date(`${newestFoodEntry.date}T${newestFoodEntry.time}`); 
    const now = new Date();
    const diffMsx = now - lastMealTime; // difference in milliseconds
    const diffMinsx = Math.floor(diffMsx / 1000 / 60);
    const hours = Math.floor(diffMinsx / 60);
    const minutes = diffMinsx % 60;
    const text = (view === 'preview') ? `${hours}h${minutes}m` : "Il y a " + (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "m" : "");
    return text;
}

export const newesDiaperEntry = {
    "id": 1744555710019,
    "type": "poop",
    "date": "2025-04-13",
    "time": "14:33",
    "note": ""
};

// export const newesDiaperEntry = diaperH?.reduce((latest, current) => {
//     console.log("current", current);
//     console.log("latest", latest);
//     const latestDate = new Date(`${latest.date}T${latest.time}`);
//     const currentDate = new Date(`${current.date}T${current.time}`);
//     return currentDate > latestDate ? current : latest;
// });

export const upsateLastDiaperTime = () => {
    const lastDiaperTime = new Date(`${newesDiaperEntry.date}T${newesDiaperEntry.time}`); 
    const now = new Date();
    const diffMsx = now - lastDiaperTime; // difference in milliseconds
    const diffMinsx = Math.floor(diffMsx / 1000 / 60);
    const hours = Math.floor(diffMinsx / 60);
    const minutes = diffMinsx % 60;
    const text = `${hours}h${minutes}m`;
    return text;
}

