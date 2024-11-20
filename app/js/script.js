
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
        let isAnimating = true; // Стан анімації

        const animateProgress = () => {
            if (isAnimating && currentWidth < targetWidth) {
                currentWidth += increment;
                progress.style.width = `${currentWidth}%`;
                requestAnimationFrame(animateProgress);
            }
        };

        // Запускаємо анімацію
        animateProgress();

        // Наведення мишкою — змінюємо ширину на поточну позицію
        progress.parentElement.addEventListener("mousemove", (e) => {
            const barWidth = progress.parentElement.offsetWidth;
            const mouseX = e.offsetX;
            currentWidth = Math.min((mouseX / barWidth) * 100, 100); // Розрахунок нової ширини
            progress.style.width = `${currentWidth}%`;
        });

        // Клік — зупиняємо анімацію на поточній позиції
        progress.parentElement.addEventListener("click", () => {
            isAnimating = false; // Зупиняємо анімацію
            progress.style.width = `${currentWidth}%`; // Фіксуємо поточну ширину
        });
    });
});

/*document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress");

    progressBars.forEach((progress) => {
        const targetWidth = parseInt(progress.getAttribute("data-target-width"), 10); // Цільова ширина
        let currentWidth = 0; // Початкова ширина
        const increment = 1; // Крок анімації

        const animateProgress = () => {
            if (currentWidth < targetWidth) {
                currentWidth += increment; // Збільшуємо ширину
                progress.style.width = `${currentWidth}%`; // Оновлюємо ширину
                requestAnimationFrame(animateProgress); // Продовжуємо анімацію
            } else {
                progress.style.width = `${targetWidth}%`; // Встановлюємо остаточну ширину
            }
        };

        animateProgress(); // Запускаємо анімацію
    });
});*/


/*function animateProgressBars() {
    const progressBars = document.querySelectorAll(".progress");

    progressBars.forEach((progressBar) => {
        const width = progressBar.style.width; // Отримуємо початкову ширину
        progressBar.style.width = "0"; // Спочатку встановлюємо ширину 0
        setTimeout(() => {
            progressBar.style.width = width; // Відновлюємо початкову ширину для анімації
        }, 100); // Затримка перед початком анімації
    });
}*/
