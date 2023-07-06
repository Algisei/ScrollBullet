// Глобальные переменные
var bullets = []; // Массив для хранения пуль
var bulletSize = 1;
var bulletSpeed = 8;

// Функция для создания пули
function createBullet() {
    var bullet = {
        x: playerX + playerWidth / 2 - bulletSize / 2,
        y: playerY + playerHeight / 2 - bulletSize / 2,
        velocityX: 0,
        velocityY: 0
    };

    // Определение направления движения пули
    var deltaX = monsterX + monsterWidth / 2 - bullet.x;
    var deltaY = monsterY + monsterHeight / 2 - bullet.y;
    var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    bullet.velocityX = (deltaX / distance) * bulletSpeed;
    bullet.velocityY = (deltaY / distance) * bulletSpeed;

    bullets.push(bullet);
}

// Функция для обновления пуль
function updateBullets() {
    for (var i = bullets.length - 1; i >= 0; i--) {
        var bullet = bullets[i];
        bullet.x += bullet.velocityX;
        bullet.y += bullet.velocityY;

        // Удаление пули, если она вышла за пределы игрового поля
        if (bullet.x < 0 || bullet.x > canvasWidth || bullet.y < 0 || bullet.y > canvasHeight) {
            bullets.splice(i, 1);
        }

        // Проверка столкновения пули с монстром
        if (bullet.x < monsterX + monsterWidth &&
            bullet.x + bulletSize > monsterX &&
            bullet.y < monsterY + monsterHeight &&
            bullet.y + bulletSize > monsterY) {
           // Монстр попадает под пулю - исчезает
           bullets.splice(i, 1);
           resetMonsterPosition();
           break;

            // gameRunning = false;
            // alert("Игра окончена!");
            // break;
        }
    }
}

// Функция для сброса координат монстра
function resetMonsterPosition() {
    var minDistance = 100; // Минимальное расстояние от игрока до монстра

    // Генерация случайных координат монстра
    do {
        monsterX = Math.random() * (canvasWidth - monsterWidth);
        monsterY = Math.random() * (canvasHeight - monsterHeight);
    } while (
        monsterX + monsterWidth / 2 >= playerX - minDistance &&
        monsterX + monsterWidth / 2 <= playerX + playerWidth + minDistance &&
        monsterY + monsterHeight / 2 >= playerY - minDistance &&
        monsterY + monsterHeight / 2 <= playerY + playerHeight + minDistance
    );
}



// Функция для отрисовки пуль
function drawBullets() {
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        canvasContext.fillStyle = "yellow";
        canvasContext.fillRect(bullet.x, bullet.y, bulletSize, bulletSize);
    }
}

// Обработчик нажатия клавиши для стрельбы
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) { // Пробел
        createBullet();
    }
});


