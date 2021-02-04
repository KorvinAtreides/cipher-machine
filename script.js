const matrix = createMatrix();
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
    let mes = message.toUpperCase().split("");
    let arrKey = createKey(key, message);
    for (i = 0; i < mes.length; i++) {
      if (mes[i].charCodeAt(0) >= 65 && mes[i].charCodeAt(0) <= 90) {
        let letter =
          matrix[arrKey[i].charCodeAt(0) - 65][mes[i].charCodeAt(0) - 65];
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
    let mes = encryptedMessage.toUpperCase().split("");
    let arrKey = createKey(key, encryptedMessage);
    for (i = 0; i < mes.length; i++) {
      if (mes[i].charCodeAt(0) >= 65 && mes[i].charCodeAt(0) <= 90) {
        let pos = matrix[arrKey[i].charCodeAt(0) - 65].indexOf(mes[i]);
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

function createMatrix() {
  let matrix = [];
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
  return matrix;
}

function createKey(key, message) {
  while (key.length < message.length) {
    key += key;
  }
  while (key.length > message.length) {
    key = key.slice(0, key.length - 1);
  }

  return key.toUpperCase().split("");
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
