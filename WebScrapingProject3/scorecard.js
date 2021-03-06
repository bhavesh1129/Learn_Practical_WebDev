const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

function getAllTheDataofTheMatchRelatedToScore(url) {
    request(url, callback);
}

function callback(err, response, html) {
    if (err) {
        console.log("Opps its an error!😥 ", err);
    } else {
        extractMatchDetails(html);
    }
}

function extractMatchDetails(html) {
    let $ = cheerio.load(html);
    let detailsOfMatch = $(".match-info.match-info-MATCH .description").text();
    let detailsArr = detailsOfMatch.split(",");
    let dateOfTheMatch = detailsArr[2].trim();
    let venueOfTheMatch = detailsArr[1].trim();
    let result = $(".match-info.match-info-MATCH .status-text").text();

    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
    for (let i = 0; i < innings.length; i++) {
        let teamsName = $(innings[i]).find("h5").text();
        teamsName = teamsName.split("INNINGS")[0].trim();
        let opponentIndex = i == 0 ? 1 : 0;
        let opponentTeamName = $(innings[opponentIndex]).find("h5").text();
        opponentTeamName = opponentTeamName.split("INNINGS")[0].trim();

        let currInnings = $(innings[i]);
        let allRows = currInnings.find(".table.batsman tbody tr");
        for (let i = 0; i < allRows.length; i++) {
            let allCols = $(allRows[i]).find("td");
            let isTrue = $(allCols[0]).hasClass("batsman-cell");
            if (isTrue) {
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();

                console.log(`${playerName} ${runs} ${balls} ${balls} ${fours} ${sixes} ${sr}`);

                processingPlayersToExcelFile(teamsName, playerName, runs, balls, fours,
                    sixes, sr, opponentTeamName, venueOfTheMatch, dateOfTheMatch, result);
            }
        }
    }
}

function processingPlayersToExcelFile(teamsName, playerName, runs, balls, fours, sixes,
    sr, opponentTeamName, venueOfTheMatch, dateOfTheMatch, result) {
    let teamPath = path.join(__dirname, "IPL", teamsName);
    createDirectories(teamPath);

    let filePath = path.join(teamPath, playerName + ".xlsx");
    let contentInExcel = readInExcel(filePath, playerName);

    let playerObj = {
        teamsName,
        playerName,
        runs,
        balls,
        fours,
        sixes,
        sr,
        opponentTeamName,
        venueOfTheMatch,
        dateOfTheMatch,
        result
    }
    contentInExcel.push(playerObj);
    writeInExcel(filePath, contentInExcel, playerName);
}

function createDirectories(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }
}

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

module.exports = {
    getAllTheDataofScore: getAllTheDataofTheMatchRelatedToScore
}