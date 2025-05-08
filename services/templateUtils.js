import { changeDateFormat } from "./utils.js";

export function historiqueContent(arr, container, createContent) {
    let currentDate = null;
    for (let i = 0; i < arr.length; i++) {
        if (currentDate !== arr[i].date) {
            currentDate = arr[i].date;
            const dateDiv = document.createElement("div");
            dateDiv.classList.add("date-badge");
            const textContent = document.createTextNode(changeDateFormat(arr[i].date, true));
            dateDiv.appendChild(textContent);
            container.appendChild(dateDiv); 
        }
        arr[i].date = changeDateFormat(arr[i].date);
        arr[i].time = arr[i].time.substring(0, 5);
        container.appendChild(createContent(arr[i]));
    }
}
