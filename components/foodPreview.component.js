import { actionBtn } from "../actionButton.js";

export function createfoodPreviewContent(item) {

    const previewContainer = document.createElement("div");
    previewContainer.classList.add("container");
    previewContainer.addEventListener("click", (event) => {
        window.location.href = "food.page.html";
    });

    // Header Section
    const header = document.createElement("div");
    header.classList.add("header");

    const headerTitle = document.createElement("span");
    headerTitle.textContent = "Repas";
    
    const action = actionBtn.cloneNode(true);

    header.appendChild(headerTitle);
    header.appendChild(action);

    // Preview Section
    const Preview = document.createElement("div");
    Preview.classList.add("preview");

    const bottleIcon = document.createElement("div");
    bottleIcon.textContent = "🍼";

    const smallText = document.createElement("div");
    smallText.classList.add("small");
    smallText.textContent = "Dernier biberon";

    const timeText = document.createElement("div");
    timeText.classList.add("duration");
    timeText.textContent = item.duration;

    Preview.appendChild(bottleIcon);
    Preview.appendChild(smallText);
    Preview.appendChild(timeText);

    // Footer Section
    const footer = document.createElement("div");
    footer.classList.add("footer");

    const totalText = document.createElement("div");
    totalText.classList.add("small");
    totalText.textContent = "Total aujourd'hui";

    const bottleCountIcon = document.createElement("span");
    bottleCountIcon.textContent = "🍼";

    const bottleCount = document.createElement("span");
    bottleCount.textContent = item.times;

    const jarIcon = document.createElement("span");
    jarIcon.textContent = "🫙";

    const jarAmount = document.createElement("span");
    jarAmount.textContent = item.volume + " mL";

    footer.appendChild(totalText);
    footer.appendChild(bottleCountIcon);
    footer.appendChild(bottleCount);
    footer.appendChild(jarIcon);
    footer.appendChild(jarAmount);

    // Append everything to the main container
    previewContainer.appendChild(header);
    previewContainer.appendChild(Preview);
    previewContainer.appendChild(footer);

   return previewContainer;
    
}