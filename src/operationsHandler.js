import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  printGreetMessage,
  printCurrentPath,
  printInvalidInputErrorMessage,
  printGoodbyeMessage,
  getPaths,
} from "./utils/utils.js";
import { osOperationHandler } from "./operations/os.js";
import {
  navOperationHandler,
  goHomeDirectory,
} from "./operations/navigation.js";
import { printDirectoryContent } from "./operations/ls.js";
import { printFileContent } from "./operations/cat.js";
import { createNewFile } from "./operations/add.js";
import { renameFile } from "./operations/rename.js";
import { removeFile } from "./operations/remove.js";
import { printHash } from "./operations/hash.js";
import { copyFile } from "./operations/copy.js";
import { moveFile } from "./operations/move.js";
import { doBrotliCompress } from "./operations/compress.js";
import { doBrotliDecompress } from "./operations/decompress.js";

// export const startOperationsHandler = () => {
//   const userName = process.argv.slice(2)[0].slice(11);
//   goHomeDirectory();
//   printGreetMessage(userName);
//   printCurrentPath();
//   const rl = readline.createInterface({ input, output });

//   rl.on("line", async (input) => {
//     const operation = input.split(" ")[0];
//     switch (operation) {
//       case "up":
//       case "cd":
//         navOperationHandler(input);
//         break;
//       case "ls":
//         await printDirectoryContent();
//         printCurrentPath();
//         break;
//       case "cat":
//         await printFileContent(input);
//         break;
//       case "add":
//         const fileName = getPath(input);
//         await createNewFile(fileName);
//         printCurrentPath();
//         break;
//       case "rn":
//         await renameFile(input);
//         printCurrentPath();
//         break;
//       case "cp":
//         copyFile(input);
//         printCurrentPath();
//         break;
//       case "mv":
//         moveFile(input);
//         printCurrentPath();
//         break;
//       case "rm":
//         await removeFile(input);
//         printCurrentPath();
//         break;
//       case "os":
//         const flag = input.split(" ")[1];
//         osOperationHandler(flag);
//         break;
//       case "hash":
//         await printHash(input);
//         printCurrentPath();
//         break;
//       case "compress":
//         await doBrotliCompress(input);
//         printCurrentPath();
//         break;
//       case "decompress":
//         await doBrotliDecompress(input);
//         printCurrentPath();
//         break;
//       case ".exit":
//         printGoodbyeMessage(userName);
//         rl.close();
//         break;
//       default:
//         printInvalidInputErrorMessage();
//         printCurrentPath();
//     }
//   });

//   rl.on("SIGINT", () => {
//     printGoodbyeMessage(userName);
//     rl.close();
//   });
// };

export const startOperationsHandler = () => {
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
        await printDirectoryContent(input);
        printCurrentPath();
        break;
      case "cat":
        await printFileContent(input);
        break;
      case "add":
        await createNewFile(input);
        printCurrentPath();
        break;
      case "rn":
        await renameFile(input);
        printCurrentPath();
        break;
      case "cp":
        copyFile(input);
        printCurrentPath();
        break;
      case "mv":
        moveFile(input);
        printCurrentPath();
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
        await printHash(input);
        printCurrentPath();
        break;
      case "compress":
        await doBrotliCompress(input);
        printCurrentPath();
        break;
      case "decompress":
        await doBrotliDecompress(input);
        printCurrentPath();
        break;
      case ".exit":
        printGoodbyeMessage(userName);
        rl.close();
        break;
      default:
        printInvalidInputErrorMessage();
        printCurrentPath();
    }
  });

  rl.on("SIGINT", () => {
    printGoodbyeMessage(userName);
    rl.close();
  });
};
