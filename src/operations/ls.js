import { printOperationErrorMessage } from "../utils/utils.js";
import { readdir } from "node:fs/promises";

const readCurrentDirectory = async () => {
  const currentPath = process.cwd();
  try {
    const dirContent = await readdir(currentPath, { withFileTypes: true });
    return dirContent;
  } catch {
    printOperationErrorMessage();
  }
};

const sortDirectoryContent = async () => {
  try {
    const dirContent = await readCurrentDirectory();
    const files = dirContent.filter((el) => el.isFile()).sort();
    const dirs = dirContent.filter((el) => el.isDirectory()).sort();
    dirs.forEach((el) => (el.type = "directory"));
    files.forEach((el) => (el.type = "file"));
    const sortedDirContent = [...dirs, ...files];

    return sortedDirContent;
  } catch {
    printOperationErrorMessage();
  }
};

export const printDirectoryContent = async () => {
  try {
    const dirContent = await sortDirectoryContent();
    console.table(dirContent);
  } catch {
    printOperationErrorMessage();
  }
};
