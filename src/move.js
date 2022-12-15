import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { basename, dirname, isAbsolute, resolve, sep } from "node:path";
import {
  generatePath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "./utils.js";

export const moveFile = async (data) => {
  const paths = data.split(" ").slice(1);
  const pathsAmount = paths.length;

  if (pathsAmount !== 2) {
    printInvalidInputErrorMessage();
    return;
  }

  const pathToFile = generatePath(paths[0]);
  const fileName = basename(pathToFile);
  const dirPath = dirname(pathToFile) + sep;
  const pathToPaste = isAbsolute(paths[1] + sep)
    ? resolve(paths[1] + sep, fileName)
    : resolve(dirPath, paths[1] + sep, fileName);

  if (existsSync(pathToFile) && existsSync(dirname(pathToPaste))) {
    const readFile = createReadStream(pathToFile);
    const writeFile = createWriteStream(pathToPaste, { flags: "wx" });

    readFile
      .on("error", () => printOperationErrorMessage())
      .pipe(writeFile.on("error", () => printOperationErrorMessage()));

    writeFile.on("finish", async () => {
      try {
        await rm(pathToFile);
      } catch {
        printOperationErrorMessage();
      }
    });
    return;
  }
  printOperationErrorMessage();
};
