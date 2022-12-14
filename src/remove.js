import { rm } from "node:fs/promises";
import {
  generatePath,
  getPath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "./utils.js";

export const removeFile = async (data) => {
  const path = getPath(data);
  const filePath = generatePath(path);

  if (!filePath) {
    printInvalidInputErrorMessage();
    return;
  }

  try {
    await rm(filePath);
  } catch {
    printOperationErrorMessage();
  }
};
