import { createReadStream } from "node:fs";
import {
  generatePath,
  getPath,
  printCurrentPath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "./utils.js";

export const printFileContent = async (data) => {
  const path = getPath(data);
  const newPath = generatePath(path);

  if (!newPath) {
    printInvalidInputErrorMessage();
    return;
  }

  const reader = createReadStream(newPath, { encoding: "utf-8" });

  reader.on("data", (chunk) => console.log(chunk));
  reader.on("close", () => printCurrentPath());
  reader.on("error", () => printOperationErrorMessage());
};
