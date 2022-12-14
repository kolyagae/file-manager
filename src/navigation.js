import {
  getPath,
  printCurrentPath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "./utils.js";
import { sep, isAbsolute, resolve } from "node:path";
import { homedir } from "node:os";

export const goHomeDirectory = () => {
  process.chdir(homedir());
};

const goUpDirectory = () => {
  const currentPath = process.cwd();
  const newPath = currentPath.split(sep).slice(0, -1).join(sep) + sep;
  process.chdir(newPath);
};

const generateNewPath = (path) => {
  if (!path) {
    printInvalidInputErrorMessage();
    return;
  }
  path = path + sep;
  const newPath = isAbsolute(path) ? path : resolve(process.cwd(), path);
  return newPath;
};

const changeDirectory = (newPath) => {
  try {
    process.chdir(newPath);
  } catch {
    printOperationErrorMessage();
  }
};

export const navOperationHandler = async (input) => {
  const operation = input.split(" ")[0];
  switch (operation) {
    case "up":
      goUpDirectory();
      break;
    case "cd":
      const dirPath = getPath(input);
      const newPath = generateNewPath(dirPath);
      changeDirectory(newPath);
      break;
    default:
      printInvalidInputErrorMessage();
  }
  printCurrentPath();
};
