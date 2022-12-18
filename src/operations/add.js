import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { sep } from "node:path";
import {
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "../utils/utils.js";

export const createNewFile = async (fileName) => {
  if (!fileName) {
    printInvalidInputErrorMessage();
    return;
  }

  const currPath = process.cwd() + sep;
  const newFilePath = currPath + fileName;

  try {
    if (existsSync(newFilePath) || fileName.includes(" ")) {
      throw new Error();
    }
    await writeFile(newFilePath, "");
  } catch {
    printOperationErrorMessage();
  }
};
