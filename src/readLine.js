import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  printGreetMessage,
  printCurrentPath,
  printInvalidInputErrorMessage,
  printGoodbyeMessage,
  getPath,
} from "./utils.js";
import { osOperationHandler } from "./os.js";
import { navOperationHandler, goHomeDirectory } from "./navigation.js";
import { printDirectoryContent } from "./ls.js";
import { printFileContent } from "./cat.js";
import { createNewFile } from "./add.js";
import { renameFile } from "./rename.js";
import { removeFile } from "./remove.js";

export const startReadLine = () => {
  const userName = process.argv.slice(2)[0].slice(11);
  goHomeDirectory();
  printGreetMessage(userName);
  printCurrentPath();
  const rl = readline.createInterface({ input, output });

  rl.on("line", async (input) => {
    const operation = input.split(" ")[0];
    switch (operation) {
      case "up":
      case "cd":
        navOperationHandler(input);
        break;
      case "ls":
        await printDirectoryContent();
        printCurrentPath();
        break;
      case "cat":
        const filePath = getPath(input);
        await printFileContent(filePath);
        break;
      case "add":
        const fileName = getPath(input);
        await createNewFile(fileName);
        printCurrentPath();
        break;
      case "rn":
        await renameFile(input);
        printCurrentPath();
        break;
      case "cp":
        console.log("cp!");
        break;
      case "mv":
        console.log("mv!");
        break;
      case "rm":
        await removeFile(input);
        printCurrentPath();
        break;
      case "os":
        const flag = input.split(" ")[1];
        osOperationHandler(flag);
        break;
      case "hash":
        console.log("hash!");
        break;
      case "compress":
        console.log("compress!");
        break;
      case "decompress":
        console.log("decompress!");
        break;
      case ".exit":
        printGoodbyeMessage(userName);
        rl.close();
        break;
      default:
        printInvalidInputErrorMessage();
    }
  });

  rl.on("SIGINT", () => {
    printGoodbyeMessage(userName);
    rl.close();
  });
};
