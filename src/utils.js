const showGreetMessage = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`);
};

const showGoodbyeMessage = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

const showErrorMessage = () => {
  console.error(`Sorry this command is not available`);
};

export { showGreetMessage, showGoodbyeMessage, showErrorMessage };
