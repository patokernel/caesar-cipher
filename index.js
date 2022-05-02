const input = document.getElementById("input");
const encryptor = document.getElementById("encryptor");
const output = document.getElementById("output");
const range = document.getElementById("range");
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const encryptLetter = (currentLetterIndex, wordArray) => {
  if (wordArray.length === currentLetterIndex) return; // end recursion
  input.value = input.value.substring(1);
  const newLetter = document.createElement("span");
  output.appendChild(newLetter);
  const unencryptedLetter = wordArray[currentLetterIndex];

  animateLetter(newLetter)
    .then(() => {
      // encryption
      newLetter.innerHTML = alphabet.includes(unencryptedLetter) ?
        alphabet[(alphabet.indexOf(unencryptedLetter) + parseInt(range.value)) % alphabet.length] :
        unencryptedLetter;
      encryptLetter(currentLetterIndex + 1, wordArray); // recursion
    })
}

const animateLetter = (letter) => {
  let letterChanges = 0;
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      letter.innerHTML = alphabet[Math.floor(Math.random() * alphabet.length)];
      letterChanges++;
      if (letterChanges === 3) {
        clearInterval(interval);
        resolve();
      }
    }, 40);
  });
}

const encryptMessage = () => {
  const myWordArray = [...input.value.toUpperCase()];
  encryptLetter(0, myWordArray);
}

const submit = (e) => {
  e.preventDefault();
  output.innerHTML = '';
  output.style.display = 'block';
  if (input.value.length === 0) {
    output.style.display = 'none';
  }
  encryptMessage();
}

encryptor.onsubmit = submit;