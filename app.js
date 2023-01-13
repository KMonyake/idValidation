const idInput = document.getElementById("id-input");
const submitBtn = document.getElementById("submit-btn");
let userIdNum = idInput.value;

submitBtn.addEventListener("click", validate);

idInput.addEventListener("input", () => {
  userIdNum = idInput.value;
});

// const invalidId1 = "0198978767657";
// const invalIdId2 = "0108315027897";
// const validId1 = "8605065397083";

function validate() {
  let isValid = false;

  const idDay = Number(userIdNum.slice(4, 6));
  const idMonth = Number(userIdNum.slice(2, 4));
  const idYear = Number(userIdNum.slice(0, 2));
  const idGender = userIdNum.slice(6, 10) >= 5000 ? "Male" : "Female";
  const idCitizen = userIdNum.slice(10, 11) === "0" ? "Citizen" : "Non-Citizen";
  const idLastDigit = Number(userIdNum.slice(12, 13));

  // console.log(idDay, idMonth, idYear, idGender, idCitizen, idLastDigit);

  const dobInput = document.getElementById("dobInput");
  const genderInput = document.getElementById("genderInput");
  const citizenshipInput = document.getElementById("citizenshipInput");

  if (idDay > 0 && idDay < 32 && idMonth > 0 && idMonth < 13) {
    if (idLastDigit === getCheckDigit()) {
      isValid = true;
      console.log("valid");

      dobInput.value = `${formatToDoubleNums(idDay)}/${formatToDoubleNums(
        idMonth
      )}/${formatYear(idYear)}`;
      genderInput.value = idGender;
      citizenshipInput.value = idCitizen;
    } else {
      isValid = false;
      console.log("invalid");
    }
  } else {
    isValid = false;
    console.log("invalid");
  }
}

function formatToDoubleNums(num) {
  if (String(num).length === 2) {
    return String(num);
  } else {
    return `0${num}`;
  }
}

function formatYear(year) {
  if (String(year).length === 1 && year < 20) {
    return `200${year}`;
  }
  if (String(year).length === 2 && year < 20) {
    return `20${year}`;
  }
  if (String(year).length === 2 && year > 20) {
    return `19${year}`;
  }
  if (String(year).length === 1 && year > 20) {
    return `190${year}`;
  }
}

function getCheckDigit() {
  // CREATE AN INDEXED ARRAY
  const indexedArr = [];

  for (let i = 0; i < userIdNum.length; i++) {
    indexedArr.push({
      index: i + 1,
      value: Number(userIdNum[i])
    });
  }

  // 1. Add all the digits in the odd positions (excluding last digit)
  const oddNumsIndexedArr = indexedArr.filter((num) => num.index % 2 !== 0);
  oddNumsIndexedArr.pop(); // Remove the last odd number

  let oddNumsTotal = 0;
  oddNumsIndexedArr.map((num) => (oddNumsTotal += num.value));

  // 2. Concetenate all even numbers
  const evnNumsIndexedArr = indexedArr.filter((num) => num.index % 2 === 0);

  let concatenatedNum = ``;

  evnNumsIndexedArr.forEach((number) => {
    concatenatedNum += `${number.value}`;
  });

  // 3. Double concatenated number
  const doubledNum = Number(concatenatedNum) * 2;

  // 4.Add all digits of doubled number.
  const doubledNumArr = String(doubledNum).split("");
  let doubledNumArrTotal = 0;

  doubledNumArr.forEach((number) => (doubledNumArrTotal += Number(number)));

  // 5. Add answers from 1 and 3
  const oddPlusEvnNumsTotal = oddNumsTotal + doubledNumArrTotal;

  // 6. Subtract last digit of the answer in 4 from 10.
  let subtractfromTen = 10 - Number(String(oddPlusEvnNumsTotal)[1]);

  // 7. If answer in 5 is a single digit it must match checkdigit
  // Else if answer in 5 is 2 digits, its last digit must match checkdigit

  if (subtractfromTen === 10) {
    subtractfromTen = 0;
  }

  return subtractfromTen;
}
