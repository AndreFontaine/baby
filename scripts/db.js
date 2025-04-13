let initialFoodData = [
    {
        "id": 1744562344706,
        "milkType": "breast",
        "volume": "50",
        "type": "bottle",
        "date": "2025-04-13",
        "time": "18:39",
        "note": ""
    }
];
let initialDiaperData = [
    {
        "id": 1744555710019,
        "type": "poop",
        "date": "2025-04-13",
        "time": "14:33",
        "note": ""
    },
    {
        "id": 1744555710018,
        "type": "poop",
        "date": "2025-04-05",
        "time": "11:15",
        "note": "Pipí también"
    },
    {
        "id": 1744555710018,
        "type": "poop",
        "date": "2025-04-05",
        "time": "04:20",
        "note": "Pipí también"
    },
    {
        "id": 1744555710017,
        "type": "pee",
        "date": "2025-04-04",
        "time": "20:15",
        "note": "Pipí también"
    },
    {
        "id": 1744555710016,
        "type": "poop",
        "date": "2025-04-04",
        "time": "13:00",
        "note": "Pipí también"
    },
    {
        "id": 1744555710015,
        "type": "pee",
        "date": "2025-04-04",
        "time": "08:45",
        "note": "poco popó"
    },
    {
        "id": 1744555710014,
        "type": "poop",
        "date": "2025-04-04",
        "time": "00:05",
        "note": "Pipí también"
    },
    {
        "id": 1744555710013,
        "type": "poop",
        "date": "2025-04-03",
        "time": "19:40",
        "note": ""
    },
    {
        "id": 1744555710012,
        "type": "poop",
        "date": "2025-04-03",
        "time": "15:00",
        "note": ""
    },
    {
        "id": 1744555710011,
        "type": "poop",
        "date": "2025-04-03",
        "time": "11:10",
        "note": "Pipí también"
    },
    {
        "id": 1744555710010,
        "type": "poop",
        "date": "2025-04-03",
        "time": "04:10",
        "note": "Pipí también"
    },
    {
        "id": 1744555710009,
        "type": "pee",
        "date": "2025-04-02",
        "time": "22:50",
        "note": "Pipí también"
    },
    {
        "id": 1744555710008,
        "type": "poop",
        "date": "2025-04-02",
        "time": "18:30",
        "note": ""
    },
    {
        "id": 1744555710007,
        "type": "poop",
        "date": "2025-04-02",
        "time": "12:50",
        "note": "Pipí también"
    },
    {
        "id": 1744555710006,
        "type": "poop",
        "date": "2025-04-02",
        "time": "08:30",
        "note": "Pipí también"
    },
    {
        "id": 1744555710005,
        "type": "pee",
        "date": "2025-04-02",
        "time": "03:30",
        "note": "Pipí también"
    },
    {
        "id": 1744555710004,
        "type": "poop",
        "date": "2025-04-01",
        "time": "22:00",
        "note": ""
    },
    {
        "id": 1744555710003,
        "type": "pee",
        "date": "2025-04-01",
        "time": "16:00",
        "note": ""
    },
    {
        "id": 1744555710002,
        "type": "poop",
        "date": "2025-04-01",
        "time": "12:30",
        "note": "Pipí también"
    },
    {
        "id": 1744555710001,
        "type": "poop",
        "date": "2025-04-01",
        "time": "07:00",
        "note": "Pipí también"
    }
];

export const init = () => {
    if (!localStorage.getItem("read")) {
        if (!localStorage.getItem("food")) {
            localStorage.setItem("food", JSON.stringify(initialFoodData, null, 2));
        } 
        if (!localStorage.getItem("diaper")) {
            localStorage.setItem("diaper", JSON.stringify(initialDiaperData, null, 2));
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

    if (type === "food") {
        newData.push(data);
        localStorage.setItem(type, JSON.stringify(newData, null, 2));
    }
    if (type === "diaper") {
        newData.push(data);
        localStorage.setItem(type, JSON.stringify(newData, null, 2));
    }
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