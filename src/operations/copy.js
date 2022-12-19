import { createReadStream, createWriteStream } from "node:fs";
import { basename, dirname, isAbsolute, resolve, sep } from "node:path";
import {
  checkExist,
  generatePath,
  getPaths,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "../utils/utils.js";

export const copyFile = async (data) => {
  const [pathFile, pathToNewDir, ...others] = getPaths(data);

  if (!pathFile || !pathToNewDir || others.length) {
    printInvalidInputErrorMessage();
    return;
  }

  const pathToFile = generatePath(pathFile);
  const fileName = basename(pathToFile);
  const dirPath = dirname(pathToFile) + sep;
  const pathToCopy = isAbsolute(pathToNewDir + sep)
    ? resolve(pathToNewDir + sep, fileName)
    : resolve(dirPath, pathToNewDir + sep, fileName);
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
