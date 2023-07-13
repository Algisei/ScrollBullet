var bonusShards = []; // Массив для хранения бонусных шаров
var bonusShardSize = 10;
var bonusShardSpeed = 10;
var bonusDuration = 60; // Длительность бонуса в секундах
var bulletSizeBonusTime = 0;
var bulletSizeBonusDuration = 600;
var bulletSpeedBonusTime = 0;
var bulletSpeedBonusDuration = 600;


// Функция для создания бонусных шаров
function createBonusShards() {
    // Создание бонусного шара +1 к размеру пули
    var bonusShardSizeUp = {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        sizeModifier: 10,
        type: "sizeUp",
        startTime: null // Время начала действия бонуса
    };
    bonusShards.push(bonusShardSizeUp);

    // Создание бонусного шара +1 к скорости пули
    var bonusShardSpeedUp = {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        speedModifier: 20,
        type: "speedUp",
        startTime: null // Время начала действия бонуса
    };
    bonusShards.push(bonusShardSpeedUp);
}

// Функция для отрисовки бонусных шаров
function drawBonusShards() {
    for (var i = 0; i < bonusShards.length; i++) {
        var bonusShard = bonusShards[i];
        if (bonusShard.type === "sizeUp") {
            canvasContext.fillStyle = "green";
        } else if (bonusShard.type === "speedUp") {
            canvasContext.fillStyle = "orange";
        }
        canvasContext.fillRect(bonusShard.x, bonusShard.y, bonusShardSize, bonusShardSize);
    }
}

// Функция для проверки столкновения игрока с бонусными шарами
function checkBonusCollision() {
    for (var i = 0; i < bonusShards.length; i++) {
        var bonusShard = bonusShards[i];
        if (
            playerX < bonusShard.x + bonusShardSize &&
            playerX + playerWidth > bonusShard.x &&
            playerY < bonusShard.y + bonusShardSize &&
            playerY + playerHeight > bonusShard.y
        ) {
            if (bonusShard.startTime === null) {
                console.log ('bonus applied:')
                applyBonus(bonusShard);
            }
            bonusShards.splice(i, 1); // Удаляем бонусный шар после подбора
            
            break;
        }
    }
}


function applyBonus(bonusShard) {
    bonusShard.startTime = Date.now() / 1000; // Записываем время начала действия бонуса в секундах
    if (bonusShard.type === "sizeUp") {
        bulletSize += 10; // Увеличение размера пули на 10 пикселей
        bulletSizeBonusTime = 0; // Сбрасываем таймер бонуса увеличения размера пули
    } else if (bonusShard.type === "speedUp") {
        bulletSpeed += 10; // Увеличение скорости пули на 10
        bulletSpeedBonusTime = 0; // Сбрасываем таймер бонуса увеличения скорости пули
    }

    // Проверка наличия активных бонусов перед отображением таймеров
    var hasActiveBonuses = bulletSizeBonusTime < bulletSizeBonusDuration || bulletSpeedBonusTime < bulletSpeedBonusDuration;
    if (hasActiveBonuses) {
        drawBonusTimers(hasActiveBonuses); // Отображение таймеров
    }
}




// Функция для удаления эффекта бонуса
function removeBonusEffect(bonusShard) {
    if (bonusShard.type === "sizeUp") {
        bulletSize -= 10; // Восстанавливаем исходный размер пули
    } else if (bonusShard.type === "speedUp") {
        bulletSpeed -= 10; // Восстанавливаем исходную скорость пули
    }
}

function checkBonusDuration() {
    var currentTime = Date.now() / 1000; // Текущее время в секундах
    var hasActiveBonuses = false; // Флаг для определения наличия активных бонусов

    for (var i = 0; i < bonusShards.length; i++) {
        var bonusShard = bonusShards[i];

        if (bonusShard.startTime !== null) {
            var elapsedTime = currentTime - bonusShard.startTime; // Прошедшее время в секундах

            if (elapsedTime >= bonusDuration) {
                removeBonusEffect(bonusShard);
                bonusShards.splice(i, 1); // Удаляем истекший бонусный шар
                i--; // Уменьшаем индекс, так как массив уменьшится на 1 элемент
            } else {
                // Отображение оставшегося времени действия бонуса
                var remainingTime = Math.ceil(bonusDuration - elapsedTime);
                canvasContext.fillStyle = "white";
                canvasContext.font = "16px Arial";
                canvasContext.fillText("Time: " + remainingTime, 10, 20);
                hasActiveBonuses = true; // Установка флага активных бонусов
            }
        }
    }

    
}



function drawBonusTimers(hasActiveBonuses) {
    // // Проверка наличия активных бонусов перед отображением таймеров
    // var hasActiveBonuses = bulletSizeBonusTime < bulletSizeBonusDuration || bulletSpeedBonusTime < bulletSpeedBonusDuration;
    
    
    // Отрисовка таймера бонуса увеличения размера пули
    if (bulletSizeBonusTime < bulletSizeBonusDuration && hasActiveBonuses) {
        console.log('bulletSizeBonusTime:',bulletSizeBonusTime);
    console.log('bulletSizeBonusDuration:',bulletSizeBonusDuration);
    console.log('hasActiveBonuses:',hasActiveBonuses);
        var remainingTime = bulletSizeBonusDuration - bulletSizeBonusTime;
        var timerText = "Bullet Size Bonus: " + remainingTime;
        drawTimer(timerText, 10, 20);
    }

    // Отрисовка таймера бонуса увеличения скорости пули
    if (bulletSpeedBonusTime < bulletSpeedBonusDuration && hasActiveBonuses) {
        console.log('bulletSpeedBonusTime:',bulletSpeedBonusTime);
        console.log('bulletSpeedBonusDuration:',bulletSpeedBonusDuration);
        console.log('hasActiveBonuses:', hasActiveBonuses);

        var remainingTime = bulletSpeedBonusDuration - bulletSpeedBonusTime;
        var timerText = "Bullet Speed Bonus: " + remainingTime;
        drawTimer(timerText, 10, 40);
    }
    // console.log(hasActiveBonuses);
}



// Функция для отрисовки текстового таймера
function drawTimer(text, x, y) {
    console.log(text);
    canvasContext.fillStyle = "white";
    canvasContext.font = "16px Arial";
    canvasContext.fillText(text, x, y);
}

// Функция для обновления таймеров бонусов
function updateBonusTimers() {
    // Обновление таймера бонуса увеличения размера пули
    if (bulletSizeBonusTime < bulletSizeBonusDuration) {
        bulletSizeBonusTime++;
    }

    // Обновление таймера бонуса увеличения скорости пули
    if (bulletSpeedBonusTime < bulletSpeedBonusDuration) {
        bulletSpeedBonusTime++;
    }
}

