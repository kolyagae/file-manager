import { createBrotliCompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import {
  checkExist,
  generatePath,
  printOperationErrorMessage,
  printInvalidInputErrorMessage,
  getPaths,
} from "../utils/utils.js";
import { basename, dirname, isAbsolute, resolve, sep } from "node:path";

export const doBrotliCompress = async (data) => {
  const [pathFile, pathDestination, ...others] = getPaths(data);

  if (!pathFile || !pathDestination || others.length) {
    printInvalidInputErrorMessage();
    return;
  }

  const pathToFile = generatePath(pathFile);
  const fileName = basename(pathToFile);
  const dirPath = dirname(pathToFile) + sep;
  const pathToDestination = isAbsolute(pathDestination + sep)
    ? resolve(pathDestination + sep + fileName + ".br")
    : resolve(dirPath, pathDestination + sep + fileName + ".br");
  const existFile = await checkExist(pathToFile);
  const existPathToDestination = await checkExist(dirname(pathToDestination));

  if (existFile && existPathToDestination) {
    const brotliCompress = createBrotliCompress();
    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(pathToDestination);

    try {
      await pipeline(readStream, brotliCompress, writeStream);
    } catch {
      printOperationErrorMessage();
    }

    return;
  }
  printOperationErrorMessage();
};
