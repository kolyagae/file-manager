import { access } from "node:fs/promises";
import { sep, isAbsolute, resolve, normalize } from "node:path";

export const printGreetMessage = (userName) => {
  const greetText = `Welcome to the File Manager, ${userName}!`;
  console.log(greetText);
};

export const printGoodbyeMessage = (userName) => {
  const goodbyeText = `Thank you for using File Manager, ${userName}, goodbye!`;
  console.log(goodbyeText);
};

export const printStartAppErrorMessage = () => {
  const errorText = "Sorry this command is not available";
  console.error(errorText);
};

export const printInvalidInputErrorMessage = () => {
  const errorText = "Invalid input";
  console.error(errorText);
};

export const printOperationErrorMessage = () => {
  const errorText = "Operation failed";
  console.error(errorText);
};

export const printCurrentPath = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const checkExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export const getPath = (data) => {
  return data.split(" ").slice(1).join(" ").replace(/["']/g, "").trim();
};

export const generatePath = (data) => {
  if (!data) {
    return;
  }

  const path = data + sep;
  const newPath = isAbsolute(path)
    ? normalize(path)
    : resolve(process.cwd(), path);

  return newPath;
};
