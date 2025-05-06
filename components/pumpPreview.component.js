import { actionBtn } from "../actionButton.js";

export function createPumpPreviewContent(item) {

    const pumpPreview = document.createElement("div");
    pumpPreview.classList.add("container");

    // Header Section
    const header = document.createElement("div");
    header.classList.add("header");

    const headerTitle = document.createElement("span");
    headerTitle.textContent = "Pompages";

    header.appendChild(headerTitle);

    const action = actionBtn.cloneNode(true);
    action.addEventListener("click", () => {
        window.location.href = "newPump.page.html";
    });

    header.appendChild(action);

    // Preview Section
    const preview = document.createElement("div");
    preview.classList.add("preview");

    const peeIcon = document.createElement("div");
    peeIcon.textContent = "🍶";

    const smallText = document.createElement("div");
    smallText.classList.add("preview-text");
    smallText.textContent = "Dernier pompage";

    const timeText = document.createElement("div");
    timeText.classList.add("preview-duration");
    timeText.textContent = item.duration;

    preview.appendChild(peeIcon);
    preview.appendChild(smallText);
    preview.appendChild(timeText);

    const actionContainer = document.createElement("div");
    actionContainer.appendChild(preview);
    actionContainer.addEventListener("click", () => {
        window.location.href = "pump.page.html";
    });

    // Footer Section
    const footer = document.createElement("div");
    footer.classList.add("footer");

    const totalText = document.createElement("div");
    totalText.classList.add("preview-text");
    totalText.textContent = "Total aujourd'hui";

    const quantitiesDiv = document.createElement("div");
    quantitiesDiv.classList.add("quantities");

    const peeCountIcon = document.createElement("span");
    peeCountIcon.textContent = "🍶";

    const peeAmount = document.createElement("span");
    peeAmount.textContent = item.times;

    const jarIcon = document.createElement("span");
    jarIcon.textContent = "🫙";

    const jarAmount = document.createElement("span");
    jarAmount.textContent = item.volume + " mL";

    quantitiesDiv.appendChild(totalText);
    quantitiesDiv.appendChild(peeCountIcon);
    quantitiesDiv.appendChild(peeAmount);

    quantitiesDiv.appendChild(jarIcon);
    quantitiesDiv.appendChild(jarAmount);

    footer.appendChild(quantitiesDiv);

    // Append everything to the main container
    pumpPreview.appendChild(header);
    pumpPreview.appendChild(actionContainer);
    pumpPreview.appendChild(footer);

   return pumpPreview;
    
}