const readline = require('readline');
const fs = require('fs').promises;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numberToGuess = Math.floor(Math.random() * 100 + 1);
const maxAttempts = 5;
let attempt = 0;

async function guessNum() {
  console.log('Угадайте число от 1 до 100:\nУ вас будет 5 попыток.\nВведите "q" что бы сдаться\n');

  while (attempt < maxAttempts) {
    attempt += 1;
    console.log(`попытка ${attempt} из ${maxAttempts}\n`);
    try {
      const guess = await questionAsync('Введи число: ');

      switch (true) {
        case guess === 'q':
          console.log('Игрок сдался. Игра окончена.\n');
          rl.close();
          await appendHistory(`Попытка ${attempt}: Игрок сдался. Игра окончена.\n\n`);
          return;
        case isNaN(guess):
          console.log('Нужно ввести число.');
          await appendHistory(`Попытка ${attempt}: Нужно ввести число.`);
          break;
        case guess > numberToGuess:
          console.log('Загаданное число меньше');
          await appendHistory(`Попытка ${attempt}: Загаданное число меньше.`);
          break;
        case guess < numberToGuess:
          console.log('Загаданное число больше');
          await appendHistory(`Попытка ${attempt}: Загаданное число больше.`);
          break;
        case guess == numberToGuess:
          console.log('Вы угадали!');
          rl.close();
          await appendHistory(`Попытка ${attempt}: Игрок выиграл\n\n`);
          return;
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  console.log('Закончились попытки');
  rl.close();
  await appendHistory('Игрок проиграл. Закончились попытки.\n\n');
}

async function questionAsync(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function appendHistory(data) {
  try {
    await fs.appendFile('history.txt', `${data}\n`);
  } catch (error) {
    console.error('Ошибка при записи в файл:', error);
    throw error;
  }
}

guessNum();
