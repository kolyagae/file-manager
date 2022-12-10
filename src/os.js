import * as os from "node:os";

export const printHomeDir = () => {
  const homeDir = os.homedir();
  console.log(homeDir);
};

export const printOsEOL = () => {
  const osEOL = JSON.stringify(os.EOL);
  console.log(osEOL);
};

export const printCpusInfo = () => {
  const cpus = os.cpus();
  const cpusInfo = cpus.map(
    (el) => (el = { model: el.model, speed: el.speed })
  );
  console.log(cpusInfo);
};

export const printUserName = () => {
  const userName = os.userInfo().username;
  console.log(userName);
};

export const printCpuArchitecture = () => {
  const arch = os.arch();
  console.log(arch);
};
