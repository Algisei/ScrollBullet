// script.js

document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('player');
  const bullets = [];
  let canShoot = true;
  let shootingInterval;
  const bulletSpeed = 5; // Добавлено объявление переменной bulletSpeed

  const myButton = document.getElementById('my-button');
  const constructorForm = document.getElementById('constructor-form');
  const closeButton = document.getElementById('close-button');

  myButton.addEventListener('click', () => {
    constructorForm.classList.remove('hidden');
  });

  closeButton.addEventListener('click', () => {
    constructorForm.classList.add('hidden');
  });

  document.addEventListener('keydown', (event) => {
    const key = event.key;
    const playerPos = player.getBoundingClientRect();

    if (key === ' ' && canShoot) {
      shootBullet(playerPos);
      shootingInterval = setInterval(() => {
        shootBullet(player.getBoundingClientRect());
      }, 100);
      canShoot = false;
    }
  });

  document.addEventListener('keyup', (event) => {
    const key = event.key;

    if (key === ' ' && !canShoot) {
      clearInterval(shootingInterval);
      canShoot = true;
    }
  });

  function shootBullet(playerPos) {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.top = playerPos.top + 15 + 'px';
    bullet.style.left = playerPos.right + 'px';

    const formula = document.getElementById('formula-input').value;
    const startX = playerPos.right;
    const startY = playerPos.top + 15;

    bullet.dataset.x = startX.toString();
    bullet.dataset.y = startY.toString();
    bullet.dataset.formula = formula;

    document.body.appendChild(bullet);
    bullets.push(bullet);
  }

  function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
      const bullet = bullets[i];
      const formula = bullet.dataset.formula;
      const x = parseFloat(bullet.dataset.x);
      const y = parseFloat(bullet.dataset.y);
  
      let newX;
      let newY;
  
      if (formula) {
        const playerPos = player.getBoundingClientRect();
        const midY = playerPos.top + playerPos.height / 2;
        const distanceFromMid = y - midY;
        newX = x + bulletSpeed;
        newY = calculateFormula(newX, formula) + midY + distanceFromMid;
      } else {
        newX = x + bulletSpeed;
        newY = y;
      }
  
      bullet.style.left = newX + 'px';
      bullet.style.top = newY + 'px';
  
      bullet.dataset.x = newX.toString();
      bullet.dataset.y = newY.toString();
  
      const bulletRect = bullet.getBoundingClientRect();
      const screenWidth = window.innerWidth;
  
      if (bulletRect.right > screenWidth || bulletRect.left < 0) {
        bullet.remove();
        bullets.splice(i, 1);
      }
    }
  }

  function calculateFormula(x, formula) {
    const expression = new Function('x', 'return ' + formula);
    return expression(x);
  }

  function gameLoop() {
    updateBullets();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});




// document.addEventListener('DOMContentLoaded', () => {
//   const player = document.getElementById('player');
//   const bullets = [];
//   let canShoot = true;
//   let shootingInterval;
//   const bulletSpeed = 5; // Добавлено объявление переменной bulletSpeed

//   const myButton = document.getElementById('my-button');
//   const constructorForm = document.getElementById('constructor-form');
//   const closeButton = document.getElementById('close-button');

//   myButton.addEventListener('click', () => {
//     constructorForm.classList.remove('hidden');
//   });

//   closeButton.addEventListener('click', () => {
//     constructorForm.classList.add('hidden');
//   });

//   document.addEventListener('keydown', (event) => {
//     const key = event.key;
//     const playerPos = player.getBoundingClientRect();

//     if (key === ' ' && canShoot) {
//       shootBullet(playerPos);
//       shootingInterval = setInterval(() => {
//         shootBullet(player.getBoundingClientRect());
//       }, 100);
//       canShoot = false;
//     }
//   });

//   document.addEventListener('keyup', (event) => {
//     const key = event.key;

//     if (key === ' ' && !canShoot) {
//       clearInterval(shootingInterval);
//       canShoot = true;
//     }
//   });

//   function shootBullet(playerPos) {
//     const bullet = document.createElement('div');
//     bullet.classList.add('bullet');
//     bullet.style.top = playerPos.top + 15 + 'px';
//     bullet.style.left = playerPos.right + 'px';

//     const formula = document.getElementById('formula-input').value;
//     const startX = playerPos.right;
//     const startY = playerPos.top + 15;

//     bullet.dataset.x = startX.toString();
//     bullet.dataset.y = startY.toString();
//     bullet.dataset.formula = formula;

//     document.body.appendChild(bullet);
//     bullets.push(bullet);
//   }

//   function updateBullets() {
//     for (let i = bullets.length - 1; i >= 0; i--) {
//       const bullet = bullets[i];
//       const formula = bullet.dataset.formula;
//       const x = parseFloat(bullet.dataset.x);
//       const y = parseFloat(bullet.dataset.y);

//       const newX = x + bulletSpeed;
//       const newY = calculateFormula(newX, formula);

//       bullet.style.left = newX + 'px';
//       bullet.style.top = newY + 'px';

//       bullet.dataset.x = newX.toString();
//       bullet.dataset.y = newY.toString();

//       if (newX > window.innerWidth) {
//         bullet.remove();
//         bullets.splice(i, 1);
//       }
//     }
//   }

//   function calculateFormula(x, formula) {
//     const expression = new Function('x', 'return ' + formula);
//     return expression(x);
//   }

//   function gameLoop() {
//     updateBullets();
//     requestAnimationFrame(gameLoop);
//   }

//   gameLoop();
// });













// document.addEventListener('DOMContentLoaded', () => {
//     const player = document.getElementById('player');
//     const bullets = [];
//     let canShoot = true;
//     let isMoving = false;
//     let shootingInterval;
  
//     document.addEventListener('keydown', (event) => {
//       const key = event.key;
//       const playerPos = player.getBoundingClientRect();
  
//       if (key !== ' ' && !isMoving) {
//         isMoving = true;
//         movePlayer(key);
//       }
  
//       if (key === ' ' && canShoot) { // Space key
//         shootBullet(playerPos);
//         shootingInterval = setInterval(() => {
//           shootBullet(player.getBoundingClientRect());
//         }, 100);
//         canShoot = false;
//       }
//     });
  
//     document.addEventListener('keyup', (event) => {
//       const key = event.key;
//       if (key !== ' ') {
//         isMoving = false;
//       }
  
//       if (key === ' ' && !canShoot) {
//         clearInterval(shootingInterval);
//         canShoot = true;
//       }
//     });
  
//     function movePlayer(key) {
//       const playerPos = player.getBoundingClientRect();
//       const step = 10;
  
//       if (key === 'ArrowUp' && playerPos.top > 0) {
//         player.style.top = playerPos.top - step + 'px';
//       } else if (key === 'ArrowDown' && playerPos.bottom < window.innerHeight) {
//         player.style.top = playerPos.top + step + 'px';
//       } else if (key === 'ArrowLeft' && playerPos.left > 0) {
//         player.style.left = playerPos.left - step + 'px';
//       } else if (key === 'ArrowRight' && playerPos.right < window.innerWidth) {
//         player.style.left = playerPos.left + step + 'px';
//       }
  
//       if (isMoving) {
//         requestAnimationFrame(() => movePlayer(key));
//       }
//     }
  
//     function shootBullet(playerPos) {
//       const bullet = document.createElement('div');
//       bullet.classList.add('bullet');
//       bullet.style.top = playerPos.top + 15 + 'px';
//       bullet.style.left = playerPos.right + 'px';
//       document.body.appendChild(bullet);
//       bullets.push(bullet);
//     }
  
//     function updateBullets() {
//       for (let i = bullets.length - 1; i >= 0; i--) {
//         const bullet = bullets[i];
//         const bulletPos = bullet.getBoundingClientRect();
//         bullet.style.left = bulletPos.left + 5 + 'px';
  
//         if (bulletPos.right > window.innerWidth) {
//           bullet.remove();
//           bullets.splice(i, 1);
//         }
//       }
//     }
  
//     function gameLoop() {
//       updateBullets();
//       requestAnimationFrame(gameLoop);
//     }
  
//     gameLoop();
//   });
  