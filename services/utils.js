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

export function isThisMonth(date) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const itemDate = new Date(date);
    if (itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear) {
        return true;
    }   
}

export const sortByDateTimeDesc = (arr) => {
    return arr.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
    });
};

export const addMinutesToTime = (timeStr, minutesToAdd) => {
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
    return `${newHour}:${newMin}`;
}

// Map French months to numbers
const monthMap = {
    janvier: "01", février: "02", mars: "03", avril: "04",
    mai: "05", juin: "06", juillet: "07", août: "08",
    septembre: "09", octobre: "10", novembre: "11", décembre: "12"
};

export function convertToInputDate(frenchDate) {
    const [day, monthName, year] = frenchDate.split(" ");
    const month = monthMap[monthName.toLowerCase()];
    return `${year}-${month}-${day.padStart(2, "0")}`;
}

export function isEdit(searchParams) {
    const params = new URLSearchParams(searchParams);
    if (params.size !== 0) {
        return params;
    }
    return null;
}

export function loadDateAndTime(timeInput, dateInput) {
    const time = new Date();

    // Format time as HH:MM
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    timeInput.value = `${hours}:${minutes}`;

    // Format date as YYYY-MM-DD
    const year = time.getFullYear();
    const month = (time.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = time.getDate().toString().padStart(2, "0");
    dateInput.value = `${year}-${month}-${day}`;
}

export function loadModal(modal) {
    
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "./home.page.html";
    }, 1200);
}