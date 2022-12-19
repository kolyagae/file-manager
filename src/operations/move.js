import { createReadStream, createWriteStream } from "node:fs";
import { rm } from "node:fs/promises";
import { basename, dirname, isAbsolute, resolve, sep } from "node:path";
import {
  checkExist,
  generatePath,
  getPaths,
  printCurrentPath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "../utils/utils.js";

export const moveFile = async (data) => {
  const [pathFile, pathDestination, ...others] = getPaths(data);

  if (!pathFile || !pathDestination || others.length) {
    printInvalidInputErrorMessage();
    return;
  }

  const pathToFile = generatePath(pathFile);
  const fileName = basename(pathToFile);
  const dirPath = dirname(pathToFile) + sep;
  const pathToDestination = isAbsolute(pathDestination + sep)
    ? resolve(pathDestination + sep, fileName)
    : resolve(dirPath, pathDestination + sep, fileName);
  const existFile = await checkExist(pathToFile);
  const existDir = await checkExist(dirname(pathToDestination));

  if (existFile && existDir) {
    const readFile = createReadStream(pathToFile);
    const writeFile = createWriteStream(pathToDestination, { flags: "wx" });

    readFile.pipe(
      writeFile.on("error", () => {
        readFile.close();
        printOperationErrorMessage();
        printCurrentPath();
      })
    );

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
