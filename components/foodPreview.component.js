import { actionBtn } from "../actionButton.js";

export function createfoodPreviewContent(item) {

    const previewContainer = document.createElement("div");
    previewContainer.classList.add("container");

    // Header Section
    const header = document.createElement("div");
    header.classList.add("header");

    const headerTitle = document.createElement("span");
    headerTitle.textContent = "Repas";
    
    const action = actionBtn.cloneNode(true);
    action.addEventListener("click", (event) => {
        window.location.href = "newFood.page.html";
    });

    header.appendChild(headerTitle);
    header.appendChild(action);

    // Preview Section
    const preview = document.createElement("div");
    preview.classList.add("preview");

    const bottleIcon = document.createElement("div");
    bottleIcon.textContent = "🍼";

    const smallText = document.createElement("div");
    smallText.classList.add("preview-text");
    smallText.textContent = "Dernier biberon";

    const timeText = document.createElement("div");
    timeText.classList.add("preview-duration");
    timeText.textContent = item.duration;

    preview.appendChild(bottleIcon);
    preview.appendChild(smallText);
    preview.appendChild(timeText);

    const actionContainer = document.createElement("div");
    actionContainer.appendChild(preview);
    actionContainer.addEventListener("click", (event) => {
        window.location.href = "food.page.html";
    });


    // Footer Section
    const footer = document.createElement("div");
    footer.classList.add("footer");

    const totalText = document.createElement("div");
    totalText.classList.add("preview-text");
    totalText.textContent = "Total aujourd'hui";

    const quantitiesDiv = document.createElement("div");
    quantitiesDiv.classList.add("quantities");

    const bottleCountIcon = document.createElement("span");
    bottleCountIcon.textContent = "🍼";

    const bottleCount = document.createElement("span");
    bottleCount.textContent = item.times;

    const jarIcon = document.createElement("span");
    jarIcon.textContent = "🫙";

    const jarAmount = document.createElement("span");
    jarAmount.textContent = item.volume + " mL";

    footer.appendChild(totalText);

    quantitiesDiv.appendChild(bottleCountIcon);
    quantitiesDiv.appendChild(bottleCount);
    quantitiesDiv.appendChild(jarIcon);
    quantitiesDiv.appendChild(jarAmount);
    footer.appendChild(quantitiesDiv);

    previewContainer.appendChild(header);
    previewContainer.appendChild(actionContainer);
    previewContainer.appendChild(footer);

   return previewContainer;
    
}