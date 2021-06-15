const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

console.log("Before Data Fetching!😀");

request(url, callback);
console.log("After Data Fetching!😀");

function callback(error, response, html) {
    if (error) {
        console.log("Ohh no its Error! ", error);
    } else {
        handleHTML(html);
    }
}

function handleHTML(html) {
    let setTool = cheerio.load(html);
    let winTeamName = winningTeamNameFunc(setTool);
    batsmanDOBFunc(setTool, winTeamName);
}

function winningTeamNameFunc(setTool) {
    let winningTeamArr = setTool(".name-detail a");
    let winningTeamName = setTool(winningTeamArr[1]).text();
    return winningTeamName;
}

function batsmanDOBFunc(setTool, winTeamName) {
    let inningsArr = setTool(".card.content-block.match-scorecard-table>.Collapsible");
    for (let i = 0; i < inningsArr.length; i++) {
        let teamNameElements = setTool(inningsArr[i]).find(".header-title.label");
        let teamName = teamNameElements.text();
        teamName = teamName.split("INNINGS")[0].trim();

        let batsmanTable = setTool(inningsArr[i]).find(".table.batsman");
        let winTeamBatsman = setTool(batsmanTable).find("tr");

        for (let j = 0; j < winTeamBatsman.length; j++) {
            let batsmanDetails = setTool(winTeamBatsman[j]).find("td");
            let isBatsmanCol = setTool(batsmanDetails[0]).hasClass("batsman-cell");
            if (isBatsmanCol == true) {
                let batsmanHref = setTool(batsmanDetails[0]).find("a").attr("href");
                let batsmanName = setTool(batsmanDetails[0]).text();
                let fullHrefLink = "https://www.espncricinfo.com" + batsmanHref;
                getBirthdayFunc(fullHrefLink, batsmanName, teamName);
            }
        }
    }
}

function getBirthdayFunc(fullHrefLink, batsmanName, teamName) {
    request(fullHrefLink, callBack);

    function callBack(error, response, html) {
        if (error) {
            console.log("Ohh no its Error! ", error);
        } else {
            extractBirthDates(html, batsmanName, teamName);
        }
    }
}

function extractBirthDates(html, batsmanName, teamName) {
    let $ = cheerio.load(html);
    let getDate = $(".player-card-description");
    let birthdayDateDetails = $(getDate[1]).text();
    console.log("Team Name: " + chalk.bgRed(teamName) + " Player Name: " + chalk.bgYellow(batsmanName) + "Born: " + chalk.bgMagenta(birthdayDateDetails));
}