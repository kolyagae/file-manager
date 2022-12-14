import { rename } from "node:fs/promises";
import { isAbsolute, parse, sep } from "node:path";
import {
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "./utils.js";

export const renameFile = async (data) => {
  const paths = data.split(" ").slice(1);
  const pathsAmount = paths.length;

  if (pathsAmount !== 2) {
    printInvalidInputErrorMessage();
    return;
  }

  try {
    const oldPath = paths[0];
    const dirPath = parse(oldPath).dir + sep;
    const newPath = isAbsolute(oldPath) ? dirPath + paths[1] : paths[1];
    await rename(oldPath, newPath);
  } catch {
    printOperationErrorMessage();
  }
};
