const request = require('request');
const cheerio = require('cheerio');
const getAllDetailsOfTheMatch = require('./allMatch');

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/";

console.log("Before Data Fetching!😀");
request(url, callback);
console.log("After Data Fetching!😀");

function callback(err, response, html) {
    if (err) {
        console.log("Opps its an error!😥 ", err);
    } else {
        handleHTML(html);
    }
}

function handleHTML(html) {
    let $ = cheerio.load(html);
    let viewResultButton = $(".widget-items.cta-link a").attr("href");
    let urlToNewPage = "https://www.espncricinfo.com/" + viewResultButton;
    getAllDetailsOfTheMatch.getAllMatchesDetails(urlToNewPage);
}