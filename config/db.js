import { initialDiaperData, initialFoodData, initialPumpData } from "./data.js";

export const init = () => {
    console.log("Initializing local storage...");
    if (!localStorage.getItem("read")) {
        if (!localStorage.getItem("food")) {
            localStorage.setItem("food", JSON.stringify(initialFoodData, null, 2));
        } 
        if (!localStorage.getItem("diaper")) {
            localStorage.setItem("diaper", JSON.stringify(initialDiaperData, null, 2));
        }
        if (!localStorage.getItem("pump")) {
            localStorage.setItem("pump", JSON.stringify(initialPumpData, null, 2));
        }
    }
    localStorage.setItem("read", true);
}

export const save = (type, data) => {
    if (!type || !data) {
        console.error("Type and data are required to save to local storage.");
        return;
    }
    if (typeof data !== "object") {
        console.error("Type must be a string.");
        return;
    }

    let newData = JSON.parse(localStorage.getItem(type)) || [];
    newData.push(data);
    localStorage.setItem(type, JSON.stringify(newData, null, 2));
    console.log("Saved data in local storage:", data);
}

export const update = (data, type) => {
    localStorage.setItem(type, JSON.stringify(data, null, 2));
    console.log("Updated data in local storage:", data);
}

export const get = (type) => {
    const data = JSON.parse(localStorage.getItem(type));
    console.log("Retrieved data from local storage:", data);
    return data;
}

export const remove = (data, type) => {
    localStorage.removeItem(type);
    console.log("Removed data from local storage:", data);
}