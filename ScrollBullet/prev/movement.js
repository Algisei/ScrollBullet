const gameSpace = document.getElementById('game-space');
const player = document.getElementById('player');
const step = 10;
let isMoving = false;
const activeKeys = {};

function movePlayer() {
  const playerPos = player.getBoundingClientRect();
  let moveX = 0;
  let moveY = 0;

  if (activeKeys['ArrowUp'] && playerPos.top > 0) {
    moveY -= step;
  }
  if (activeKeys['ArrowDown'] && playerPos.bottom < window.innerHeight) {
    moveY += step;
  }
  if (activeKeys['ArrowLeft'] && playerPos.left > 0) {
    moveX -= step;
  }
  if (activeKeys['ArrowRight'] && playerPos.right < window.innerWidth) {
    moveX += step;
  }

  player.style.top = playerPos.top + moveY + 'px';
  player.style.left = playerPos.left + moveX + 'px';

  const offsetX = (window.innerWidth - gameSpace.offsetWidth) / 2 - playerPos.left;
  const offsetY = (window.innerHeight - gameSpace.offsetHeight) / 2 - playerPos.top;

  gameSpace.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

  if (isMoving) {
    requestAnimationFrame(movePlayer);
  }
}

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key) && !activeKeys[key]) {
    activeKeys[key] = true;
    isMoving = true;
    movePlayer();
  }
});

document.addEventListener('keyup', (event) => {
  const key = event.key;

  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key) && activeKeys[key]) {
    delete activeKeys[key];
    if (Object.keys(activeKeys).length === 0) {
      isMoving = false;
    }
  }
});

function updateGameSpaceOffset() {
  const playerPos = player.getBoundingClientRect();
  const offsetX = (window.innerWidth - gameSpace.offsetWidth) / 2 - playerPos.left;
  const offsetY = (window.innerHeight - gameSpace.offsetHeight) / 2 - playerPos.top;

  gameSpace.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

window.addEventListener('resize', updateGameSpaceOffset);

updateGameSpaceOffset();
