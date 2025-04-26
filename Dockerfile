# Используем официальный образ Python в качестве базового
FROM python:3.13-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл зависимостей в контейнер
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект в контейнер
COPY ./hackaton /app/

# Указываем переменную окружения для Django
ENV PYTHONUNBUFFERED 1

# Открываем порт, на котором будет работать приложение
EXPOSE 80

# Команда для запуска сервера
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]