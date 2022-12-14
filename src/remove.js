import { rm } from "node:fs/promises";
import { generatePath } from "./navigation.js";
import {
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "./utils.js";

export const removeFile = async (data) => {
  const path = data.split(" ").slice(1).join();
  const newPath = generatePath(path);

  if (!newPath) {
    printInvalidInputErrorMessage();
    return;
  }

  try {
    await rm(newPath);
  } catch {
    printOperationErrorMessage();
  }
};
