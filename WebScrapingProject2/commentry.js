const request = require("request");
const cheerio = require("cheerio");
const chalk = require("chalk");

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";

console.log("Before Data Fetching!😀");
request(url, callBack);

function callBack(error, response, html) {
    if (error) {
        console.log("Ohh no its Error! ", error);
    } else {
        handleHTML(html);
    }
}

function handleHTML(html) {
    let setTool = cheerio.load(html);
    let commentry = setTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let contentArr = setTool(commentry[0]).text();
    // let htmlData = setTool(commentry[0]).html();
    console.log(chalk.bold.bgMagenta.black("Commentry: ") + chalk.bgWhite.black(contentArr));
    // console.log(htmlData); //for printing the html data
}

console.log("After Data Fetching!😀");