let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);

let optionArr = [];
let filesArr = [];

//identify files and options from input command
for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].charAt(0) === '-') {
        optionArr.push(inputArr[i]);
    } else {
        filesArr.push(inputArr[i]);
    }
}


//edge cases
let bothBAndNPresent = optionArr.includes("-b") && optionArr.includes("-n");
if (bothBAndNPresent == true) {
    console.log("ERROR!🔴\nEnter only one option -n or -b");
    return;
}

let doesExist;
for (let i = 0; i < inputArr.length; i++) {
    doesExist = fs.existsSync(filesArr[i]);
    if (doesExist == false) {
        console.log("Existing File Error!🔴");
        return;
    }
}

//read the input files
let content = "";
for (let i = 0; i < filesArr.length; i++) {
    let contentInFiles = fs.readFileSync(filesArr[i]);
    content += contentInFiles + "\r\n";
}


//using option -s
let contentInArr = content.split("\r\n");


//check for -s option
let isSPresent = inputArr.includes("-s");
if (isSPresent === true) {
    for (let i = 1; i < contentInArr.length; i++) {
        if (contentInArr[i] == "" && contentInArr[i - 1] == "") {
            contentInArr[i] = null;
        } else if (contentInArr[i] == "" && contentInArr[i - 1] == null) {
            contentInArr[i] = null;
        }
    }

    let tempArr = [];
    for (let i = 0; i < contentInArr.length; i++) {
        if (contentInArr[i] != null) {
            tempArr.push(contentInArr[i]);
        }
    }
    contentInArr = tempArr;
    // console.log(contentInArr.join("\n"));
}


//check for -n option
let isNPresent = optionArr.includes("-n");
if (isNPresent === true) {
    for (let i = 0; i < contentInArr.length; i++) {
        contentInArr[i] = `${i+1} ${contentInArr[i]}`;
    }
    // console.log(contentInArr.join("\n"));
}


//check for -b option
let isBPresent = optionArr.includes("-b");
if (isBPresent) {
    for (let i = 0; i < contentInArr.length; i++) {
        if (contentInArr[i] != "") {
            contentInArr[i] = `${i+1} ${contentInArr[i]}`;
        }
    }
    console.log(contentInArr.join("\n"));
}