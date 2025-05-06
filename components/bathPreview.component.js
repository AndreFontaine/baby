import { actionBtn } from "../actionButton.js";

export function createBathPreviewContent(item) {

    const bathPreview = document.createElement("div");
    bathPreview.classList.add("container");

    // Header Section
    const header = document.createElement("div");
    header.classList.add("header");

    const headerTitle = document.createElement("span");
    headerTitle.textContent = "Bains";

    header.appendChild(headerTitle);

    const action = actionBtn.cloneNode(true);
    action.addEventListener("click", () => {
        window.location.href = "newBath.page.html";
    });

    header.appendChild(action);

    // Preview Section
    const preview = document.createElement("div");
    preview.classList.add("preview");

    const bathIcon = document.createElement("div");
    bathIcon.textContent = "🛀";

    const smallText = document.createElement("div");
    smallText.classList.add("preview-text");
    smallText.textContent = "Dernier bain";

    const timeText = document.createElement("div");
    timeText.classList.add("preview-duration");
    timeText.textContent = item.duration;

    preview.appendChild(bathIcon);
    preview.appendChild(smallText);
    preview.appendChild(timeText);

    const actionContainer = document.createElement("div");
    actionContainer.appendChild(preview);
    actionContainer.addEventListener("click", () => {
        window.location.href = "bath.page.html";
    });

    // Footer Section
    const footer = document.createElement("div");
    footer.classList.add("footer");

    const totalText = document.createElement("div");
    totalText.classList.add("preview-text");
    totalText.textContent = "Total de ce mois";

    const quantitiesDiv = document.createElement("div");
    quantitiesDiv.classList.add("quantities");

    const bathCountIcon = document.createElement("span");
    bathCountIcon.textContent = "🛀";

    const bathAmount = document.createElement("span");
    bathAmount.textContent = item.times;

    quantitiesDiv.appendChild(totalText);
    quantitiesDiv.appendChild(bathCountIcon);
    quantitiesDiv.appendChild(bathAmount);

    footer.appendChild(quantitiesDiv);

    // Append everything to the main container
    bathPreview.appendChild(header);
    bathPreview.appendChild(actionContainer);
    bathPreview.appendChild(footer);

   return bathPreview;
    
}