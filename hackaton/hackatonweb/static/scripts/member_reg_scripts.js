// Показать/скрыть пароль
function togglePassword() {
const passwordInput = document.getElementById('password');
const eyeIcon = document.querySelector('.show-password i');

if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
} else {
    passwordInput.type = 'password';
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
}
}

// Проверка сложности пароля
document.getElementById('password').addEventListener('input', function(e) {
const password = e.target.value;
const strengthMeter = document.getElementById('password-strength');
let strength = 0;

if (password.length > 0) strength += 1;
if (password.length >= 8) strength += 1;
if (/[A-Z]/.test(password)) strength += 1;
if (/[0-9]/.test(password)) strength += 1;
if (/[^A-Za-z0-9]/.test(password)) strength += 1;

// Обновляем индикатор сложности
const width = (strength / 5) * 100;
strengthMeter.style.width = width + '%';

// Изменяем цвет в зависимости от сложности
if (strength <= 2) {
    strengthMeter.style.backgroundColor = '#ff5252';
} else if (strength <= 4) {
    strengthMeter.style.backgroundColor = '#ffab40';
} else {
    strengthMeter.style.backgroundColor = '#4caf50';
}
});

// Валидация формы
document.getElementById('registerForm').addEventListener('submit', function(e) {
e.preventDefault();
let isValid = true;

// Проверка имени пользователя
const username = document.getElementById('username').value;
if (username.trim() === '') {
    showError('username-error', 'username');
    isValid = false;
} else {
    hideError('username-error', 'username');
}

// Проверка email
const email = document.getElementById('email').value;
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email-error', 'email');
    isValid = false;
} else {
    hideError('email-error', 'email');
}

// Проверка пароля
const password = document.getElementById('password').value;
if (password.length < 8) {
    showError('password-error', 'password');
    isValid = false;
} else {
    hideError('password-error', 'password');
}

// Проверка подтверждения пароля
const confirmPassword = document.getElementById('confirm-password').value;
if (password !== confirmPassword) {
    showError('confirm-error', 'confirm-password');
    isValid = false;
} else {
    hideError('confirm-error', 'confirm-password');
}

// Если форма валидна, показываем сообщение об успехе
if (isValid) {
    document.querySelector('.success-message').style.display = 'block';
    // Здесь обычно отправка формы на сервер
// this.submit();
}
});

        function showError(errorId, inputId) {
            document.getElementById(errorId).style.display = 'block';
            document.getElementById(inputId).classList.add('input-error');
        }

        function hideError(errorId, inputId) {
            document.getElementById(errorId).style.display = 'none';
            document.getElementById(inputId).classList.remove('input-error');
        }