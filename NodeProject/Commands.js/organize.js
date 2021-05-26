let fs = require("fs");
let path = require("path");

function organizeFunction(dirPath) {
    let destPath;
    if (dirPath === undefined) {
        destPath = process.cwd();
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            destPath = path.join(dirPath, "Organized_Files");
            if (fs.existsSync(destPath) === false) {
                fs.mkdirSync(destPath);
            }
        } else {
            console.log("Kindly enter the correct path");
            return;
        }
    }
    organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for (let index = 0; index < childNames.length; index++) {
        let childAddress = path.join(src, childNames[index]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            let category = getCategory(childNames[index]);
            // console.log("category--> ", category);
            sendFiles(childAddress, dest, category);
        }
    }
}

function getCategory(name) {
    let ext = path.extname(name).slice(1);
    // console.log(ext);
    for (let type in types) {
        let currentTypeArray = types[type];
        for (let i = 0; i < currentTypeArray.length; i++) {
            if (ext === currentTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) === false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName + " --> is copied to --> " + category);
}

module.exports = {
    organizeKey: organizeFunction
}