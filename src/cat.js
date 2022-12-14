import { createReadStream } from "node:fs";
import { printCurrentPath, printOperationErrorMessage } from "./utils.js";

export const printFileContent = async (filePath) => {
  const reader = createReadStream(filePath, { encoding: "utf-8" });

  reader.on("data", (chunk) => console.log(chunk));
  reader.on("close", () => printCurrentPath());
  reader.on("error", () => printOperationErrorMessage());
};
