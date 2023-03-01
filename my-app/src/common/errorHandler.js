/*

This js handles error checking for the form. ErrorHandler is the top level function that is exported and called in App.js. 
The other functions are used by errorHandler to determine whether there are any errors in the respective locations, and set the errorState to true. 
Each error function returns true if an error was found, which results in the errorHandler returning true and preventing the form submission. 
*/

const errorHandler = (setError, details, error, defaultError) => {
  setError(defaultError);

  if (
    numError(setError, error, details) ||
    blankError(setError, error, details)
  ) {
    return true;
  }
};

//checks card number
//returns true if error was found.
const numError = (setError, error, details) => {
  //this regex checks that there are only numbers in the string
  const regex = /^[0-9]*$/;
  if (!regex.test(details.number)) {
    setError({ ...error, numError: true });
    return true;
  }
};

const blankError = (setError, error, details) => {
  //to meet the requirements of the design, this section only checks whether or not the expiry date and cvc fields are blank.

  //if nothing was entered, the strings should be empty, and thus falsy.
  let errorFound = false;
  if (!details.month) {
    setError({ ...error, mmError: true });
    errorFound = true;
  }

  if (!details.year) {
    setError({ ...error, yyError: true });
    errorFound = true;
  }

  if (!details.cvc) {
    setError({ ...error, cvcError: true });
    errorFound = true;
  }
  return errorFound;
};

export default errorHandler;
