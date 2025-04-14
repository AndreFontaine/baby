import { get } from "../config/db.js";

const sortByDateTimeDesc = (arr) => {
    return arr.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB - dateA;
    });
  };
  
// Get and sort data
const foodH = sortByDateTimeDesc(get("food") || []);
const diaperH = sortByDateTimeDesc(get("diaper") || []);
const pumpH = sortByDateTimeDesc(get("pump") || []);
  
export const newestFoodEntry = foodH[0];
export const newestDiaperEntry = diaperH[0];
export const newestPumpEntry = pumpH[0];

export const upsateLastMealTime = (view) => {

    let text = "Aucun repas enregistré";
    if (newestFoodEntry?.date) {
        const lastMealTime = new Date(`${newestFoodEntry.date}T${newestFoodEntry.time}`); 
        const now = new Date();
        const diffMsx = now - lastMealTime; // difference in milliseconds
        const diffMinsx = Math.floor(diffMsx / 1000 / 60);
        const hours = Math.floor(diffMinsx / 60);
        const minutes = diffMinsx % 60;
        text = (view === 'preview') 
            ? `${hours}h${minutes}m`
            : "Il y a " + (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "m" : "");
    }
    return text;
}

export const upsateLastDiaperTime = () => {

    let text = "Aucune couche enregistrée";
    if (newestDiaperEntry?.date) {
        const lastDiaperTime = new Date(`${newestDiaperEntry.date}T${newestDiaperEntry.time}`); 
        const now = new Date();
        const diffMsx = now - lastDiaperTime; // difference in milliseconds
        const diffMinsx = Math.floor(diffMsx / 1000 / 60);
        const hours = Math.floor(diffMinsx / 60);
        const minutes = diffMinsx % 60;
        text = `${hours}h${minutes}m`;
    }
    return text;
}

export const upsateLastPumpTime = () => {
    let text = "Aucun pompage enregistré";
    if (newestPumpEntry?.date) {
        const lastDiaperTime = new Date(`${newestPumpEntry.date}T${newestPumpEntry.time}`); 
        const now = new Date();
        const diffMsx = now - lastDiaperTime; // difference in milliseconds
        const diffMinsx = Math.floor(diffMsx / 1000 / 60);
        const hours = Math.floor(diffMinsx / 60);
        const minutes = diffMinsx % 60;
        text = `${hours}h${minutes}m`;
    }
    return text;
}

