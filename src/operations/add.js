import { writeFile } from "node:fs/promises";
// import { existsSync } from "node:fs";
import { join, sep } from "node:path";
import {
  checkExist,
  getPaths as getFileName,
  printInvalidInputErrorMessage,
  printOperationErrorMessage,
} from "../utils/utils.js";

export const createNewFile = async (data) => {
  const [fileName, ...others] = getFileName(data);

  if (!fileName || others.length) {
    printInvalidInputErrorMessage();
    return;
  }

  const currPath = process.cwd() + sep;
  const newFilePath = join(currPath, fileName);
  const newFilePathExist = await checkExist(newFilePath);

  try {
    if (newFilePathExist) {
      throw new Error();
    }
    await writeFile(newFilePath, "");
  } catch {
    printOperationErrorMessage();
  }
};
