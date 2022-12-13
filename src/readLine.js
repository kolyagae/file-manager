import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import * as print from "./utils.js";
import { osOperationHandler } from "./os.js";
import { fsOperationHandler, goHomeDirectory } from "./navigation.js";

export const startReadLine = () => {
  const userName = process.argv.slice(2)[0].slice(11);
  goHomeDirectory();
  print.greetMessage(userName);
  print.currentPath();
  const rl = readline.createInterface({ input, output });

  rl.on("line", (input) => {
    const operation = input.split(" ")[0];
    switch (operation) {
      case "up":
      case "cd":
      case "ls":
        fsOperationHandler(operation);
        break;
      case "cat":
        console.log("cat!");
        break;
      case "add":
        console.log("add!");
        break;
      case "rn":
        console.log("rn!");
        break;
      case "cp":
        console.log("cp!");
        break;
      case "mv":
        console.log("mv!");
        break;
      case "rm":
        console.log("rm!");
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
        print.goodbyeMessage(userName);
        rl.close();
        break;
      default:
        print.invalidInputErrorMessage();
    }
  });

  rl.on("SIGINT", () => {
    print.goodbyeMessage(userName);
    rl.close();
  });
};
