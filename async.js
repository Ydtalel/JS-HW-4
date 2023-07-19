const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numberToGuess = Math.floor(Math.random() * 100 + 1);
const maxAttempts = 5;
let attempt = 0;

async function guessNum() {
  console.log(`попытка ${attempt + 1} из ${maxAttempts}\n`);

  try {
    const guess = await questionAsync('Введи число: ');
    attempt += 1;

    switch (true) {
      case guess === 'q':
        console.log("Игрок сдался. Игра окончена.\n");
        rl.close();
        await appendHistory(`Попытка ${attempt}: Игрок сдался. Игра окончена.\n\n`);
        return;
      case isNaN(guess):
        console.log("Нужно ввести число.");
        await appendHistory(`Попытка ${attempt}: Нужно ввести число.`);
        break;
      case guess > numberToGuess:
        console.log("Загаданное число меньше");
        await appendHistory(`Попытка ${attempt}: Загаданное число меньше.`);
        break;
      case guess < numberToGuess:
        console.log("Загаданное число больше");
        await appendHistory(`Попытка ${attempt}: Загаданное число больше.`);
        break;
      case guess == numberToGuess:
        console.log("Вы угадали!");
        rl.close();
        await appendHistory(`Попытка ${attempt}: Игрок выйграл\n\n`);
        return;
    }

    if (attempt === maxAttempts) {
      console.log("Закончились попытки");
      rl.close();
      await appendHistory("Игрок проиграл. Закончились попытки.\n\n");
    } else {
      await guessNum();
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

function questionAsync(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function appendHistory(data) {
  return new Promise((resolve, reject) => {
    fs.appendFile('history.txt', `${data}\n`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function main() {
  console.log('Угадайте число от 1 до 100:\nУ вас будет 5 попыток.\nВведите "q" что бы сдаться\n');
  await guessNum();
}

main();
