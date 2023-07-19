const rl = require('readline').createInterface({input: process.stdin,output: process.stdout});
const fs = require('fs');

let numberToGuess = Math.floor(Math.random() * 100 + 1);
const maxAttempts = 5;
let attempt = 0;

function guesssNum() {
  console.log(`попытка ${attempt + 1} из ${maxAttempts}\n`);
  rl.question('Введи число: ', (guess) => {
    attempt += 1;
    switch (true) {
      case guess == 'q':
        console.log("Игрок сдался. Игра окончена.\n");
        rl.close();
        appendHistory(`Попытка ${attempt}: Игрок сдался. Игра окончена.\n\n`);
        return
      case isNaN(guess):
        console.log("Нужно ввести число.");
        appendHistory(`Попытка ${attempt}: Нужно ввести число.`);
        break;
      case guess > numberToGuess:
        console.log("Загаданное число меньше");
        appendHistory(`Попытка ${attempt}: Загаданное число меньше.`);
        break;
      case guess < numberToGuess:
        console.log("Загаданное число больше");
        appendHistory(`Попытка ${attempt}: Загаданное число больше.`);
        break;
      case guess == numberToGuess:
        console.log("Вы угадали!");
        rl.close();
        appendHistory(`Попытка ${attempt}: Игрок выйграл\n\n`);
        return
    }

    if (attempt == maxAttempts) {
      console.log("Закончились попытки");
      rl.close();
      appendHistory("Игрок проиграл. Закончились попытки.\n\n");
    } else {
      guesssNum();
    }
  })
}

function appendHistory(data) {
  fs.appendFile('history.txt', `${data}\n`, (err) => {
    if (err) {
      console.error('Ошибка при записи в файл:', err);
    }
  });
}

console.log('Угадайте число от 1 до 100:\nУ вас будет 5 попыток.\nВведите "q" что бы сдаться\n ')
guesssNum();


// fs.writeFile, fs.promises.writeFile, fs.writeFileSync fs.appendFile: