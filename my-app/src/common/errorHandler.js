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

  if (!numCheck(details.number)) {
    setError({ ...error, numError: [errorMessages.format] });
    return false;
  }
  if (details.number === "") {
    setError({ ...error, numError: [errorMessages.blank] });
    return false;
  }

  return true;
};

//helper functions

//checks whether or not the string contains only numbers. returns true if it passes the test
function numCheck(str) {
  const regex = /^[0-9]*$/;
  return regex.test(str);
}
//checks whether the string is blank.

export default errorHandler;
