let fs = require("fs");

//-- -- -- -- -- -- -- -- -- -- -- --FOR FILES-- -- -- -- -- -- -- -- -- -- -- --

//read file
// let buffer = fs.readFileSync("os.js");
// console.log("bin data " + buffer);

//open file
// let openFile = fs.openSync("extra.txt", "w");

//write file but replace the whole content everytime
// let writeFile = fs.writeFileSync("extra.txt", "I am learning node js nowadays.");

//update file
// let updateFile = fs.appendFileSync("extra.txt", " I am learning about node modules.")

//unlink file
// let unlinkFile = fs.unlinkSync("extra.txt");

//-- -- -- -- -- -- -- -- -- -- -- --FOR FOLDER/DIRECTORY-- -- -- -- -- -- -- -- -- -- -- --

//create directory
// fs.mkdirSync("SampleFolder");

//read directory
// let readDirectory = fs.readdirSync("SampleFolder");
// console.log(readDirectory);

//write file in folder
// let writeFolder = fs.writeFileSync("SampleFolder/SampleFile.txt", "Sample Text");

//remove directory
// fs.rmdirSync("SampleFolder");


//-- -- -- -- -- -- -- -- -- -- -- --EXTRA'S-- -- -- -- -- -- -- -- -- -- -- --

//check for existing files
// let doesExist = fs.existsSync("os.js");
// console.log(doesExist);

//check whether the path is of folder of file
// let detailObj = fs.lstatSync(__dirname + "\\SystemFolder");
// let checkPath1 = detailObj.isFile();
// console.log(checkPath1);
// let checkPath2 = detailObj.isDirectory();
// console.log(checkPath2);

//-- -- -- -- -- -- -- -- -- -- -- --CREATING 5 DIRECTORIES-- -- -- -- -- -- -- -- -- -- -- --

// for (let index = 1; index <= 5; index++) {
//     let dirPathToMake = `FolderNumber- ${index}`;
//     fs.mkdirSync(dirPathToMake);
//     fs.writeFileSync(dirPathToMake + "\\" + "readme.md", `# readme file for ${dirPathToMake}`);
// }