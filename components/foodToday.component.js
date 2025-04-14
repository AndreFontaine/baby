import { changeDateFormat } from "../scripts/utils.js";

export function createfoodRTodayResumeContent(item) {

    const container = document.createElement("div");
    container.classList.add("container");

    // Sub-title
    const subTitle = document.createElement("div");
    subTitle.classList.add("today-title");

    const today = changeDateFormat(new Date());

    subTitle.textContent = `Aujourd'hui, ${today}`;

    // Function to create an info block
    function createInfoBlock(emoji, quantityText1, value1, label1, quantityText2, value2) {
        const info = document.createElement("div");
        info.classList.add("info");

        const content = document.createElement("div");
        content.classList.add("content");

        const emojiDiv = document.createElement("div");
        emojiDiv.textContent = emoji;

        const dataDiv = document.createElement("div");
        dataDiv.classList.add("data");

        const dataItem1 = document.createElement("div");
        const quantitySpan1 = document.createElement("span");
        quantitySpan1.classList.add("quantity");
        quantitySpan1.textContent = quantityText1;
        dataItem1.appendChild(quantitySpan1);
        dataItem1.append(` ${value1} ${label1}`);

        const dataItem2 = document.createElement("div");
        const quantitySpan2 = document.createElement("span");
        quantitySpan2.classList.add("quantity");
        quantitySpan2.textContent = quantityText2;
        dataItem2.appendChild(quantitySpan2);
        dataItem2.append(` ${value2}`);

        dataDiv.appendChild(dataItem1);
        dataDiv.appendChild(dataItem2);

        content.appendChild(emojiDiv);
        content.appendChild(dataDiv);
        info.appendChild(content);

        return info;
    }

    // Create info blocks
    const breastfeedingInfo = createInfoBlock("🤱", "Durée totale:", item.breast.duration, "min", "Nombre de tétees:", item.breast.times);
    const bottleInfo = createInfoBlock("🍼", "Volume totale:", item.bottle.volume, "mL", "Nombre de biberons:", item.bottle.times);

    // Append elements to container
    container.appendChild(subTitle);
    container.appendChild(breastfeedingInfo);
    container.appendChild(bottleInfo);

   return container;
    
}