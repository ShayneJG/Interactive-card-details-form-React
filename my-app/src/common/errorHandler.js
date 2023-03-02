/*

This js handles error checking for the form. ErrorHandler is the top level function that is exported and called in App.js. 
The other functions are used by errorHandler to determine whether there are any errors in the respective locations, and set the errorState to true. 
Each error function returns false if an error was found, which results in the errorHandler returning false and preventing the form submission. 
*/

const errorHandler = (setError, defaultError, details) => {
  setError(() => defaultError);
  let errorReturn = true;
  if (!errorCheck(details.number, setError, "numError")) {
    errorReturn = false;
  }
  if (!errorCheck(details.month, setError, "mmError")) {
    errorReturn = false;
  }
  if (!errorCheck(details.year, setError, "yyError")) {
    errorReturn = false;
  }
  if (!errorCheck(details.cvc, setError, "cvcError")) {
    errorReturn = false;
  }
  return errorReturn;
};

//helper functions

//err is the name of the error to be set
function errorCheck(str, setError, err) {
  const errorMessages = {
    blank: "Can't be blank",
    format: "Wrong format, numbers only",
  };
  //is the string empty?
  if (!str) {
    setError((prevState) => ({ ...prevState, [err]: [errorMessages.blank] }));
    return false;
  }
  //only numbers?
  const regex = /^[0-9]*$/;

  if (!regex.test(str)) {
    setError((prevState) => ({ ...prevState, [err]: [errorMessages.format] }));
    return false;
  }
  return true;
}
//checks whether or not the string contains only numbers. returns true if it passes the test

//checks whether the string is blank.

export default errorHandler;
