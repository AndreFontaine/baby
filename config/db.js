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

export const save = (type, newData) => {
    if (!type || !newData) {
        console.error("Type and data are required to save to local storage.");
        return;
    }
    if (typeof newData !== "object") {
        console.error("Type must be a string.");
        return;
    }

    let data = JSON.parse(localStorage.getItem(type)) || [];
    const index = data.findIndex(item => item.id === newData.id);

    if (index !== -1) {
        // Update fields
        console.log("Found");
        console.log('update');
        data[index] = newData;
    } else {
        console.log("Object not found");
        console.log('create');
        data.push(newData);
    }

    localStorage.setItem(type, JSON.stringify(data, null, 2));
    console.log("Saved data in local storage:", newData);
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

export const reset = () => {
    localStorage.clear();
    location.reload();
    console.log("Reset data from local storage:", data);
}


export function saveLocalStorageToJson(filename = "data.json") {
    // 1. Get all localStorage data
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = JSON.parse(localStorage.getItem(key));
    }

    // 2. Convert to JSON string
    const json = JSON.stringify(data, null, 2); // pretty-printed
  
    // 3. Create a blob and a temporary download link
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  
    // 4. Clean up
    URL.revokeObjectURL(url);
  }