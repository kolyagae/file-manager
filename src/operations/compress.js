import { createBrotliCompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import {
  checkExist,
  generatePath,
  printOperationErrorMessage,
} from "../utils/utils.js";
import { basename, dirname, isAbsolute, resolve, sep } from "node:path";

export const doBrotliCompress = async (data) => {
  const paths = data.split(" ").slice(1);
  const pathsAmount = paths.length;

  if (pathsAmount !== 2) {
    printInvalidInputErrorMessage();
    return;
  }

  const pathToFile = generatePath(paths[0]);
  const fileName = basename(pathToFile);
  const dirPath = dirname(pathToFile) + sep;
  const pathToDestination = isAbsolute(paths[1] + sep)
    ? resolve(paths[1] + sep + fileName + ".br")
    : resolve(dirPath, paths[1] + sep + fileName + ".br");
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
