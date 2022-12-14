import { rename } from "node:fs/promises";
import { printOperationErrorMessage } from "./utils.js";

export const renameFile = async (data) => {
  const oldPath = data.split(" ").slice(1)[0];
  const newPath = data.split(" ").slice(1)[1];

  try {
    await rename(oldPath, newPath);
  } catch {
    printOperationErrorMessage();
  }
};
