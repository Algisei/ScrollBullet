// Глобальные переменные
var canvas;
var canvasContext;
var canvasWidth;
var canvasHeight;
var playerX;
var playerY;
var playerWidth = 50;
var playerHeight = 50;
var playerSpeed = 5; // Скорость движения игрока
var playerVelocityX = 0; // Скорость перемещения по оси X
var playerVelocityY = 0; // Скорость перемещения по оси Y
var monsterX = 100;
var monsterY = 100;
var monsterWidth = 50;
var monsterHeight = 50;
var gameRunning = true;

// Функция для установки размеров элементов
function setElementSizes() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    playerX = canvasWidth / 2;
    playerY = canvasHeight / 2;
}

// Функция для движения игрока
function movePlayer() {
    playerX += playerVelocityX;
    playerY += playerVelocityY;

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

// Функция для обработки нажатия клавиш
document.addEventListener("keydown", function(event) {
    movePlayer(event.keyCode, true);
});
document.addEventListener("keyup", function(event) {
    movePlayer(event.keyCode, false);
});


// Функция для обновления игры
function updateGame() {
    if (gameRunning) {
        moveMonster();
        checkCollision();
        movePlayer();
        drawEverything();
    } else {
        // Остановка игры
        clearInterval();
    }
}

// Функция для отрисовки игровых объектов
function drawEverything() {
    // Очистка холста
    colorRect(0, 0, canvasWidth, canvasHeight, "black");

    // Отрисовка игрока
    colorRect(playerX, playerY, playerWidth, playerHeight, "blue");

    // Отрисовка монстра
    colorRect(monsterX, monsterY, monsterWidth, monsterHeight, "red");
}

// Функция для движения игрока
function movePlayer() {
    playerX += playerVelocityX;
    playerY += playerVelocityY;

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
