import os from "node:os";
import { printInvalidInputErrorMessage } from "./utils.js";

const printHomeDir = () => {
  const homeDir = os.homedir();
  console.log(homeDir);
};

const printOsEOL = () => {
  const osEOL = JSON.stringify(os.EOL);
  console.log(osEOL);
};

const printCpusInfo = () => {
  const cpus = os.cpus();
  const cpusInfo = cpus.map(
    (el) => (el = { model: el.model, speed: el.speed })
  );
  console.log(cpusInfo);
};

const printUserName = () => {
  const userName = os.userInfo().username;
  console.log(userName);
};

const printCpuArchitecture = () => {
  const arch = os.arch();
  console.log(arch);
};

export const osOperationHandler = (flag) => {
  switch (flag) {
    case "--EOL":
      printOsEOL();
      break;
    case "--cpus":
      printCpusInfo();
      break;
    case "--homedir":
      printHomeDir();
      break;
    case "--username":
      printUserName();
      break;
    case "--architecture":
      printCpuArchitecture();
      break;
    default:
      printInvalidInputErrorMessage();
  }
  printCurrentPath();
};
