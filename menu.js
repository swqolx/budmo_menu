// ==========================================
// МЕНЮ КАФЕ «БУДЬМО» (5 КАТЕГОРІЙ):
// Змінюйте страви, ціни та кількість тут
// ==========================================
const todaysMenu = {
    "Перші страви": [
        { name: "Борщ український з пампушками", weight: "350г", price: "95 грн", count: true },
        { name: "Суп гороховий з копченостями", weight: "300г", price: "80 грн", count: 2 }
    ],
    "Другі страви": [
        { name: "Вареники з м'ясом та шкварками", weight: "250г", price: "110 грн", count: 5 },
        { name: "Деруни зі сметаною та грибами", weight: "300г", price: "90 грн", count: true }
    ],
    "М'ясні страви": [
        { name: "Домашні котлети з пюре", weight: "120/200г", price: "125_грн", count: true },
        { name: "Крученики свинячі з чорносливом", weight: "200г", price: "145 грн", count: 1 },
        { name: "Шашлик курячий з лавашем", weight: "150г", price: "130 грн", count: 0 } // Приклад: Закінчився
    ],
    "Салати": [
        { name: "Салат зі свіжої капусти та огірка", weight: "150г", price: "45 грн", count: true },
        { name: "Олів'є домашнє з куркою", weight: "180г", price: "65 грн", count: 3 }
    ],
    "Напої": [
        { name: "Компот із сухофруктів (Узвар)", weight: "300мл", price: "25_грн", count: true },
        { name: "Чай трав'яний карпатський", weight: "400мл", price: "40 грн", count: true }
    ]
};

// Головна функція, яка спрацьовує одразу при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
    // 1. Автоматичне оновлення дати
    const options = { month: 'long', day: 'numeric' };
    const dateBadge = document.getElementById("current-date");
    if (dateBadge) {
        dateBadge.innerText = new Date().toLocaleDateString('uk-UA', options);
    }

    // 2. Шукаємо контейнер для меню
    const menuContainer = document.getElementById("menu-content");
    if (!menuContainer) {
        console.error("Помилка: елемент id='menu-content' не знайдено в HTML!");
        return;
    }

    // Очищаємо блок перед виводом (щоб нічого не дублювалося)
    menuContainer.innerHTML = "";

    // 3. Перебираємо категорії та додаємо їх на сайт
    for (const [categoryName, items] of Object.entries(todaysMenu)) {
        // Якщо в категорії немає страв, пропуск
        if (items.length === 0) continue;

        // Створюємо та додаємо тег h2 для назви категорії
        const categoryHeader = document.createElement("h2");
        categoryHeader.className = "category-title";
        categoryHeader.innerText = categoryName;
        menuContainer.appendChild(categoryHeader);

        // Додаємо кожну страву під своєю категорією
        items.forEach(item => {
            const itemDiv = document.createElement("div");
            const isAvailable = item.count !== 0;
            
            // Надаємо правильні класи для стилів
            itemDiv.className = isAvailable ? "menu-item" : "menu-item sold-out";

            // Створюємо плашки для маленької кількості порцій
            let statusHTML = "";
            if (isAvailable && typeof item.count === 'number') {
                if (item.count <= 3) {
                    statusHTML = <div class="status-badge status-orange">🔥 Закінчується! Залишилось: ${item.count} порції</div>;
                } else if (item.count <= 6) {
                    statusHTML = <div class="status-badge status-yellow">⚠️ В наявності залишилось дуже мало: ${item.count}</div>;
                }
            }

            // Наповнюємо тегами картку страви всередині
            itemDiv.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-weight">${item.weight}</div>
                    ${statusHTML}
                </div>
                <div class="item-price">${isAvailable ? item.price : "З'їли"}</div>
            `;
            
            // Фізично вставляємо страву під назву категорії
            menuContainer.appendChild(itemDiv);
        });
    }
});