let foodData = [];
let diaperData = [];

export const init = () => {
    foodData = JSON.parse(localStorage.getItem("food")) || [];
    diaperData = JSON.parse(localStorage.getItem("diaper")) || [];
}

export const save = ( type, data ) => {
    if (!type || !data) {
        console.error("Type and data are required to save to local storage.");
        return;
    }
    if (typeof data !== "object") {
        console.error("Type must be a string.");
        return;
    }

    init();

    if(type === "food") {
        foodData.push(data);
        localStorage.setItem(type, JSON.stringify(foodData, null, 2));
    }
    if(type === "diaper") {
        diaperData.push(data);
        localStorage.setItem(type, JSON.stringify(diaperData, null, 2));
    }
    // console.log("Saved data to local storage:", data);
}

export const update = ( data, type ) => {
    localStorage.setItem(type, JSON.stringify(data, null, 2));
    console.log("Updated data in local storage:", data);
}

export const get = ( type ) => {
    const data = JSON.parse(localStorage.getItem(type));
    console.log("Retrieved data from local storage:", data);
    return data;
}

export const remove = ( data, type ) => {
    localStorage.removeItem(type);
    console.log("Removed data from local storage:", data);
}