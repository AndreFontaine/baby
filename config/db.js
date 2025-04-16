import { initialDiaperData, initialFoodData, initialPumpData } from "./data.js";

export const init = () => {
    console.log("Initializing local storage...");
    if (!localStorage.getItem("read")) {
        initialFoodData.forEach((item) => {
            localStorage.setItem(item.id, JSON.stringify(item, null));
        });
        initialDiaperData.forEach((item) => {
            localStorage.setItem(item.id, JSON.stringify(item, null));
        });
        initialPumpData.forEach((item) => {
            localStorage.setItem(item.id, JSON.stringify(item, null));
        });
    }
    localStorage.setItem("read", true);
}

export const save = (id, data) => {
    if (!id || !data) {
        console.error("Id and data are required to save to local storage.");
        return;
    }
    if (typeof data !== "object") {
        console.error("Type must be a string.");
        return;
    }

    localStorage.setItem(id, JSON.stringify(data, null));
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

export const reset = () => {
    localStorage.clear();
    location.reload();
    console.log("Reset data from local storage:", data);
}


export function saveLocalStorageToJson(filename = "data.json") {
    // 1. Get all localStorage data
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data.push(JSON.parse(localStorage.getItem(key)));
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