let childProcess = require("child_process");
console.log("Opening calculator");
childProcess.execSync("start chrome https://www.youtube.com/");
console.log("Opened Calculator");