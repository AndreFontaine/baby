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