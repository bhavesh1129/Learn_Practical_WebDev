const request = require('request');
const cheerio = require('cheerio');
const dataRelatedToScores = require('./scorecard');

function teamNamesFunc(urlToNewPage) {
    request(urlToNewPage, callbackFunc);

    function callbackFunc(err, response, html) {
        if (err) {
            console.log("Opps its an error!😥 ", err);
        } else {
            handleTeamsName(html);
        }
    }
}

function handleTeamsName(html) {
    let $ = cheerio.load(html);
    let scorecardButton = $("a[data-hover='Scorecard']");

    for (let i = 0; i < scorecardButton.length; i++) {
        let linkOfSummary = $(scorecardButton[i]).attr("href");
        let linkInScoreCardButton = "https://www.espncricinfo.com" + linkOfSummary;
        console.log(linkInScoreCardButton);
        dataRelatedToScores.getAllTheDataofScore(linkInScoreCardButton);
    }
}

module.exports = {
    getAllMatchesDetails: teamNamesFunc
}