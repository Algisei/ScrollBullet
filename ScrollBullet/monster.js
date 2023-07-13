var monsters = []; // Массив для хранения монстров
var monCount = 100; // Задаём количество монстров
var monsterX = 0;
var monsterY = 0;
var monsterSpeed = 2; // Скорость движения монстров
var monsterWidth = 20;
var monsterHeight = 20;
// Переменные для хранения координат точки появления монстра
var monsterSpawnX;
var monsterSpawnY;

// Функция для создания монстров
function createMonsters(numMonsters) {
    for (var i = 0; i < numMonsters; i++) {
        var monster = {
            x: 0,
            y: 0,
            speed: monsterSpeed
        };
        resetMonsterPosition(monster);
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
