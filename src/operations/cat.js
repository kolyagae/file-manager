import { createReadStream } from "node:fs";
import {
  generatePath,
  getPaths,
  printCurrentPath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "../utils/utils.js";

export const printFileContent = async (data) => {
  const [pathToFile, ...others] = getPaths(data);

  if (!pathToFile || others.length) {
    printInvalidInputErrorMessage();
    return;
  }

  const newPath = generatePath(pathToFile);
  const reader = createReadStream(newPath, { encoding: "utf-8" });

  reader.on("data", (chunk) => console.log(chunk));
  reader.on("close", () => printCurrentPath());
  reader.on("error", () => printOperationErrorMessage());
};
