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
  for (i = 0; i < dateInAllFormats.length; i++) {
    if (isPalindrome(dateInAllFormats[i])) return true;
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

