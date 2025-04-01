export const actionBtn = document.createElement("div");
actionBtn.classList.add("action");
actionBtn.textContent = "+";

actionBtn.addEventListener("click", () => {
    console.log('Action button clicked!');
    const modal = document.querySelector("#modal");
    modal.style.display = "block";
    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
});
