const matrixEng = createMatrix("english");
const matrixRus = createMatrix("russian");
var matrix = matrixEng;
class VigenereCipheringMachine {
  constructor(bool) {
    if (bool === false) {
      this.type = "reverseMachine";
    } else {
      this.type = "directMachine";
    }
  }
  encrypt(message, key) {
    if (message == undefined || key == undefined) {
      throw new Error();
    }
    let crypt = [];
    let mes = [];
    let arrKey = createKey(key, message);
    let firstLetter;
    let lastLetter;
    if (matrix == matrixEng) {
      mes = message.toUpperCase().split("");
      firstLetter = 65;
      lastLetter = 90;
    } else if (matrix == matrixRus) {
      mes = message.toLowerCase().split("");
      firstLetter = 1072;
      lastLetter = 1105;
    }
    for (i = 0; i < mes.length; i++) {
      console.log(mes[i].charCodeAt(0));
      if (
        mes[i].charCodeAt(0) >= firstLetter &&
        mes[i].charCodeAt(0) <= lastLetter
      ) {
        console.log(arrKey[i].charCodeAt(0) - firstLetter);
        let letter =
          matrix[arrKey[i].charCodeAt(0) - firstLetter][
            mes[i].charCodeAt(0) - firstLetter
          ];
        crypt.push(letter);
      } else {
        crypt.push(mes[i]);
        mes.splice(i, 1);
        i--;
      }
    }
    return checkTypeAnswer(this.type, crypt);
  }
  decrypt(encryptedMessage, key) {
    if (encryptedMessage == undefined || key == undefined) {
      throw new Error();
    }
    let crypt = [];
    let mes = [];
    let arrKey = createKey(key, encryptedMessage);
    let firstLetter;
    let lastLetter;
    if (matrix == matrixEng) {
      mes = encryptedMessage.toUpperCase().split("");
      firstLetter = 65;
      lastLetter = 90;
    } else if (matrix == matrixRus) {
      mes = encryptedMessage.toLowerCase().split("");
      firstLetter = 1072;
      lastLetter = 1105;
    }
    for (i = 0; i < mes.length; i++) {
      if (
        mes[i].charCodeAt(0) >= firstLetter &&
        mes[i].charCodeAt(0) <= lastLetter
      ) {
        let pos = matrix[arrKey[i].charCodeAt(0) - firstLetter].indexOf(mes[i]);
        let letter = matrix[0][pos];
        crypt.push(letter);
      } else {
        crypt.push(mes[i]);
        mes.splice(i, 1);
        i--;
      }
    }
    return checkTypeAnswer(this.type, crypt);
  }
}

function createMatrix(lang) {
  let matrix = [];
  if (lang == "english") {
    for (j = 0; j < 26; j++) {
      matrix[j] = [];
      for (i = 0; i < 26; i++) {
        let arrPos = i + 65 + j;
        if (arrPos > 90) {
          arrPos = i + 65 + j - 26;
        }
        matrix[j].push(String.fromCharCode(arrPos));
      }
    }
  } else if (lang == "russian") {
    for (j = 0; j < 34; j++) {
      matrix[j] = [];
      for (i = 0; i < 34; i++) {
        let arrPos = i + 1072 + j;
        if (arrPos > 1105) {
          arrPos = i + 1072 + j - 34;
        }
        matrix[j].push(String.fromCharCode(arrPos));
      }
    }
  }

  return matrix;
}

function createKey(key, message) {
  while (key.length < message.length) {
    key += key;
  }
  while (key.length > message.length) {
    key = key.slice(0, key.length - 1);
  }
  if (matrix == matrixEng) {
    return key.toUpperCase().split("");
  } else if (matrix == matrixRus) {
    return key.toLowerCase().split("");
  }
}

function checkTypeAnswer(type, crypt) {
  if (type == "directMachine") {
    return crypt.join("");
  } else {
    return crypt.reverse().join("");
  }
}

document.getElementById("encryptBtn").onclick = function () {
  let directMachine = new VigenereCipheringMachine();
  document.getElementById("messageArea").value = directMachine.encrypt(
    codeArea.value,
    secretWord.value
  );
};
document.getElementById("decryptBtn").onclick = function () {
  let directMachine = new VigenereCipheringMachine();
  document.getElementById("messageArea").value = directMachine.decrypt(
    codeArea.value,
    secretWord.value
  );
};

langSection.addEventListener("click", function (event) {
  if (event.target.classList.value == "langFiltr") {
    let langFiltrs = document.getElementsByClassName("langFiltr");
    for (let btn2 of langFiltrs) {
      btn2.style.backgroundColor = "white";
    }
    event.target.style.backgroundColor = "rgb(89, 187, 187)";
    switch (event.target.id) {
      case "langEnglish":
        matrix = matrixEng;
        break;
      case "langRussian":
        matrix = matrixRus;
        break;
      default:
        break;
    }
  }
});
