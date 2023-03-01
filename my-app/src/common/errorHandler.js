/*

This js handles error checking for the form. ErrorHandler is the top level function that is exported and called in App.js. 
The other functions are used by errorHandler to determine whether there are any errors in the respective locations, and set the errorState to true. 
Each error function returns false if an error was found, which results in the errorHandler returning false and preventing the form submission. 
*/

const errorHandler = (setError, defaultError, details, error) => {
  setError(defaultError);
  const errorMessages = {
    blank: "Can't be blank",
    format: "Wrong format, numbers only",
  };

  if (!cardError(details.number)) {
    return false;
  }

  return true;
};

//checks card number
//returns true if error was found.
const cardError = (str) => {
  //this regex checks that there are only numbers in the string
  return numCheck(str);
};

//helper functions

//checks whether or not the string contains only numbers. returns true if it passes the test
function numCheck(str) {
  const regex = /^[0-9]*$/;
  return regex.test(str);
}

export default errorHandler;
