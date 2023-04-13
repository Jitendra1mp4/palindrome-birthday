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
  if (dateObj.day < 10) newDataObj.day = "0" + dateObj.day;
  else newDataObj.day = "" + dateObj.day;

  if (dateObj.month < 10) newDataObj.month = "0" + dateObj.month;
  else newDataObj.month = "" + dateObj.month;

  newDataObj.year = "" + dateObj.year;

  let ddmmyyyy = newDataObj.day + newDataObj.month + newDataObj.year;
  let mmddyyyy = newDataObj.month + newDataObj.day + newDataObj.year;
  let yyyymmdd = newDataObj.year + newDataObj.month + newDataObj.day;
  let ddmmyy = newDataObj.day + newDataObj.month + newDataObj.year.slice(-2);
  let mmddyy = newDataObj.month + newDataObj.day + newDataObj.year.slice(-2);
  let yymmdd = newDataObj.year.slice(-2) + newDataObj.month + newDataObj.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};


const isDatePalindrome = (dateObj) => {
const dateInAllFormats = getAllDateFormatsStringList(dateObj) ;
  for (i = 0; i < dateInAllFormats.length; i++) {
    if (isPalindrome(dateInAllFormats[i])) return true;
  }
  return false;
};

dateObj = {
  day: 02,
  month: 02,
  year: 2020,
};

console.log(isDatePalindrome(dateObj));
