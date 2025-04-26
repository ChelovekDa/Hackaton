// Добавление полей для опыта
function addExperienceField() {
    const container = document.getElementById('experienceContainer');
    const newItem = document.createElement('div');
    newItem.className = 'experience-item';
    newItem.innerHTML = `
        <div style="flex: 1;">
            <label>Название мероприятия</label>
            <input type="text" name="eventName[]">
        </div>
        <div style="flex: 1;">
            <label>Год проведения</label>
            <input type="number" name="eventYear[]" min="2000" max="2023">
        </div>
        <div style="flex: 1;">
            <label>Роль</label>
            <input type="text" name="eventRole[]">
        </div>
        <div style="display: flex; align-items: center;">
<i class="fas fa-times" style="color: var(--primary-color); cursor: pointer;"
onclick="this.parentElement.parentElement.remove()"></i>
        </div>
    `;
    container.appendChild(newItem);
}

// Обработка отправки формы
document.getElementById('organizerRegistration').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Ваша заявка на регистрацию успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});

// Обработка загрузки документов
document.getElementById('documents').addEventListener('change', function(e) {
    const files = e.target.files;
    if (files.length > 0) {
        const uploadDiv = document.querySelector('.document-upload');
        uploadDiv.innerHTML = `
            <i class="fas fa-check-circle" style="color: green;"></i>
            <p>Выбрано файлов: ${files.length}</p>
            <p><small>${Array.from(files).map(f => f.name).join(', ')}</small></p>
        `;
    }
});