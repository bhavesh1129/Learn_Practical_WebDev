const xlsx = require('xlsx');
const fs = require('fs');

function writeInExcel(filePath, json, sheetName) {
    let newWorkbook = xlsx.utils.book_new();
    let newWorksheet = xlsx.utils.json_to_sheet(json, sheetName);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);
    xlsx.writeFile(newWorkbook, filePath);
}

function readInExcel(filePath, sheetName) {
    if (fs.existsSync(filePath) == false) {
        return [];
    }
    let workBook = xlsx.readFile(filePath); //to get the workbook
    let excelData = workBook.Sheets[sheetName]; //to get sheet
    let contentInExcelFile = xlsx.utils.sheet_to_json(excelData); //to get sheet data
    return contentInExcelFile;
}