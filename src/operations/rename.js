import { rename } from "node:fs/promises";
import { dirname, isAbsolute, normalize, resolve, sep } from "node:path";
import {
  getPaths,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "../utils/utils.js";

export const renameFile = async (data) => {
  const [pathToFile, newFileName, ...others] = getPaths(data);

  if (!pathToFile || !newFileName || others.length) {
    printInvalidInputErrorMessage();
    return;
  }

  try {
    const dirPath = dirname(pathToFile) + sep;
    const newPath = isAbsolute(pathToFile)
      ? resolve(dirPath, newFileName)
      : normalize(newFileName);
    await rename(pathToFile, newPath);
  } catch {
    printOperationErrorMessage();
  }
};
