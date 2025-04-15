export const changeDateFormat = (dateStr) => {
    const date = new Date(dateStr);
    const formatted = new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(date);
    return formatted;
};

export function isToday(date) {
    const today = new Date();
    const entryDate = new Date(date);
    return entryDate.getDate() === today.getDate() && entryDate.getMonth() === today.getMonth() && entryDate.getFullYear() === today.getFullYear();
}

export const sortByDateTimeDesc = (arr) => {
    return arr.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
    });
};

export const addMinutesToTime = (timeStr, minutesToAdd) => {
    console.log(`${timeStr}k${minutesToAdd}`)
    if (!timeStr || !minutesToAdd) {
        return timeStr; // Return the original time if inputs are invalid
    }

    if (typeof minutesToAdd !== "number") {
        minutesToAdd = parseInt(minutesToAdd);
    }

    // Split the time string into hours and minutes
    const [hours, minutes] = timeStr.split(":").map(Number);
  
    // Create a Date object for today with that time
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + minutesToAdd);

    const newHour = date.getHours().toString().padStart(2, "0");
    const newMin = date.getMinutes().toString().padStart(2, "0");
    console.log(`${newHour}:${newMin}`)
    return `${newHour}:${newMin}`;
  }