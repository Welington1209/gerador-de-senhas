const generetorPasswordButton = document.querySelector("#generate-password");
const generetedPasswordElement = document.querySelector("#generated-password");
const openCloseGeneratorButton = document.querySelector(
  "#open-generate-password"
);
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const numbersInput = document.querySelector("#numbers");
const lettersInput = document.querySelector("#letters");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getSymbol = () => {
  const symbols = "(){}[]^~`´.,?/!@#$%&+=_-*";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let password = "";

  const passwordLength = lengthInput.value;

  const generators = [];

  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  if (generators.length === 0) {
    return;
  }

  for (i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;
    });
  }

  password = password.slice(0, 25);

  generetedPasswordElement.style.display = "block";
  generetedPasswordElement.querySelector("h4").innerText = `${password}`;
};

openCloseGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

generetorPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  );
});

copyPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generetedPasswordElement.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(() => {
    copyPasswordButton.innerText = "Senha copiada com sucesso!";

    setTimeout(() => {
      copyPasswordButton.innerText = "Copiar";
    }, 1500);
  });
});
