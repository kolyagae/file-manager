import { rename } from "node:fs/promises";
import { dirname, isAbsolute, normalize, resolve, sep } from "node:path";
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
    // const dirPath = parse(oldPath).dir + sep;
    const dirPath = dirname(oldPath) + sep;
    const newPath = isAbsolute(oldPath)
      ? resolve(dirPath, paths[1])
      : normalize(paths[1]);
    await rename(oldPath, newPath);
  } catch {
    printOperationErrorMessage();
  }
};
