function getPasswordChecker(password) {
  return function(guess) {
    return password === guess;
  };
}

//const getPasswordChecker = password => guess => password === guess;

const password = 'qwerty';
const checker = getPasswordChecker(password);

console.log(checker('12345'));  
console.log(checker('qwerty'));  
