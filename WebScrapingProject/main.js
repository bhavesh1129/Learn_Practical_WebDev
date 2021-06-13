const request = require("request");
const chalk = require("chalk");
const cheerio = require("cheerio");
console.log("Before Data Fetching");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard", callBack);
console.log("After Data Fetching!");

function callBack(error, response, html) {
    if (error) {
        console.log("Error!");
    } else {
        handleHTML(html);
    }
}

function handleHTML(html) {
    let setTool = cheerio.load(html);
    let playerName = setTool(".best-player-content a");
    let teamName = setTool(".best-player-content span");

    let playerOfTheMatch = setTool(playerName[0]).text();
    let nameOfTheWiningTeam = setTool(teamName[0]).text();

    console.log(chalk.yellowBright((chalk.bold("Player of the Match is ") +
        chalk.bgWhite.black.bold(playerOfTheMatch) + chalk.bold(" of Team ") +
        chalk.bgWhite.black.bold(nameOfTheWiningTeam))));
}