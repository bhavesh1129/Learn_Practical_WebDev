let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);
let command = inputArr[0];

if (command === "arrange") {
    createDestPath(inputArr[1]);
} else {
    console.log("Kindly enter the correct command");
}

function createDestPath(orgPath) {
    let arrFiles;
    if (orgPath === undefined) {
        console.log("Kindly enter the correct path!");
        return;
    } else {
        let doesExist = fs.existsSync(orgPath);
        if (doesExist) {
            arrFiles = path.join(orgPath, "Arranged_Files");
            if (fs.existsSync(arrFiles) === false) {
                fs.mkdirSync(arrFiles);
            }
        }
    }
    filesOrganizer(orgPath, arrFiles);
}

function filesOrganizer(orgPath, arrFiles) {
    let childNames = fs.readdirSync(orgPath);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(orgPath, childNames[i]);
        // console.log(childAddress);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            console.log(checkDate(orgPath, arrFiles, childAddress));
        }
    }
}

function checkDate(orgPath, arrFiles, childAddress) {
    let bT = fs.statSync(childAddress).mtime;
    let dateOnly = bT.toString().slice(4, 7);

    if (dateOnly === "Jan") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "Feb") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "Mar") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "Apr") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "May") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "Jun") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "Jul") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "Aug") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "Sep") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "Oct") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "Nov") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    } else if (dateOnly === "Dec") {
        sendFileToMay(orgPath, arrFiles, childAddress, dateOnly);
    }
}

function sendFileToMay(orgPath, arrFiles, childAddress, dateOnly) {
    let monthDirectory = path.join(arrFiles, dateOnly);
    if (fs.existsSync(monthDirectory) === false) {
        fs.mkdirSync(monthDirectory);
    }
    let fileName = path.basename(childAddress);
    let destFilePath = path.join(monthDirectory, fileName);
    fs.copyFileSync(childAddress, destFilePath);
    fs.unlinkSync(childAddress);
    // console.log("Files --> are copied to --> " + monthDirectory);
}