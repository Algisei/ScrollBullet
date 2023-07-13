var canvas;
var canvasContext;
var canvasWidth;
var canvasHeight;

var gameRunning = true;
var isGamePaused = false; // Флаг для определения, находится ли игра на паузе

var isShooting = false; // Флаг для определения, происходит ли стрельба

var keyState = {}; // Объект для отслеживания состояния клавиш

var keyActions = {
    87: "up",    // W или стрелка вверх
    38: "up",
    83: "down",  // S или стрелка вниз
    40: "down",
    65: "left",  // A или стрелка влево
    37: "left",
    68: "right", // D или стрелка вправо
    39: "right",
    32: "shoot"  // Пробел (клавиша стрельбы)
};

var bulletSizeBonusTime = 0;
var bulletSizeBonusDuration = 10; // Длительность бонуса увеличения размера пули в секундах

var bulletSpeedBonusTime = 0;
var bulletSpeedBonusDuration = 10; // Длительность бонуса увеличения скорости пули в секундах

// Функция для запуска игры
window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    // Установка размеров элементов при загрузке страницы
    setElementSizes();

    // Обновление игры
    setInterval(updateGame, 1000 / 30);

    // Обработчик изменения размера окна
    window.addEventListener("resize", setElementSizes);

    // Обработчик нажатия клавиш
    document.addEventListener("keydown", function(event) {
        handleKeyPress(event.keyCode, true);
    });
    document.addEventListener("keyup", function(event) {
        handleKeyPress(event.keyCode, false);
    });

    // Создание монстров
    createMonsters(monCount);

    // Создание бонусных шаров
    createBonusShards();
}

// Функция для отображения окна паузы
function showPauseWindow() {
    // Создание элементов окна паузы (можно использовать свои CSS стили)
    var pauseOverlay = document.createElement("div");
    pauseOverlay.id = "pauseOverlay";
    pauseOverlay.style.position = "absolute";
    pauseOverlay.style.top = "0";
    pauseOverlay.style.left = "0";
    pauseOverlay.style.width = "100%";
    pauseOverlay.style.height = "100%";
    pauseOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    pauseOverlay.style.display = "flex";
    pauseOverlay.style.alignItems = "center";
    pauseOverlay.style.justifyContent = "center";

    var pauseMessage = document.createElement("p");
    pauseMessage.textContent = "Game Paused";
    pauseMessage.style.color = "white";
    pauseMessage.style.fontSize = "24px";
    pauseOverlay.appendChild(pauseMessage);

    var resumeButton = document.createElement("button");
    resumeButton.textContent = "Resume";
    resumeButton.style.padding = "10px 20px";
    resumeButton.style.fontSize = "18px";
    resumeButton.style.backgroundColor = "blue";
    resumeButton.style.color = "white";
    resumeButton.style.border = "none";
    resumeButton.style.cursor = "pointer";
    resumeButton.style.marginTop = "20px";
    resumeButton.addEventListener("click", function() {
        closePauseWindow();
        isGamePaused = false;
    });
    pauseOverlay.appendChild(resumeButton);

    document.body.appendChild(pauseOverlay);
}

// Функция для закрытия окна паузы
function closePauseWindow() {
    var pauseOverlay = document.getElementById("pauseOverlay");
    if (pauseOverlay) {
        pauseOverlay.parentNode.removeChild(pauseOverlay);
    }
}

// Обработчик нажатия клавиши для паузы
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) { // Клавиша "ESC"
        if (isGamePaused) {
            closePauseWindow();
            isGamePaused = false;
        } else {
            showPauseWindow();
            isGamePaused = true;
        }
    }
});

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
    var action = keyActions[keyCode];

    switch (action) {
        case "up":
            keyState.up = isKeyDown;
            break;
        case "down":
            keyState.down = isKeyDown;
            break;
        case "left":
            keyState.left = isKeyDown;
            break;
        case "right":
            keyState.right = isKeyDown;
            break;
        case "shoot":
            isShooting = isKeyDown;
            break;
        default:
            break;
    }
}

// Функция для обновления состояния игрока на основе зажатых клавиш
function updatePlayerState() {
    if (keyState.up) {
        playerVelocityY = -1;
    } else if (keyState.down) {
        playerVelocityY = 1;
    } else {
        playerVelocityY = 0;
    }

    if (keyState.left) {
        playerVelocityX = -1;
    } else if (keyState.right) {
        playerVelocityX = 1;
    } else {
        playerVelocityX = 0;
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

    // Отрисовка монстров, только если игра активна
    if (gameRunning) {
        // Проверка расстояния между игроком и монстром
        var distance = Math.sqrt(
            Math.pow(playerX - monsterX, 2) + Math.pow(playerY - monsterY, 2)
        );
        // canvasContext.fillStyle = "red";
        // canvasContext.fillRect(monsterX, monsterY, monsterWidth, monsterHeight);
    }

    // Отрисовка монстров
    drawMonsters();
    // Отрисовка пуль
    drawBullets();
    // Отрисовка бонусов
    drawBonusShards();
    // Отрисовка таймеров бонусов
    drawBonusTimers();
}



// Функция для обновления игры
function updateGame() {
    if (gameRunning && !isGamePaused) {
        updatePlayerState();
        movePlayer();
        moveMonsters();
        
        checkBonusCollision();
        checkBonusDuration();

        if (isShooting) {
            createBullet();
        }

        updateBullets();
        drawEverything();
        drawBullets();
        drawBonusShards();
        drawBonusTimers(); // Вывод таймеров бонусов
        updateBonusTimers(); // Обновление таймеров бонусов
        checkCollision();
    } else {
        clearInterval();
    }
}
