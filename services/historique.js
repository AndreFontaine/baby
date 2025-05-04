export const updateLastMealTime = (newestMealEntry, view) => {

    let text = "Aucun repas enregistré";
    if (newestMealEntry?.date) {
        const lastMealTime = new Date(`${newestMealEntry.date}T${newestMealEntry.time}`); 
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

export const updateLastDiaperTime = (newestDiaperEntry) => {

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

export const updateLastPumpTime = (newestPumpEntry, view) => {
    let text = "Aucun pompage enregistré";
    if (newestPumpEntry?.date) {
        const lastDiaperTime = new Date(`${newestPumpEntry.date}T${newestPumpEntry.time}`); 
        const now = new Date();
        const diffMsx = now - lastDiaperTime; // difference in milliseconds
        const diffMinsx = Math.floor(diffMsx / 1000 / 60);
        const hours = Math.floor(diffMinsx / 60);
        const minutes = diffMinsx % 60;
        text = (view === 'preview') 
            ? `${hours}h${minutes}m`
            : "Il y a " + (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "m" : "");
    }
    return text;
}

export const updateLastBathTime = (newestBathEntry, view) => {
    let text = "Aucun bains enregistré";
    if (newestBathEntry?.date) {
        const lastDiaperTime = new Date(`${newestBathEntry.date}T${newestBathEntry.time}`); 
        const now = new Date();
        const diffMsx = now - lastDiaperTime; // difference in milliseconds
        const diffMinsx = Math.floor(diffMsx / 1000 / 60);
        const days = Math.round(Math.floor(diffMinsx / 60) / 24);
        text = (view === 'preview') 
            ? `${days} jours`
            : "Il y a " + (days > 0 ? days + " jours" : "");
    }
    return text;
}

export const actionByType = (item) => {
    const params = new URLSearchParams();

    if (item.id) params.set("id", item.id);
    if (item.milkType) params.set("milkType", item.milkType);
    if (item.volume) params.set("volume", item.volume);
    if (item.type) params.set("type", item.type);
    if (item.date) params.set("date", item.date);
    if (item.time) params.set("time", item.time);
    if (item.note) params.set("note", item.note);
   
 
    let page = 'home.html';
    switch (item.type) {
        case 'bottle':
        case 'breast':
            if (item.duration) params.set("duration", JSON.stringify(item.duration));
            page = 'newFood';
            break;
        case 'pump':
            if (item.duration) params.set("duration", item.duration);
            page = 'newPump';
            break;
        case 'pee':
        case 'poop':
            page = 'newDiaper';
            break;
        case 'bath':
            page = 'newBath';
            break;
    }
    window.location.href = `${page}.page.html?${params}`;
} 
