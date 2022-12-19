import {
  generatePath,
  getPaths,
  printCurrentPath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "../utils/utils.js";
import { sep } from "node:path";
import { homedir } from "node:os";

export const goHomeDirectory = () => {
  process.chdir(homedir());
};

const goUpDirectory = (data) => {
  const paths = getPaths(data);

  if (paths.length > 0) {
    printInvalidInputErrorMessage();
    return;
  }

  const currentPath = process.cwd();
  const newPath = currentPath.split(sep).slice(0, -1).join(sep) + sep;
  process.chdir(newPath);
};

const changeDirectory = (dirPath) => {
  const [path, ...others] = getPaths(dirPath);

  if (!path || others.length > 0) {
    printInvalidInputErrorMessage();
    return;
  }

  try {
    const newPath = generatePath(path);
    process.chdir(newPath);
  } catch {
    printOperationErrorMessage();
  }
};

export const navOperationHandler = async (input) => {
  const operation = input.split(" ")[0];

  switch (operation) {
    case "up":
      goUpDirectory(input);
      break;
    case "cd":
      changeDirectory(input);
      break;
    default:
      printInvalidInputErrorMessage();
  }
  printCurrentPath();
};
