
const btnRoll = document.getElementsByClassName("roll");
const blockRoll = document.getElementsByClassName("roll-block");
Array.from(btnRoll).forEach((btn, index) => {
    btn.addEventListener("click", () => showOrHide(blockRoll[index]));
});
function showOrHide(block) {
    if (block.style.maxHeight) {
        block.style.maxHeight = null;
    } else {
        block.style.maxHeight = "300vh";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress");

    progressBars.forEach((progress) => {
        const targetWidth = parseInt(progress.getAttribute("data-target-width"), 10);
        let currentWidth = 0;
        const increment = 1;
        let isAnimating = true;

        const animateProgress = () => {
            if (isAnimating && currentWidth < targetWidth) {
                currentWidth += increment;
                progress.style.width = `${currentWidth}%`;
                requestAnimationFrame(animateProgress);
            }
        };

        animateProgress();

        progress.parentElement.addEventListener("mousemove", (e) => {
            const barWidth = progress.parentElement.offsetWidth;
            const mouseX = e.offsetX;
            currentWidth = Math.min((mouseX / barWidth) * 100, 100);
            progress.style.width = `${currentWidth}%`;
        });
    });
});


