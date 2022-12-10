import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  printGreetMessage,
  printGoodbyeMessage,
  printInvalidInputErrorMessage,
} from "./utils.js";
import * as currentOS from "./os.js";

export const startReadLine = () => {
  const userName = process.argv.slice(2)[0].slice(11);
  printGreetMessage(userName);
  const rl = readline.createInterface({ input, output });

  rl.on("line", (input) => {
    switch (input) {
      case "up":
        console.log("up!");
        break;
      case "cd":
        console.log("cd!");
        break;
      case "ls":
        console.log("ls!");
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
      case "os --EOL":
        currentOS.printOsEOL();
        break;
      case "os --cpus":
        currentOS.printCpusInfo();
        break;
      case "os --homedir":
        currentOS.printHomeDir();
        break;
      case "os --username":
        currentOS.printUserName();
        break;
      case "os --architecture":
        currentOS.printCpuArchitecture();
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
