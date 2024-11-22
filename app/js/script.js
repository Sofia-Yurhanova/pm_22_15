
const btnRoll = document.getElementsByClassName("roll");
const blockRoll = document.getElementsByClassName("roll-block");
Array.from(btnRoll).forEach((btn, index) => {
    btn.addEventListener("click", () => {
        showOrHide(blockRoll[index], btn.querySelector('.checkmark-b, .checkmark-w'));
    });
});
function showOrHide(block, arrow) {
    if (block.style.maxHeight) {
        block.style.maxHeight = null;
        arrow.style.transform = "translate(-50%, -75%) rotate(-45deg)"; // Повернення до початкової позиції
    } else {
        block.style.maxHeight = "300vh";
        arrow.style.transform = "translate(-75%, -50%) rotate(-135deg)"; // Обертання на 90 градусів проти годинникової
    }
}


/*document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress");

    progressBars.forEach((progress) => {
        const targetWidth = parseInt(progress.getAttribute("data-target-width"), 10);
        let currentWidth = 0;
        const increment = 1;
        let isAnimating = true;
        let isLocked = false;

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
            isLocked = !isLocked; // Перемикання стану блокування
            progress.parentElement.classList.toggle("locked", isLocked);
        });

        progress.parentElement.addEventListener("click", () => {
            progress.style.width = `${currentWidth}%`;
        });
    });
});*/

document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress");

    progressBars.forEach((progress) => {
        const targetWidth = parseInt(progress.getAttribute("data-target-width"), 10);
        let currentWidth = 0; // Поточне зафіксоване значення
        let hoverWidth = 0;   // Значення під час наведення
        let isLocked = false; // Чи зафіксовано значення

        const animateProgress = () => {
            if (!isLocked && currentWidth < targetWidth) {
                currentWidth++;
                progress.style.width = `${currentWidth}%`;
                requestAnimationFrame(animateProgress);
            }
        };

        animateProgress();

        progress.parentElement.addEventListener("mousemove", (e) => {
            if (!isLocked) {
                const barWidth = progress.parentElement.offsetWidth;
                const mouseX = e.offsetX;
                hoverWidth = Math.min((mouseX / barWidth) * 100, 100);
                progress.style.width = `${hoverWidth}%`; // Показуємо "потенційний прогрес"
            }
        });

        progress.parentElement.addEventListener("mouseleave", () => {
            if (!isLocked) {
                progress.style.width = `${currentWidth}%`; // Повертаємо до попереднього стану
            }
        });

        progress.parentElement.addEventListener("click", () => {
            if (!isLocked) {
                currentWidth = hoverWidth; // Фіксуємо значення
                isLocked = true;
                progress.style.width = `${currentWidth}%`;
            } else {
                isLocked = false; // Дозволяємо зміну після другого кліку
            }
        });
    });
});

/*
document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress");

    progressBars.forEach((progress) => {
        // Початкова фіксація ширини з HTML
        let currentWidth = parseInt(progress.style.width, 10) ||
            parseInt(progress.getAttribute("data-target-width"), 10) ||
            0;
        let hoverWidth = currentWidth; // Поточне значення при наведенні
        let isLocked = true; // Фіксація початкового стану

        // Встановлюємо початкову ширину з HTML
        progress.style.width = `${currentWidth}%`;

        // Наведення: оновлюємо ширину без фіксації
        progress.parentElement.addEventListener("mousemove", (e) => {
            if (!isLocked) {
                const barWidth = progress.parentElement.offsetWidth;
                const mouseX = e.offsetX;
                hoverWidth = Math.min((mouseX / barWidth) * 100, 100); // Обчислюємо %
                progress.style.width = `${hoverWidth}%`; // Показуємо зміну
            }
        });

        // Клік: фіксуємо поточне значення
        progress.parentElement.addEventListener("click", () => {
            isLocked = false; // Дозволяємо зміни
            currentWidth = hoverWidth; // Фіксуємо значення
            progress.style.width = `${currentWidth}%`; // Оновлюємо відображення
        });
    });
});
*/
