import { actionBtn } from "../actionButton.js";

export function createfoodResumeContent(item) {

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");

    // Header Section
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");

    const bottleIcon = document.createElement("div");

    bottleIcon.textContent = item.type === "breast" ? "🤱" : "🍼";

    const dataDiv = document.createElement("div");
    dataDiv.classList.add("data");

    const smallDiv = document.createElement("div");
    smallDiv.classList.add("small");
    smallDiv.textContent = "Dernier biberon";

    const timeDiv = document.createElement("div");
    timeDiv.textContent = item.lastTime;

    dataDiv.appendChild(smallDiv);
    dataDiv.appendChild(timeDiv);

    infoDiv.appendChild(contentDiv);
    const action = actionBtn.cloneNode(true);

    action.addEventListener("click", (event) => {
        window.location.href = "newFood.page.html";
    });


    infoDiv.appendChild(action);
    
    contentDiv.appendChild(bottleIcon);
    contentDiv.appendChild(dataDiv);

    containerDiv.appendChild(infoDiv);

   return containerDiv;
    
}