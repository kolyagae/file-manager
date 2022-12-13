import * as print from "./utils.js";
import path from "node:path";
import { homedir } from "node:os";
import { readdir } from "node:fs/promises";

export const goHomeDirectory = () => {
  process.chdir(homedir());
};

const goUpDirectory = () => {
  const currentPath = process.cwd();
  const newPath =
    currentPath.split(path.sep).slice(0, -1).join(path.sep) + path.sep;
  process.chdir(newPath);
};

const readCurrentDirectory = async () => {
  const currentPath = process.cwd();
  try {
    const dirContent = await readdir(currentPath, { withFileTypes: true });
    return dirContent;
  } catch (err) {
    console.error(err);
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
  } catch (err) {
    console.error(err);
  }
};

const printDirectoryContent = async () => {
  try {
    const dirContent = await sortDirectoryContent();
    console.table(dirContent);
  } catch (err) {
    console.error(err);
  }
};

export const fsOperationHandler = async (operation) => {
  const operationName = operation.split(" ")[0];
  switch (operationName) {
    case "up":
      goUpDirectory();
      break;
    case "cd":
      console.log("cd!");
      break;
    case "ls":
      await printDirectoryContent();
      break;
    default:
      print.invalidInputErrorMessage();
  }
  print.currentPath();
};
