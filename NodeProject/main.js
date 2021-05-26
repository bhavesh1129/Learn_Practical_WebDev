#!/usr/bin/env node


let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let treeObj = require("./Commands.js/tree");
let organizeObj = require("./Commands.js/organize");
let helpObj = require("./Commands.js/help");

let command = inputArr[0];

let types = {
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlxs", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    app: ["exe", "dmg", "pkg", "deb"]
}

switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;

    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;

    case "help":
        helpObj.helpKey();
        break;

    default:
        console.log("✖ Please write the right command!");
        break;
}