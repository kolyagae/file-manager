import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import {
  generatePath,
  getPath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "../utils/utils.js";

const readFileContent = async (filePath) => {
  try {
    const contents = await readFile(filePath, { encoding: "utf-8" });
    return contents;
  } catch {
    throw new Error();
  }
};

const calculateHash = (contents) => {
  const result = createHash("sha256").update(contents).digest("hex");

  return result;
};

export const printHash = async (data) => {
  const path = getPath(data);
  const filePath = generatePath(path);

  if (!filePath) {
    printInvalidInputErrorMessage();
    return;
  }

  try {
    const content = await readFileContent(filePath);
    const hash = calculateHash(content);
    console.log(hash);
  } catch {
    printOperationErrorMessage();
  }
};
