import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  showGreetMessage,
  showGoodbyeMessage,
  showErrorMessage,
} from "./src/utils.js";

const startReadLine = () => {
  const userName = process.argv.slice(2)[0].slice(11);
  showGreetMessage(userName);
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
        console.log("os --EOL!");
        break;
      case "os --cpus":
        console.log("os --cpus!");
        break;
      case "os --homedir":
        console.log("os --homedir!");
        break;
      case "os --username":
        console.log("os --username!");
        break;
      case "os --architecture":
        console.log("os --architecture!");
        break;
      case "hash":
        console.log("hash!");
        break;
      case "compress":
        console.log("compress!");
        break;
      case "decompress ":
        console.log("decompress !");
        break;
      case ".exit":
        showGoodbyeMessage(userName);
        rl.close();
        break;
    }
  });
  rl.on("SIGINT", () => {
    showGoodbyeMessage(userName);
    rl.close();
  });
};

const startApp = () => {
  const propertyName = "--username=";
  const cliArgs = process.argv.slice(2);

  if (
    cliArgs.length === 1 &&
    cliArgs[0].startsWith(propertyName) &&
    cliArgs[0].length > 11
  ) {
    startReadLine();
  } else {
    showErrorMessage();
  }
};

startApp();
