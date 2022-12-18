import {
  generatePath,
  getPath,
  printCurrentPath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "../utils/utils.js";
import { sep } from "node:path";
import { homedir } from "node:os";

export const goHomeDirectory = () => {
  process.chdir(homedir());
};

const goUpDirectory = () => {
  const currentPath = process.cwd();
  const newPath = currentPath.split(sep).slice(0, -1).join(sep) + sep;
  process.chdir(newPath);
};

const changeDirectory = (dirPath) => {
  const newPath = generatePath(dirPath);

  if (!newPath) {
    printInvalidInputErrorMessage();
    return;
  }

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
      changeDirectory(dirPath);
      break;
    default:
      printInvalidInputErrorMessage();
  }
  printCurrentPath();
};
