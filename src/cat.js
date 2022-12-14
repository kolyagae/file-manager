import { createReadStream } from "node:fs";
import {
  generatePath,
  printCurrentPath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "./utils.js";

export const printFileContent = async (data) => {
  const path = data.split(" ").slice(1).join(" ");
  console.log(path);
  const newPath = generatePath(path);
  console.log(newPath);

  if (!newPath) {
    printInvalidInputErrorMessage();
    return;
  }

  const reader = createReadStream(newPath, { encoding: "utf-8" });

  reader.on("data", (chunk) => console.log(chunk));
  reader.on("close", () => printCurrentPath());
  reader.on("error", () => printOperationErrorMessage());
};
