// Глобальные переменные
var canvas;
var canvasContext;
var canvasWidth;
var canvasHeight;

var playerX;
var playerY;
var playerWidth = 20;
var playerHeight = 20;
var playerSpeed = 5; // Скорость движения игрока
var playerVelocityX = 0; // Скорость перемещения по оси X
var playerVelocityY = 0; // Скорость перемещения по оси Y

var monsters = []; // Массив для хранения монстров
var monCount = 10; // Задаём количество монстров
var monsterX = 0;
var monsterY = 0;
var monsterSpeed = 2; // Скорость движения монстров
var monsterWidth = 20;
var monsterHeight = 20;
// Переменные для хранения координат точки появления монстра
var monsterSpawnX;
var monsterSpawnY;

var gameRunning = true;
var isShooting = false; // Флаг для определения, происходит ли стрельба

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

    // Создание монстров
    createMonsters(monCount);
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
    var action = keyActions[keyCode];

    switch (action) {
        case "up":
            playerVelocityY = isKeyDown ? -1 : 0;
            break;
        case "down":
            playerVelocityY = isKeyDown ? 1 : 0;
            break;
        case "left":
            playerVelocityX = isKeyDown ? -1 : 0;
            break;
        case "right":
            playerVelocityX = isKeyDown ? 1 : 0;
            break;
        case "shoot":
            isShooting = isKeyDown;
            break;
        default:
            break;
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
        // canvasContext.fillStyle = "red";
        // canvasContext.fillRect(monsterX, monsterY, monsterWidth, monsterHeight);
    
}
// Отрисовка монстров
drawMonsters();
// Отрисовка пуль
drawBullets();
}

// Функция для обновления игры
function updateGame() {
    if (gameRunning) {
        movePlayer();
         // Обновление движения монстров
        moveMonsters();
        checkCollision();

        // Создание пули при нажатии клавиши стрельбы
        if (isShooting) {
            createBullet();
        }

        updateBullets();
        drawEverything();
        drawBullets();
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

// Функция для создания монстров
function createMonsters(numMonsters) {
    for (var i = 0; i < numMonsters; i++) {
        var monster = {
            x: Math.random() * (canvasWidth - monsterWidth),
            y: Math.random() * (canvasHeight - monsterHeight),
            speed: monsterSpeed
        };
        monsters.push(monster);
    }
}

// Функция для отрисовки монстров
function drawMonsters() {
    for (var i = 0; i < monsters.length; i++) {
        var monster = monsters[i];
        canvasContext.fillStyle = "red";
        canvasContext.fillRect(monster.x, monster.y, monsterWidth, monsterHeight);
    }
}

// Функция для движения монстров
function moveMonsters() {
    for (var i = 0; i < monsters.length; i++) {
        var monster = monsters[i];
        if (monster.x < playerX) {
            monster.x += monster.speed;
        }
        if (monster.x > playerX) {
            monster.x -= monster.speed;
        }
        if (monster.y < playerY) {
            monster.y += monster.speed;
        }
        if (monster.y > playerY) {
            monster.y -= monster.speed;
        }
    }
}



// Функция для проверки столкновения игрока с монстрами
function checkCollision() {
    for (var i = 0; i < monsters.length; i++) {
        var monster = monsters[i];
        if (
            playerX < monster.x + monsterWidth &&
            playerX + playerWidth > monster.x &&
            playerY < monster.y + monsterHeight &&
            playerY + playerHeight > monster.y
        ) {
            gameRunning = false;
            alert("Game over!");
            break;
        }
    }
}

















// // Функция для движения монстра к игроку
// function moveMonster() {
//     if (monsterX < playerX) {
//         monsterX += 2;
//     }
//     if (monsterX > playerX) {
//         monsterX -= 2;
//     }
//     if (monsterY < playerY) {
//         monsterY += 2;
//     }
//     if (monsterY > playerY) {
//         monsterY -= 2;
//     }
// }

// // Функция для проверки столкновения игрока с монстром
// function checkCollision() {
//     if (playerX < monsterX + monsterWidth &&
//         playerX + playerWidth > monsterX &&
//         playerY < monsterY + monsterHeight &&
//         playerY + playerHeight > monsterY) {
//         gameRunning = false;
//         alert("Game over!");
//     }
// }
