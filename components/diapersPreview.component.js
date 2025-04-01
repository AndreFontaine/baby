import { actionBtn } from "../actionButton.js";

export function createDiapersPreviewContent(item) {

    const diapersPreview = document.createElement("div");
    diapersPreview.classList.add("container");
    diapersPreview.addEventListener("click", (event) => {
        window.location.href = "diapers.page.html";
    });

    // Header Section
    const header = document.createElement("div");
    header.classList.add("header");

    const headerTitle = document.createElement("span");
    headerTitle.textContent = "Couches";

    header.appendChild(headerTitle);

    const action = actionBtn.cloneNode(true);
    action.addEventListener("click", (event) => {
        window.location.href = "diapers.page.html";
    });

    header.appendChild(action);

    // Preview Section
    const preview = document.createElement("div");
    preview.classList.add("preview");

    const poopIcon = document.createElement("div");
    poopIcon.textContent = "💩";

    const smallText = document.createElement("div");
    smallText.classList.add("small");
    smallText.textContent = "Dernier couche";

    const timeText = document.createElement("div");
    timeText.classList.add("duration");
    timeText.textContent = item.duration;

    preview.appendChild(poopIcon);
    preview.appendChild(smallText);
    preview.appendChild(timeText);

    // Footer Section
    const footer = document.createElement("div");
    footer.classList.add("footer");

    const totalText = document.createElement("div");
    totalText.classList.add("small");
    totalText.textContent = "Total aujourd'hui";

    const poopCountIcon = document.createElement("span");
    poopCountIcon.textContent = "💩";

    const poopAmount = document.createElement("span");
    poopAmount.textContent = item.poop;

    const peeIcon = document.createElement("span");
    peeIcon.textContent = "🫗";

    const peeAmount = document.createElement("span");
    peeAmount.textContent = item.pee;

    footer.appendChild(totalText);
    footer.appendChild(poopCountIcon);
    footer.appendChild(poopAmount);
    footer.appendChild(peeIcon);
    footer.appendChild(peeAmount);

    // Append everything to the main container
    diapersPreview.appendChild(header);
    diapersPreview.appendChild(preview);
    diapersPreview.appendChild(footer);

   return diapersPreview;
    
}