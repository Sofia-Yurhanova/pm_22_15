
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
function fetchData(url, options = {}) {
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error("Помилка завантаження даних");
            }
            return response.json();
        })
        .then(data => {
            console.log("Отримані дані:", data);
            return data;
        })
        .catch(error => {
            console.error("Помилка:", error);
            throw error;
        });
}

// Асинхронна функція для отримання даних
async function getData() {
    try {
        const data = await fetchData("http://localhost:8080/data/data.json", { cache: "no-store" });
        console.log("Отримані дані:", data);
        renderData(data);
    } catch (error) {
        console.error("Помилка при отриманні даних:", error);
    }
}

// Функція для рендерингу даних
function renderData(data) {
    if (data.education && Array.isArray(data.education)) {
        renderEducation(data.education);
    } else {
        console.error("Дані education відсутні або некоректні:", data.education);
    }
}

// Функція для рендерингу секції "Освіта"
function renderEducation(education) {
    const container = document.querySelector(".education.roll-block");
    container.innerHTML = ""; // Очищення контейнера

    const educationHTML = education.map(item => `
        <div class="education-item">
             
            
             <p class="year">${item.year}</p>
             <p class="degree"><strong>${item.degree}</strong></p>
             <p class="institution">${item.institution}</p>
        </div>
    `).join('');

    container.innerHTML = educationHTML;
}

// Виклик функції для отримання та рендерингу даних
getData().then(res => console.log("Результат:", res));
