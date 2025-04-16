import { actionByType } from "../services/historique.js";
import { addMinutesToTime } from "../services/utils.js";

export function createHistoriqueContent(item) {

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    containerDiv.addEventListener("click", (event) => {
        console.log("item => ", item)
        console.log(actionByType(item));
    });

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");

    const emojiDiv = document.createElement("div");
    emojiDiv.textContent = icon(item.type);

    const dataDiv = document.createElement("div");
    dataDiv.classList.add("data");

    const smallDiv = document.createElement("div");
    smallDiv.classList.add("small");
    smallDiv.textContent = item.date;

    const timeDiv = document.createElement("div");

    if( item.duration && item.type === 'pump'){
        timeDiv.textContent = `${item.time} - ${addMinutesToTime(item.time, item.duration)}`;
    } else {
        timeDiv.textContent = item.time;
    }
       
    if (item.milkType) {
        const typeSpan = document.createElement("span");
        typeSpan.classList.add("badge");
        if (item.milkType === 'formula') {
            typeSpan.classList.add("badge-formula");
        }
        typeSpan.textContent = item.milkType === 'breast' ? 'maternel' : item.milkType;
        smallDiv.appendChild(typeSpan);
    }

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    if (item.type === "pump" && item.duration) {
        noteDiv.textContent = `${item.duration} minutes`;
    } else {
        noteDiv.textContent = item.note;
    }


    const rightDataDiv = document.createElement("div");
    if (isFood(item.type)) rightInfo(rightDataDiv, item);

    dataDiv.appendChild(smallDiv);
    
    dataDiv.appendChild(timeDiv);
    dataDiv.appendChild(noteDiv);
    contentDiv.appendChild(emojiDiv);
    contentDiv.appendChild(dataDiv);
    infoDiv.appendChild(contentDiv);

    if (isFood(item.type)) infoDiv.appendChild(rightDataDiv);
    containerDiv.appendChild(infoDiv);
    
    return containerDiv;
}

function rightInfo(rightDataDiv, item){
    rightDataDiv.classList.add("right-data");

    const sideDivR = document.createElement("div");
    sideDivR.classList.add("side");
    const sideDivL = document.createElement("div");
    sideDivL.classList.add("side");

    if (item.type === 'bottle'|| item.type === 'pump') {
        sideDivR.textContent = item.volume + " mL";
    }
    
    if (item.type === 'breast') {
        sideDivR.textContent = "D " + item.duration.right;
        sideDivL.textContent = "G " + item.duration.left;
    }

    rightDataDiv.appendChild(sideDivR);
    rightDataDiv.appendChild(sideDivL);
    
}

function icon(type){
    if (type === 'bottle') {
        return '🍼';
    }
    if (type === 'breast') {
        return '🤱';
    }
    if (type === 'poop') {
        return '💩';
    }
    if (type === 'pee') {
        return '💧';
    }
    if (type === 'pump') {
        return '🍶';
    }
}

function isFood (type){
    return type === 'bottle' || type === 'breast' || type === 'pump';
}

