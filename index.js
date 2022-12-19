import { startOperationsHandler } from "./src/operationsHandler.js";
import { printStartAppErrorMessage } from "./src/utils/utils.js";

const startApp = () => {
  const propertyName = "--username=";
  const cliArgs = process.argv.slice(2);

  if (
    cliArgs.length === 1 &&
    cliArgs[0].startsWith(propertyName) &&
    cliArgs[0].length > 11
  ) {
    startOperationsHandler();
  } else {
    printStartAppErrorMessage();
  }
};

startApp();
