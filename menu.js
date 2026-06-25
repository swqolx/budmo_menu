const todaysMenu = {
    "Перші страви": [
        { name: "Борщ український з пампушками", weight: "350г", price: "95 грн", count: true },
        { name: "Суп гороховий з копченостями", weight: "300г", price: "80 грн", count: 2 }
    ],
    "Другі страви": [
        { name: "Вареники з м'ясом та шкварками", weight: "250г", price: "110 грн", count: 5 },
        { name: "Домашні котлети з картопляним пюре", weight: "120/200г", price: "125 грн", count: true },
        { name: "Деруни зі сметаною", weight: "300г", price: "85 грн", count: 0 }
    ],
    "Салати": [
        { name: "Салат зі свіжої капусти та огірка", weight: "150г", price: "45 грн", count: true },
        { name: "Олів'є домашнє", weight: "180г", price: "65 грн", count: 1 }
    ],
    "Напої": [
        { name: "Компот із сухофруктів (Узвар)", weight: "300мл", price: "25 грн", count: true },
        { name: "Чай трав'яний карпатський", weight: "400мл", price: "40 грн", count: true }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    const options = { month: 'long', day: 'numeric' };
    document.getElementById("current-date").innerText = new Date().toLocaleDateString('uk-UA', options);

    const menuContainer = document.getElementById("menu-content");
    if (!menuContainer) return;

    for (const [category, items] of Object.entries(todaysMenu)) {
        if (items.length === 0) continue;

        // Створюємо тег h2 для назви категорії
        const h2 = document.createElement("h2");
        h2.className = "category-title";
        h2.innerText = category;
        menuContainer.appendChild(h2);

        items.forEach(item => {
            // Створюємо тег div для самої картки страви
            const itemDiv = document.createElement("div");
            const isAvailable = item.count !== 0;
            
            itemDiv.className = isAvailable ? "menu-item" : "menu-item sold-out";

            let statusHTML = "";
            if (isAvailable && typeof item.count === 'number') {
                if (item.count <= 3) {
                    statusHTML = <div class="status-badge status-orange">🔥 Закінчується! Залишилось: ${item.count} порції</div>;
                } else if (item.count <= 6) {
                    statusHTML = <div class="status-badge status-yellow">⚠️ В наявності залишилось дуже мало: ${item.count}</div>;
                }
            }

            // Наповнюємо тег div структурою всередині
            itemDiv.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-weight">${item.weight}</div>
                    ${statusHTML}
                </div>
                <div class="item-price">${isAvailable ? item.price : "З'їли"}</div>
            `;
            
            menuContainer.appendChild(itemDiv);
        });
    }
});