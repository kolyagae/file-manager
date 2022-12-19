import { createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import {
  checkExist,
  generatePath,
  printOperationErrorMessage,
  printInvalidInputErrorMessage,
  getPaths,
} from "../utils/utils.js";
import { dirname, isAbsolute, parse, resolve, sep } from "node:path";

export const doBrotliDecompress = async (data) => {
  const [pathFile, pathDestination, ...others] = getPaths(data);

  if (!pathFile || !pathDestination || others.length) {
    printInvalidInputErrorMessage();
    return;
  }

  const pathToFile = generatePath(pathFile);
  const fileName = parse(pathToFile).name;
  const fileExtName = parse(pathToFile).ext;
  const dirPath = dirname(pathToFile) + sep;
  const pathToDestination = isAbsolute(pathDestination + sep)
    ? resolve(pathDestination + sep + fileName)
    : resolve(dirPath, pathDestination + sep + fileName);
  const existFile = await checkExist(pathToFile);
  const existPathToDestination = await checkExist(dirname(pathToDestination));

  if (existFile && fileExtName === ".br" && existPathToDestination) {
    const brotliDecompress = createBrotliDecompress();
    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(pathToDestination);

    try {
      await pipeline(readStream, brotliDecompress, writeStream);
    } catch {
      printOperationErrorMessage();
    }

    return;
  }
  printOperationErrorMessage();
};
