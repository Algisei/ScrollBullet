var playerX;
var playerY;
var playerWidth = 20;
var playerHeight = 20;
var playerSpeed = 5; // Скорость движения игрока
var playerVelocityX = 0; // Скорость перемещения по оси X
var playerVelocityY = 0; // Скорость перемещения по оси Y

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
