// Глобальные переменные
var canvas;
var canvasContext;
var canvasWidth;
var canvasHeight;
var playerX;
var playerY;
var playerWidth = 25;
var playerHeight = 25;
var playerSpeed = 5; // Скорость движения игрока
var playerVelocityX = 0; // Скорость перемещения по оси X
var playerVelocityY = 0; // Скорость перемещения по оси Y
var monsterX = 100;
var monsterY = 100;
var monsterWidth = 20;
var monsterHeight = 20;
var gameRunning = true;

// Функция для запуска игры
window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    // Установка размеров элементов при загрузке страницы
    setElementSizes();

    // Установка интервала для обновления игры
    setInterval(updateGame, 1000/30);

    // Обработчик изменения размера окна
    window.addEventListener("resize", setElementSizes);

    // Обработчик нажатия клавиш
    document.addEventListener("keydown", function(event) {
        handleKeyPress(event.keyCode, true);
    });
    document.addEventListener("keyup", function(event) {
        handleKeyPress(event.keyCode, false);
    });
}

// Функция для обновления игры
function updateGame() {
    if (gameRunning) {
        movePlayer();
        moveMonster();
        checkCollision();
        drawEverything();
    } else {
        // Остановка игры
        clearInterval();
    }
}

// Функция для установки размеров элементов
function setElementSizes() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    playerX = canvasWidth / 2;
    playerY = canvasHeight / 2;
}

// Функция для обработки нажатия клавиш
function handleKeyPress(keyCode, isKeyDown) {
    // Вверх
    if (keyCode === 87 || keyCode === 38) {
        playerVelocityY = isKeyDown ? -1 : 0;
    }
    // Вниз
    else if (keyCode === 83 || keyCode === 40) {
        playerVelocityY = isKeyDown ? 1 : 0;
    }
    // Влево
    else if (keyCode === 65 || keyCode === 37) {
        playerVelocityX = isKeyDown ? -1 : 0;
    }
    // Вправо
    else if (keyCode === 68 || keyCode === 39) {
        playerVelocityX = isKeyDown ? 1 : 0;
    }
}

// Функция для отрисовки игровых объектов
function drawEverything() {
    // Очистка холста
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

    // Отрисовка игрока
canvasContext.fillStyle = "blue";
canvasContext.fillRect(playerX, playerY, playerWidth, playerHeight);

// Отрисовка монстра, только если игра активна
if (gameRunning) {
    // Проверка расстояния между игроком и монстром
    var distance = Math.sqrt(
        Math.pow(playerX - monsterX, 2) + Math.pow(playerY - monsterY, 2)
    );
    var minDistance = 100; // Минимальное расстояние от игрока до монстра

    if (distance > minDistance) {
        canvasContext.fillStyle = "red";
        canvasContext.fillRect(monsterX, monsterY, monsterWidth, monsterHeight);
    }
}

// Отрисовка пуль
drawBullets();
}


// Функция для обновления игры
function updateGame() {
    if (gameRunning) {
        movePlayer();
        moveMonster();
        checkCollision();
        updateBullets(); // Добавлено обновление пуль
        drawEverything();
        drawBullets(); // Добавлено отрисовка пуль
    } else {
        // Остановка игры
        clearInterval();
    }
}

// Функция для движения игрока
function movePlayer() {
    playerX += playerVelocityX * playerSpeed;
    playerY += playerVelocityY * playerSpeed;

    // Ограничение движения игрока в пределах игрового поля
    if (playerX < 0) {
        playerX = 0;
    } else if (playerX + playerWidth > canvasWidth) {
        playerX = canvasWidth - playerWidth;
    }

    if (playerY < 0) {
        playerY = 0;
    } else if (playerY + playerHeight > canvasHeight) {
        playerY = canvasHeight - playerHeight;
    }
}

// Функция для движения монстра к игроку
function moveMonster() {
    if (monsterX < playerX) {
        monsterX += 2;
    }
    if (monsterX > playerX) {
        monsterX -= 2;
    }
    if (monsterY < playerY) {
        monsterY += 2;
    }
    if (monsterY > playerY) {
        monsterY -= 2;
    }
}

// Функция для проверки столкновения игрока с монстром
function checkCollision() {
    if (playerX < monsterX + monsterWidth &&
        playerX + playerWidth > monsterX &&
        playerY < monsterY + monsterHeight &&
        playerY + playerHeight > monsterY) {
        gameRunning = false;
        alert("Игра окончена!");
    }
}
