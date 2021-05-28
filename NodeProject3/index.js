// let fs = require("fs");
// let path = require("path");
// let inputArr = process.argv.slice(2);

// let command = inputArr[0];

// let optionArr = [];
// let filesArr = [];

// if (command === "wcat") {
//     for (let i = 1; i < inputArr.length; i++) {
//         if (inputArr[i].charAt(0) === '-') {
//             optionArr.push(inputArr[i]);
//         } else {
//             filesArr.push(inputArr[i]);
//         }
//     }
// } else {
//     console.log("Kindly enter the correct command");
// }

// checkFileCommand(filesArr, optionArr); //calling files array

// function checkFileCommand(filesArr, optionArr) {
//     for (let i = 0; i < filesArr.length; i++) {
//         let doesExist = fs.existsSync(filesArr[i]);
//         if (doesExist) {
//             let fileContent = fs.readFileSync(filesArr[i]);
//             let convertFileContent, shortContentUsingS;
//             for (let i = 0; i < optionArr.length; i++) {
//                 if (optionArr[i] === '-s') {
//                     convertFileContent = fileContent.toString();
//                     shortContentUsingS = convertFileContent.replace(/\s\s+/g, ' ');
//                     console.log("" + shortContentUsingS);
//                 } else if (optionArr[i] === '-n') {
//                     let numberOfLinesInContent = convertFileContent.split('\n');
//                     console.log(numberOfLinesInContent.length);
//                 } else if (optionArr[i] === '-b') {
//                     console.log("my name is -b");
//                 } else {
//                     console.log("" + fileContent);
//                 }
//             }
//         }
//     }
// }