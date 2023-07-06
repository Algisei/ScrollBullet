// constructor.js

// constructor.js
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Проверяем, если открыт конструктор, прерываем обработку события
  if (constructorForm.classList.contains('hidden')) {
    const playerPos = player.getBoundingClientRect();

    if (key === ' ' && canShoot) {
      shootBullet(playerPos);
      shootingInterval = setInterval(() => {
        shootBullet(player.getBoundingClientRect());
      }, 100);
      canShoot = false;
    }
  }
});

document.addEventListener('keyup', (event) => {
  const key = event.key;

  // Проверяем, если открыт конструктор, прерываем обработку события
  if (constructorForm.classList.contains('hidden')) {
    if (key === ' ' && !canShoot) {
      clearInterval(shootingInterval);
      canShoot = true;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const formulaInput = document.getElementById('formula-input');
  const constructorContainer = document.getElementById('constructor-container');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Создание элементов конструктора
  const part1Button = createConstructorButton('+');
  const part2Button = createConstructorButton('-');
  const part3Button = createConstructorButton('*');
  const part4Button = createConstructorButton('/');
  const sinButton = createConstructorButton('sin');
  const cosButton = createConstructorButton('cos');
  const tanButton = createConstructorButton('tan');
  const spiralButton = createConstructorButton('Спираль');

  // Добавление элементов конструктора в контейнер
  constructorContainer.appendChild(part1Button);
  constructorContainer.appendChild(part2Button);
  constructorContainer.appendChild(part3Button);
  constructorContainer.appendChild(part4Button);
  constructorContainer.appendChild(sinButton);
  constructorContainer.appendChild(cosButton);
  constructorContainer.appendChild(tanButton);
  constructorContainer.appendChild(spiralButton);
  constructorContainer.appendChild(formulaInput);

  // Обработка событий нажатия на кнопки конструктора
  part1Button.addEventListener('click', () => {
    formulaInput.value += ' + ';
  });

  part2Button.addEventListener('click', () => {
    formulaInput.value += ' - ';
  });

  part3Button.addEventListener('click', () => {
    formulaInput.value += ' * ';
  });

  part4Button.addEventListener('click', () => {
    formulaInput.value += ' / ';
  });

  sinButton.addEventListener('click', () => {
    formulaInput.value += 'Math.sin(x)';
  });

  cosButton.addEventListener('click', () => {
    formulaInput.value += 'Math.cos(x)';
  });

  tanButton.addEventListener('click', () => {
    formulaInput.value += 'Math.tan(x)';
  });

  spiralButton.addEventListener('click', () => {
    formulaInput.value += 'Math.sqrt(x) * Math.sin(x)';
  });

  // Вспомогательная функция для создания кнопок конструктора
  function createConstructorButton(text) {
    const button = document.createElement('button');
    button.classList.add('constructor-button');
    button.textContent = text;
    return button;
  }

  // Установка размеров канваса
  canvas.width = 500;
  canvas.height = 300;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Добавление канваса в контейнер
  constructorContainer.appendChild(canvas);

  // Обработка события изменения введенной формулы
  formulaInput.addEventListener('input', () => {
    const formula = formulaInput.value;

    // Очистка канваса
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
      // Отображение графика введенной формулы
      ctx.beginPath();
      ctx.moveTo(0, centerY - calculateFormula(0, formula));

      for (let x = 1; x < canvas.width; x++) {
        const y = centerY - calculateFormula(x - centerX, formula);
        ctx.lineTo(x, y);
      }

      ctx.stroke();
    } catch (error) {
      console.error(error);
    }
  });

  // Вспомогательная функция для расчета значения формулы
  function calculateFormula(x, formula) {
    const expression = new Function('x', 'return ' + formula);
    return expression(x);
  }
});