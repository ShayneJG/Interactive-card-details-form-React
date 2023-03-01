/*

This js handles error checking for the form. ErrorHandler is the top level function that is exported and called in App.js. 
The other functions are used by errorHandler to determine whether there are any errors in the respective locations, and set the errorState to true. 
Each error function returns true if an error was found, which results in the errorHandler returning true and preventing the form submission. 
*/

const errorHandler = (setError, details, error, defaultError) => {
  setError(defaultError);
  let errorCheck = false;

  if (numError(setError, error, details)) {
    errorCheck = true;
  }
  return errorCheck;
};

//checks card number
//returns true if error was found.
const numError = (setError, error, details) => {
  const regex = /^[0-9]*$/;
  if (!regex.test(details.number)) {
    setError({ ...error, numError: true });
    return true;
  }
};

const dateError = (setError, error, details) => {};

export default errorHandler;
