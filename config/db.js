import { getDataByType } from "../services/data.service.js";

let initialFoodData = [];
let initialDiaperData = [];
let initialPumpData = [];
let initialBathData = [];

const BASE_URL ='http://192.168.1.49/api/';

async function getInitialData() {
    initialFoodData = await getDataByType("food");
    initialDiaperData = await getDataByType("diaper");
    initialPumpData = await getDataByType("pump");
    initialBathData = await getDataByType("bath");
}

export const init = async () => {
    console.log("Initializing local storage...");
    if (!localStorage.getItem("read")) {
        await getInitialData();
        if (!localStorage.getItem("food")) {
            localStorage.setItem("food", JSON.stringify(initialFoodData, null, 2));
        }
        if (!localStorage.getItem("diaper")) {
            localStorage.setItem("diaper", JSON.stringify(initialDiaperData, null, 2));
        }
        if (!localStorage.getItem("pump")) {
            localStorage.setItem("pump", JSON.stringify(initialPumpData, null, 2));
        }
        if (!localStorage.getItem("bath")) {
            localStorage.setItem("bath", JSON.stringify(initialBathData, null, 2));
        }
    }
    localStorage.setItem("read", true);
    return getAllDataFromLocalStorage();
}

export const save = async (type, newData) => {
    if (!type || !newData) {
        console.error("Type and data are required to save to local storage.");
        return;
    }
    if (typeof newData !== "object") {
        console.error("Type must be a string.");
        return;
    }

    try {
        // save in DB
        const res = await saveInDb(type, newData);
        console.log("Response from DB:", res);
        // if (res === null) newData.p_operation = "yes"
        // newData.p_operation = "yes"; // delete this line
        // save in local storage
        saveInLocalStorage(type, newData);
        // return res;
    } catch (error) {
        console.error(`❌ Failed to save ${type} entry:`, error);
    }
}

async function saveInDb(type, data) {
    console.log("type", type);
    console.log("data", data);
    const response = await fetch(`${BASE_URL}${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

     console.log('response:', response);

    if (!response.ok) {
       return null;
    } else {
        // const result = await response.json();
        console.log('✅ Data saved:', response);
    }
    return response;
}

function saveInLocalStorage(type, obj) {
    let data = JSON.parse(localStorage.getItem(type)) || [];
    const index = data.findIndex(item => item.id === obj.id);
    
    if (index !== -1) {
        // Update fields
        console.log("Found");
        console.log('update');
        if (obj.p_operation === "yes") {
            obj.p_operation = "update";
        }
        data[index] = obj;
    } else {
        console.log("Object not found");
        console.log('create');
        if (obj.p_operation === "yes") {
            obj.p_operation = "create";
        }
        data.push(obj);
    }
    
    localStorage.setItem(type, JSON.stringify(data, null, 2));
    console.log("Saved data in local storage:", data);
}


export const update = (data, type) => {
    localStorage.setItem(type, JSON.stringify(data, null, 2));
    console.log("Updated data in local storage:", data);
}

export const get = (type) => {
    const data = JSON.parse(localStorage.getItem(type));
    //console.log("Retrieved data from local storage:", data);
    return data;
}

export const remove = (data, type) => {
    localStorage.removeItem(type);
    console.log("Removed data from local storage:", data);
}

export const reset = () => {
    localStorage.clear();
    location.reload();
    console.log("Reset data from local storage:");
}

export function getAllDataFromLocalStorage() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = JSON.parse(localStorage.getItem(key));
    }
    return data;
}

export function saveLocalStorageToJson(filename = "data.json") {
    // 1. Get all localStorage data
    const data = getAllDataFromLocalStorage();

    // 2. Convert to JSON string
    const json = JSON.stringify(data, null, 2);

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