/*

This js handles error checking for the form. ErrorHandler is the top level function that is exported and called in App.js. 
The other functions are used by errorHandler to determine whether there are any errors in the respective locations, and set the errorState to true. 
Each error function returns false if an error was found, which results in the errorHandler returning false and preventing the form submission. 
*/

const errorHandler = (setError, template, details, error) => {
  setError(() => template);
  let errorReturn = true;

  Object.keys(template).forEach((element) => {
    if (!errorCheck(details[element], setError, element)) {
      errorReturn = false;
    }
  });

  return errorReturn;
};

//helper functions

//err is the name of the error to be set
function errorCheck(str, setError, element) {
  const errorMessages = {
    blank: "Can't be blank",
    format: "Wrong format, numbers only",
  };

  //specifically for name, as it follows different rules.
  if (element === "name") {
    if (!str) {
      setError((prevState) => ({
        ...prevState,
        name: [errorMessages.blank],
      }));
      return false;
    }
    const nameCheck = /^[a-zA-Z]*$/;
    if (!nameCheck.test(str)) {
      setError((prevState) => ({
        ...prevState,
        name: "Wrong format, must be letters only",
      }));
      return false;
    }
    return true;
  }
  //is the string empty?
  if (!str) {
    setError((prevState) => ({
      ...prevState,
      [element]: [errorMessages.blank],
    }));
    return false;
  }
  //only numbers?
  const regex = /^[0-9]*$/;

  if (!regex.test(str)) {
    setError((prevState) => ({
      ...prevState,
      [element]: [errorMessages.format],
    }));
    return false;
  }
  return true;
}

//checks whether or not the string contains only numbers. returns true if it passes the test

//checks whether the string is blank.

export default errorHandler;
