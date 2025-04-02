const breastForm = document.querySelector("#formBreast");
const bottleForm = document.querySelector("#formBottle");

document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll('input[name="foodType"]');

    radioButtons.forEach(radio => {
        radio.addEventListener("change", () => {
            console.log(`Selected option: ${radio.value}`);
            // Load the corresponding template
            if (radio.value === "breast") {
                breastForm.style.display = "block";
                bottleForm.style.display = "none";
            }
            if (radio.value === "bottle") {
                bottleForm.style.display = "block";
                breastForm.style.display = "none";
            }
        });
    });
});
