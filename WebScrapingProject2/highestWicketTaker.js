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
    console.log(chalk.bgYellow.bold.black(winTeamName));
    highestWicketerNameFunc(setTool, winTeamName);
}

function winningTeamNameFunc(setTool) {
    let winningTeamArr = setTool(".name-detail a");
    let winningTeamName = setTool(winningTeamArr[1]).text();
    return winningTeamName;
}

function highestWicketerNameFunc(setTool, winTeamName) {
    let inningsArr = setTool(".card.content-block.match-scorecard-table>.Collapsible");
    // let htmlStr = "";
    for (let i = 0; i < inningsArr.length; i++) {
        // let currentHtml = setTool(inningsArr[i]).html();
        // htmlStr += currentHtml;
        let teamNameElements = setTool(inningsArr[i]).find(".header-title.label");
        let teamName = teamNameElements.text();
        teamName = teamName.split("INNINGS")[0].trim();

        let bowlerNameWithHighestWickets = "";
        let maxNumberOfWickets = 0;
        if (winTeamName == teamName) {

            let bowlerTable = setTool(inningsArr[i]).find(".table.bowler");
            let winTeamBowlers = setTool(bowlerTable).find("tr");

            for (let j = 0; j < winTeamBowlers.length; j++) {
                let bowlerDetails = setTool(winTeamBowlers[j]).find("td");
                let bowlerName = setTool(bowlerDetails[0]).text();
                let wicketsByBowler = setTool(bowlerDetails[4]).text();

                if (wicketsByBowler >= maxNumberOfWickets) {
                    maxNumberOfWickets = wicketsByBowler;
                    bowlerNameWithHighestWickets = bowlerName;
                }
                //for all bowlers info
                // console.log(`The PlayerName ${(bowlerName)} of Winning Team ${chalk.bgWhite.black(winTeamName)} has taken ${chalk.bgGreenBright(wicketsByBowler)} wickets`);
            }
            console.log("Player " + chalk.bgMagenta(bowlerNameWithHighestWickets) + " has taken max number of wickets that is " + chalk.bgWhite.black(maxNumberOfWickets));
        }
    }
    // console.log(htmlStr);
}