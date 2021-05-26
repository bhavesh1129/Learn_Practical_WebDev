let path = require("path");

let extension = path.extname(path.join(__dirname, "abc.js"));
console.log(extension);

let baseName = path.basename(__dirname);
console.log(baseName);

let name = path.basename((path.join(__dirname, "abc.js")));
console.log(name);