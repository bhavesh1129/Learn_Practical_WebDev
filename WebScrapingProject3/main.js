const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const getAllDetailsOfTheMatch = require('./allMatch');

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/";
const iplPath = path.join(__dirname, "IPL");

createDirectories(iplPath);

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

function createDirectories(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }
}