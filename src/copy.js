import { createReadStream, createWriteStream } from "node:fs";
import { basename, dirname, isAbsolute, resolve, sep } from "node:path";
import {
  generatePath,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "./utils.js";

export const copyFile = async (data) => {
  const paths = data.split(" ").slice(1);
  const pathsAmount = paths.length;

  if (pathsAmount !== 2) {
    printInvalidInputErrorMessage();
    return;
  }

  const pathToFile = generatePath(paths[0]);
  const fileName = basename(pathToFile);
  const dirPath = dirname(pathToFile) + sep;
  const pathToCopy = isAbsolute(paths[1] + sep)
    ? resolve(paths[1] + sep, fileName)
    : resolve(dirPath, paths[1] + sep, fileName);
  const existFile = await checkExist(pathToFile);
  const existDir = await checkExist(dirname(pathToCopy));

  if (existFile && existDir) {
    const readFile = createReadStream(pathToFile);
    const writeFile = createWriteStream(pathToCopy, { flags: "wx" });

    readFile.pipe(
      writeFile.on("error", () => {
        readFile.close();
        printOperationErrorMessage();
      })
    );

    return;
  }
  printOperationErrorMessage();
};
