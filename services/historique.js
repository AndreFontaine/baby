import { get } from "../scripts/db.js";

const foodH = get("food");

export const upsateLastMealTime = (view) => {
    const lastMealTime = new Date(`${newestEntry.date}T${newestEntry.time}`); 
    const now = new Date();
    const diffMsx = now - lastMealTime; // difference in milliseconds
    const diffMinsx = Math.floor(diffMsx / 1000 / 60);
    const hours = Math.floor(diffMinsx / 60);
    const minutes = diffMinsx % 60;
    const text = (view === 'preview') ? `${hours}h${minutes}m` : "Il y a " + (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "m" : "");
    console.log("newestEntry", newestEntry);
    return text;
}

export const newestEntry = foodH?.reduce((latest, current) => {
    const latestDate = new Date(`${latest.date}T${latest.time}`);
    const currentDate = new Date(`${current.date}T${current.time}`);
    return currentDate > latestDate ? current : latest;
});
