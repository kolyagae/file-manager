import * as print from "./utils.js";
import { sep, isAbsolute, resolve } from "node:path";
import { homedir } from "node:os";
import { readdir } from "node:fs/promises";

export const goHomeDirectory = () => {
  process.chdir(homedir());
};

const goUpDirectory = () => {
  const currentPath = process.cwd();
  const newPath = currentPath.split(sep).slice(0, -1).join(sep) + sep;
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

const generateNewPath = (path) => {
  if (!path) {
    print.invalidInputErrorMessage();
    return;
  }
  path = path + sep;
  const newPath = isAbsolute(path) ? path : resolve(process.cwd(), path);
  return newPath;
};

const changeDirectory = (newPath) => {
  try {
    process.chdir(newPath);
  } catch {
    print.operationErrorMessage();
  }
};

export const fsOperationHandler = async (input) => {
  const operation = input.split(" ")[0];
  switch (operation) {
    case "up":
      goUpDirectory();
      break;
    case "cd":
      const path = input.split(" ").slice(1).join(" ").replace(/["']/g, "");
      const newPath = generateNewPath(path);
      changeDirectory(newPath);
      break;
    case "ls":
      await printDirectoryContent();
      break;
    default:
      print.invalidInputErrorMessage();
  }
  print.currentPath();
};
