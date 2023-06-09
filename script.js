const reverse = (str) => {
  return str.split("").reverse().join("");
};
const isPalindrome = (str) => str === reverse(str);

const getAllDateFormatsStringList = (dateObj) => {
  newDataObj = {
    day: "",
    month: "",
    year: "",
  };

  //   manage number less then day and month in date.
  if (dateObj.day < 10) newDataObj.day = "0" + dateObj.day;
  else newDataObj.day = "" + dateObj.day;

  if (dateObj.month < 10) newDataObj.month = "0" + dateObj.month;
  else newDataObj.month = "" + dateObj.month;

  newDataObj.year = "" + dateObj.year;

  //create different formats of dates.
  let ddmmyyyy = newDataObj.day + newDataObj.month + newDataObj.year;
  let mmddyyyy = newDataObj.month + newDataObj.day + newDataObj.year;
  let yyyymmdd = newDataObj.year + newDataObj.month + newDataObj.day;
  let ddmmyy = newDataObj.day + newDataObj.month + newDataObj.year.slice(-2);
  let mmddyy = newDataObj.month + newDataObj.day + newDataObj.year.slice(-2);
  let yymmdd = newDataObj.year.slice(-2) + newDataObj.month + newDataObj.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

// method to check if date is palindrome in any formate
const isDatePalindrome = (dateObj) => {
  const dateInAllFormats = getAllDateFormatsStringList(dateObj);
  for (date of dateInAllFormats) {
    if (isPalindrome(date)) return true;
  }
  return false;
};

// method to check leap year
const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

// method to increment date by one day
const incrementDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // check if month  is fab and year is leap
  if (month == 2 && isLeapYear(year)) {
    if (day > 29) {
      day = 1;
      month++;
    }
  } else if (day > daysInMonth[month - 1]) {
    day = 1;
    month++;
  }
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

//method that find next palindrome day
const getNextPalindromeDate = (dateObj) => {
  let counter = 0;
  while (1) {
    counter++;
    dateObj = incrementDate(dateObj);
    if (isDatePalindrome(dateObj)) return [counter, dateObj];
  }
};

const decrementDate = (dateObj) => {
  let day = dateObj.day - 1;
  let month = dateObj.month;
  let year = dateObj.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == 3 && isLeapYear(year) && day < 1) {
    day = 29;
    month = 2;
  }

  if (month == 1) {
    month = 12;
    year--;
  }

  if (day < 1) {
    month--;
    day = daysInMonth[month - 1];
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};
// Function to find previous palindrome date (Bonus)
const getPreviousPalindromeDate = (dateObj) => {
  let counter = 0;
  while (1) {
    counter++;
    dateObj = decrementDate(dateObj);
    if (isDatePalindrome(dateObj)) return [counter, dateObj];
  }
};

const getBirthdayObject = (dateString) => {
  let dateArr = dateString.split("-");
  return {
    day: Number(dateArr[2]),
    month: Number(dateArr[1]),
    year: Number(dateArr[0]),
  };
};

const inputBirthday = document.querySelector("#birthday");
const btnCheck = document.querySelector("#btn-check-palindrome");
const divOutput = document.querySelector("#div-output");

const getDateAsString = (dateObj) => {
  let day, month, year;
  //   manage number less then day and month in date.
  if (dateObj.day < 10) day = "0" + dateObj.day;
  else day = "" + dateObj.day;

  if (dateObj.month < 10) month = "0" + dateObj.month;
  else month = "" + dateObj.month;

  year = "" + dateObj.year;

  //  return formatted string
  return day + "-" + month + "-" + year;
};

const renderMessage = (message) => {
  divOutput.innerHTML = message;
  // adding style classes.
  divOutput.className = divOutput.className + " border-norm round-hf";
};

function handleNotPalindrome(dateObj) {
  // Get previous and next palindrome dates
  const prevPalindrome = getPreviousPalindromeDate(dateObj);
  const nextPalindrome = getNextPalindromeDate(dateObj);

  const prevDate = getDateAsString(prevPalindrome[1]);
  const nextDate = getDateAsString(nextPalindrome[1]);

  const durationPrev = prevPalindrome[0];
  const durationNext = nextPalindrome[0];

  // set message for next palindrome date
  const msg = `<p>Oops you are <strong>NOT a palindrome</strong> baby! 😑️</p>`;
  const msg1 = `<p><strong>Previous</strong> palindrome date was <strong>${prevDate}</strong> which was before <strong>${durationPrev}</strong> days</p>`;
  const msg2 = `<p class='my-hf'><strong>Next</strong> palindrome date is </strong>${nextDate}</strong> which is after <strong>${durationNext}</strong> days,</p>`;

  renderMessage(msg + msg1 + msg2);
  // set message for previous palindrome date
}

// method that helps us to render message.
btnCheck.addEventListener("click", () => {
  const birthdayValue = inputBirthday.value;

  if (birthdayValue !== "") {
    const dateObj = getBirthdayObject(birthdayValue);
    if (isDatePalindrome(dateObj)) {
      renderMessage("Congratulation! birthday is Palindrome. 🎉️");
    } else {
      handleNotPalindrome(dateObj);
    }
  } else {
    renderMessage("Please enter the birthday first. 😉️");
  }
});
