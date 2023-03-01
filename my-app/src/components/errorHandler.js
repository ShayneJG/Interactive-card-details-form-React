const errorHandler = (setError, details, error, defaultError) => {
  setError(defaultError);
  let errorCheck = false;
  //card number error check
  const regex = /^[0-9]*$/;
  if (!regex.test(details.number)) {
    setError({ ...error, numError: true });
    errorCheck = true;
  }
  return errorCheck;
};

export default errorHandler;
