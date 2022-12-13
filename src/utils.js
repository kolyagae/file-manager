const printGreetMessage = (userName) => {
  const greetText = `Welcome to the File Manager, ${userName}!`;
  console.log(greetText);
};

const printGoodbyeMessage = (userName) => {
  const goodbyeText = `Thank you for using File Manager, ${userName}, goodbye!`;
  console.log(goodbyeText);
};

const printStartAppErrorMessage = () => {
  const errorText = "Sorry this command is not available";
  console.error(errorText);
};

const printInvalidInputErrorMessage = () => {
  const errorText = "Invalid input";
  console.error(errorText);
};

const printOperationErrorMessage = () => {
  const errorText = "Operation failed";
  console.error(errorText);
};

const printCurrentPath = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export {
  printGreetMessage as greetMessage,
  printGoodbyeMessage as goodbyeMessage,
  printStartAppErrorMessage as startAppErrorMessage,
  printInvalidInputErrorMessage as invalidInputErrorMessage,
  printCurrentPath as currentPath,
  printOperationErrorMessage as operationErrorMessage,
};
