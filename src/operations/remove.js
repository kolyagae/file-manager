import { rm } from "node:fs/promises";
import {
  generatePath,
  getPaths,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "../utils/utils.js";

export const removeFile = async (data) => {
  const path = getPaths(data);
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
