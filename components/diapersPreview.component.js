import { actionBtn } from "../actionButton.js";

export function createDiapersPreviewContent(item, newestDiaperEntry) {

    const diapersPreview = document.createElement("div");
    diapersPreview.classList.add("container");

    // Header Section
    const header = document.createElement("div");
    header.classList.add("header");

    const headerTitle = document.createElement("span");
    headerTitle.textContent = "Couches";

    header.appendChild(headerTitle);

    const action = actionBtn.cloneNode(true);
    action.addEventListener("click", (event) => {
        window.location.href = "newDiaper.page.html";
    });

    header.appendChild(action);

    // Preview Section
    const preview = document.createElement("div");
    preview.classList.add("preview");

    const poopIcon = document.createElement("div");
    poopIcon.textContent = "💩";

    const peeIcon = document.createElement("div");
    peeIcon.textContent = "💧";

    const smallText = document.createElement("div");
    smallText.classList.add("preview-text");
    smallText.textContent = "Dernier couche";

    const timeText = document.createElement("div");
    timeText.classList.add("preview-duration");
    timeText.textContent = item.duration;

    const showIcon = (newestDiaperEntry?.type === "poop") ? poopIcon : peeIcon;

    preview.appendChild(showIcon);
    preview.appendChild(smallText);
    preview.appendChild(timeText);

    const actionContainer = document.createElement("div");
    actionContainer.appendChild(preview);
    actionContainer.addEventListener("click", (event) => {
        window.location.href = "diapers.page.html";
    });

    // Footer Section
    const footer = document.createElement("div");
    footer.classList.add("footer");

    const totalText = document.createElement("div");
    totalText.classList.add("preview-text");
    totalText.textContent = "Total aujourd'hui";

    const quantitiesDiv = document.createElement("div");
    quantitiesDiv.classList.add("quantities");

    const poopCountIcon = document.createElement("span");
    poopCountIcon.textContent = "💩";

    const peeCountIcon = document.createElement("span");
    peeCountIcon.textContent = "💧";

    const poopAmount = document.createElement("span");
    poopAmount.textContent = item.poop;

    const peeAmount = document.createElement("span");
    peeAmount.textContent = item.pee;

    quantitiesDiv.appendChild(totalText);
    quantitiesDiv.appendChild(poopCountIcon);
    quantitiesDiv.appendChild(poopAmount);
    quantitiesDiv.appendChild(peeCountIcon);
    quantitiesDiv.appendChild(peeAmount);
    footer.appendChild(quantitiesDiv);

    // Append everything to the main container
    diapersPreview.appendChild(header);
    diapersPreview.appendChild(actionContainer);
    diapersPreview.appendChild(footer);

   return diapersPreview;
    
}