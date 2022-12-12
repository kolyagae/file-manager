import path from "node:path";
import os from "node:os";

export const goHomeDirectory = () => {
  process.chdir(os.homedir());
};

export const goUpDirectory = () => {
  const currentPath = process.cwd();
  const newPath =
    currentPath.split(path.sep).slice(0, -1).join(path.sep) + path.sep;
  process.chdir(newPath);
};
