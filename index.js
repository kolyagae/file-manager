import * as print from "./src/utils.js";
import { startReadLine } from "./src/readLine.js";

const startApp = () => {
  const propertyName = "--username=";
  const cliArgs = process.argv.slice(2);

  if (
    cliArgs.length === 1 &&
    cliArgs[0].startsWith(propertyName) &&
    cliArgs[0].length > 11
  ) {
    startReadLine();
  } else {
    print.startAppErrorMessage();
  }
};

startApp();
