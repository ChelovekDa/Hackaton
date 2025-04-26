// Пример данных бойцов
const fighters = [
    {
        name: "Генри Сехудо",
        nickname: "Король кефали",
        weightClass: "ПЕСО-МОСКА",
        country: "США",
        age: 36,
        record: "16-2-0",
        wins: 16,
        losses: 2,
        draws: 0,
        image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-03/CEJUDO_HENRY_L_BELT_03-04.png"
    },
    {
        name: "Ти Джей Диллашоу",
        nickname: "Килляшоу",
        weightClass: "ПЕСО-МОСКА",
        country: "США",
        age: 37,
        record: "17-5-0",
        wins: 17,
        losses: 5,
        draws: 0,
        image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-03/DILLASHAW_TJ_L_03-04.png"
    },
    {
        name: "Грег Харди",
        nickname: "Гигант",
        weightClass: "ПЕСО ПЕСАДО",
        country: "США",
        age: 34,
        record: "7-5-0",
        wins: 7,
        losses: 5,
        draws: 0,
        image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2021-07/HARDY_GREG_L_07-24.png"
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderFighters(fighters);

    // Обработчик формы добавления
    document.getElementById('add-fighter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewFighter();
    });
});

// Отображение бойцов
function renderFighters(fightersToRender) {
    const container = document.getElementById('fighter-container');
    container.innerHTML = '';

    fightersToRender.forEach(fighter => {
        const card = document.createElement('div');
        card.className = 'fighter-card';

        card.innerHTML = `
            <div class="fighter-header">
                <h3 class="fighter-name">${fighter.name}</h3>
                <p class="fighter-nickname">"${fighter.nickname}"</p>
            </div>
            <img src="${fighter.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${fighter.name}" class="fighter-image">
            <div class="fighter-info">
                <div class="info-row">
                    <span class="info-label">Весовая категория:</span>
                    <span class="info-value">${fighter.weightClass}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Страна:</span>
                    <span class="info-value">${fighter.country}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Возраст:</span>
                    <span class="info-value">${fighter.age}</span>
                </div>
                <div class="info-row">
                <span class="info-label">Рекорд:</span>
                    <span class="info-value">${fighter.record}</span>
                </div>
                <div class="fighter-stats">
                    <div class="stat">
                        <div class="stat-value">${fighter.wins}</div>
                        <div class="stat-label">Побед</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${fighter.losses}</div>
                        <div class="stat-label">Поражений</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${fighter.draws}</div>
                        <div class="stat-label">Ничьих</div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// Поиск бойцов
function searchFighters() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    if (!searchTerm) {
        renderFighters(fighters);
        return;
    }

    const filtered = fighters.filter(fighter =>
        fighter.name.toLowerCase().includes(searchTerm) ||
        fighter.nickname.toLowerCase().includes(searchTerm)
    );

    renderFighters(filtered);
}

// Фильтрация по весовой категории
function filterFighters() {
    const weightClass = document.getElementById('weight-class').value;
    if (!weightClass) {
        renderFighters(fighters);
        return;
    }

    const filtered = fighters.filter(fighter => fighter.weightClass === weightClass);
    renderFighters(filtered);
}

// Модальное окно
function openAddModal() {
    document.getElementById('add-modal').style.display = 'flex';
}

function closeAddModal() {
    document.getElementById('add-modal').style.display = 'none';
    document.getElementById('add-fighter-form').reset();
}

// Добавление нового бойца
function addNewFighter() {
    const name = document.getElementById('add-name').value;
    const nickname = document.getElementById('add-nickname').value;
    const weightClass = document.getElementById('add-weight-class').value;
    const country = document.getElementById('add-country').value;
    const age = document.getElementById('add-age').value;
    const record = document.getElementById('add-record').value;
    const image = document.getElementById('add-image').value;

    // Парсинг рекорда
    const [wins, losses, draws] = record.split('-').map(Number);

    const newFighter = {
        name,
        nickname: nickname || "Без прозвища",
        weightClass,
        country: country || "Не указана",
        age: age || 0,
        record,
        wins: wins || 0,
        losses: losses || 0,
        draws: draws || 0,
        image: image || ''
    };

    fighters.push(newFighter);
    renderFighters(fighters);
    closeAddModal();
}