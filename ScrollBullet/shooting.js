// Глобальные переменные
var bullets = []; // Массив для хранения пуль
var bulletSize = 1;
var bulletSpeed = 25;
// Переменные для хранения координат точки появления монстра
var monsterSpawnX;
var monsterSpawnY;

// Функция для создания пули
function createBullet() {
    var bullet = {
        x: playerX + playerWidth / 2 - bulletSize / 2,
        y: playerY + playerHeight / 2 - bulletSize / 2,
        velocityX: 0,
        velocityY: 0
    };

    // Определение направления движения пули если есть монстры
    if (monsters.length > 0) {
        var nearestMonster = findNearestMonster();
        var deltaX = nearestMonster.x + monsterWidth / 2 - bullet.x;
        var deltaY = nearestMonster.y + monsterHeight / 2 - bullet.y;
        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        bullet.velocityX = (deltaX / distance) * bulletSpeed;
        bullet.velocityY = (deltaY / distance) * bulletSpeed;
        bullets.push(bullet);
    } 
}

// Функция для поиска ближайшего монстра
function findNearestMonster() {
    var nearestMonster = null;
    var minDistance = Infinity;

    for (var i = 0; i < monsters.length; i++) {
        var monster = monsters[i];
        var distance = Math.sqrt(
            Math.pow(playerX - monster.x, 2) + Math.pow(playerY - monster.y, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            nearestMonster = monster;
        }
    }

    return nearestMonster;
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
        } else {
            // Проверка столкновения пули с каждым монстром
            for (var j = 0; j < monsters.length; j++) {
                var monster = monsters[j];
                if (
                    bullet.x < monster.x + monsterWidth &&
                    bullet.x + bulletSize > monster.x &&
                    bullet.y < monster.y + monsterHeight &&
                    bullet.y + bulletSize > monster.y
                ) {
                    // Монстр попадает под пулю - исчезает
                    bullets.splice(i, 1);
                    resetMonsterPosition(monster);
                    break;
                }
            }
        }
    }
}

// Функция для сброса координат монстра
function resetMonsterPosition(monster) {
    var minDistance = 100; // Минимальное расстояние от точки появления до игрока

    // Генерация случайных координат точки появления монстра
    do {
        monsterSpawnX = Math.random() * (canvasWidth - monsterWidth);
        monsterSpawnY = Math.random() * (canvasHeight - monsterHeight);
    } while (
        monsterSpawnX + monsterWidth / 2 >= playerX - minDistance &&
        monsterSpawnX + monsterWidth / 2 <= playerX + playerWidth + minDistance &&
        monsterSpawnY + monsterHeight / 2 >= playerY - minDistance &&
        monsterSpawnY + monsterHeight / 2 <= playerY + playerHeight + minDistance
    );

    // Установка координат монстра в точку появления
    monster.x = monsterSpawnX;
    monster.y = monsterSpawnY;
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





// // Глобальные переменные
// var bullets = []; // Массив для хранения пуль
// var bulletSize = 1;
// var bulletSpeed = 25;
// // Переменные для хранения координат точки появления монстра
// var monsterSpawnX;
// var monsterSpawnY;

// // Функция для создания пули
// function createBullet() {
//     var bullet = {
//         x: playerX + playerWidth / 2 - bulletSize / 2,
//         y: playerY + playerHeight / 2 - bulletSize / 2,
//         velocityX: 0,
//         velocityY: 0
//     };

//     // Определение направления движения пули если есть монстры
//     if (monsters.length > 0) {
//         var nearestMonster = findNearestMonster();
//         var deltaX = nearestMonster.x + monsterWidth / 2 - bullet.x;
//         var deltaY = nearestMonster.y + monsterHeight / 2 - bullet.y;
//         var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//         bullet.velocityX = (deltaX / distance) * bulletSpeed;
//         bullet.velocityY = (deltaY / distance) * bulletSpeed;
//         bullets.push(bullet);
//     } 
// }

// // Функция для поиска ближайшего монстра
// function findNearestMonster() {
//     var nearestMonster = null;
//     var minDistance = Infinity;

//     for (var i = 0; i < monsters.length; i++) {
//         var monster = monsters[i];
//         var distance = Math.sqrt(
//             Math.pow(playerX - monster.x, 2) + Math.pow(playerY - monster.y, 2)
//         );

//         if (distance < minDistance) {
//             minDistance = distance;
//             nearestMonster = monster;
//         }
//     }

//     return nearestMonster;
// }


// // Функция для обновления пуль
// function updateBullets() {
//     for (var i = bullets.length - 1; i >= 0; i--) {
//         var bullet = bullets[i];
//         bullet.x += bullet.velocityX;
//         bullet.y += bullet.velocityY;

//         // Удаление пули, если она вышла за пределы игрового поля
//         if (bullet.x < 0 || bullet.x > canvasWidth || bullet.y < 0 || bullet.y > canvasHeight) {
//             bullets.splice(i, 1);
//         } else {
//             // Проверка столкновения пули с каждым монстром
//             for (var j = 0; j < monsters.length; j++) {
//                 var monster = monsters[j];
//                 if (
//                     bullet.x < monster.x + monsterWidth &&
//                     bullet.x + bulletSize > monster.x &&
//                     bullet.y < monster.y + monsterHeight &&
//                     bullet.y + bulletSize > monster.y
//                 ) {
//                     // Монстр попадает под пулю - исчезает
//                     bullets.splice(i, 1);
//                     resetMonsterPosition(monster);
//                     monsters.push(monster);  // Добавляем монстра обратно в массив
//                     break;
//                 }
//             }
//         }
//     }
// }

// // Функция для сброса координат монстра
// function resetMonsterPosition(monster) {
//     var minDistance = 100; // Минимальное расстояние от точки появления до игрока

//     // Генерация случайных координат точки появления монстра
//     do {
//         monsterSpawnX = Math.random() * (canvasWidth - monsterWidth);
//         monsterSpawnY = Math.random() * (canvasHeight - monsterHeight);
//     } while (
//         monsterSpawnX + monsterWidth / 2 >= playerX - minDistance &&
//         monsterSpawnX + monsterWidth / 2 <= playerX + playerWidth + minDistance &&
//         monsterSpawnY + monsterHeight / 2 >= playerY - minDistance &&
//         monsterSpawnY + monsterHeight / 2 <= playerY + playerHeight + minDistance
//     );

//     // Установка координат монстра в точку появления
//     monster.x = monsterSpawnX;
//     monster.y = monsterSpawnY;
//     monster.speed = monsterSpeed; // Восстанавливаем исходную скорость монстра
// }



// // Функция для отрисовки пуль
// function drawBullets() {
//     for (var i = 0; i < bullets.length; i++) {
//         var bullet = bullets[i];
//         canvasContext.fillStyle = "yellow";
//         canvasContext.fillRect(bullet.x, bullet.y, bulletSize, bulletSize);
//     }
// }

// // Обработчик нажатия клавиши для стрельбы
// document.addEventListener("keydown", function(event) {
//     if (event.keyCode === 32) { // Пробел
//         createBullet();
//     }
// });


