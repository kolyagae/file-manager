import { createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import {
  checkExist,
  generatePath,
  printOperationErrorMessage,
} from "../utils/utils.js";
import { dirname, isAbsolute, parse, resolve, sep } from "node:path";

export const doBrotliDecompress = async (data) => {
  const paths = data.split(" ").slice(1);
  const pathsAmount = paths.length;

  if (pathsAmount !== 2) {
    printInvalidInputErrorMessage();
    return;
  }

  const pathToFile = generatePath(paths[0]);
  const fileName = parse(pathToFile).name;
  const fileExtName = parse(pathToFile).ext;
  const dirPath = dirname(pathToFile) + sep;
  const pathToDestination = isAbsolute(paths[1] + sep)
    ? resolve(paths[1] + sep + fileName)
    : resolve(dirPath, paths[1] + sep + fileName);
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
