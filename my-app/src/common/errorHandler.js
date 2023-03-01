const errorHandler = (setError, details, error, defaultError) => {
  setError(defaultError);
  let errorCheck = false;
  //card number error check
  if (numError(setError, error, details)) {
    errorCheck = true;
  }
  return errorCheck;
};

//checks card number
const numError = (setError, error, details) => {
  const regex = /^[0-9]*$/;
  if (!regex.test(details.number)) {
    setError({ ...error, numError: true });
    return true;
  }
};

export default errorHandler;
