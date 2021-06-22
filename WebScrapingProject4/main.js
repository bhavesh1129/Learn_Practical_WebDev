const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const pdfkit = require('pdfkit');

console.log("Before Data Fetching!😀");
const url = "https://github.com/topics";

request(url, callBack);
console.log("After Data Fetching!😀");
console.log("-------------------------------------------");

function callBack(err, response, html) {
    if (err) {
        console.log("Opps its an error!😥 ", err);
    } else {
        linksOfThreeCards(html);
    }
}

function linksOfThreeCards(html) {
    let $ = cheerio.load(html);
    let cardsURL = $(".topic-box a");
    for (let i = 0; i < cardsURL.length; i++) {
        let linkInCards = $(cardsURL[i]).attr("href");

        //Making the Association's name dir
        let nameOfAssociationOnly = linkInCards.split("/");
        var nameOfDir = nameOfAssociationOnly[2];
        if (!fs.existsSync(nameOfDir)) {
            let dirPathh = path.join(__dirname, nameOfDir);
            fs.mkdirSync(dirPathh);
        }

        let mainURL = "https://github.com";
        let fullLinkInsideCards = mainURL + linkInCards;
        console.log(fullLinkInsideCards);

        findReposLink(fullLinkInsideCards, mainURL, nameOfDir);
    }
    console.log("-------------------------------------------");
    console.log("-------------------------------------------");
}

function findReposLink(fullLinkInsideCards, mainURL, nameOfDir) {
    request(fullLinkInsideCards, function(err, response, html) {
        if (err) {
            console.log("Opps its an error!😥 ", err);
        } else {
            extractRepoLinks(html, fullLinkInsideCards, mainURL, nameOfDir);
        }
    });
}

function extractRepoLinks(html, fullLinkInsideCards, mainURL, nameOfDir) {
    let $ = cheerio.load(html);
    let repoList = $(".px-3 .d-flex.flex-auto a");
    for (let i = 0; i < 16; i++) {
        if (i % 2 != 0) {
            var getRepoLinks = $(repoList[i]).attr("href");
            let fullRepoLink = fullLinkInsideCards + getRepoLinks;
            console.log(fullRepoLink + "❌");

            let mainRepoLink = mainURL + getRepoLinks;
            console.log(mainRepoLink + "✔️");

            getIssuesLinksFromRepo(mainRepoLink, nameOfDir);
        }
    }
    console.log("-------------------------------------------");
    console.log("-------------------------------------------");
}

function getIssuesLinksFromRepo(mainRepoLink, nameOfDir) {
    request(mainRepoLink, function(err, response, html) {
        if (err) {
            console.log("Opps its an error!😥 ", err);
        } else {
            getIssueFromTheirRepo(html, nameOfDir);
        }
    });
}

function getIssueFromTheirRepo(html, nameOfDir) {
    let $ = cheerio.load(html);
    let issueLinks = $(".js-repo-nav  a");
    let linksOfIssue = $(issueLinks[1]).attr("href");
    if (linksOfIssue.includes("/issues")) {
        console.log("-------------------------------------------");
        let fullIssueLinks = "https://github.com" + linksOfIssue;
        console.log(fullIssueLinks);

        //Making the Repo's name file
        let nameOfRepoForDir = linksOfIssue.split("/");
        let repoNameForDir = nameOfRepoForDir[2];

        let pathForRepo = path.join(__dirname, nameOfDir, repoNameForDir);
        fs.writeFileSync(pathForRepo + ".pdf", "");

        console.log(repoNameForDir);
        someIssueMentioned(fullIssueLinks, pathForRepo);
    }
}

function someIssueMentioned(fullIssueLinks, pathForRepo) {
    request(fullIssueLinks, function(err, response, html) {
        if (err) {
            console.log("Opps its an error!😥 ", err);
        } else {
            listOfIssues(html, pathForRepo);
        }
    });
}

function listOfIssues(html, pathForRepo) {
    let $ = cheerio.load(html);
    let issuesDataInRepo = $(".flex-auto.min-width-0.p-2.pr-3.pr-md-2 a.Link--primary");
    let issuesArr = [];
    for (let i = 0; i < 10; i++) {
        let issuesInRepo = $(issuesDataInRepo[i]).attr("href");
        console.log(issuesInRepo);
        issuesArr.push(issuesInRepo);

        //add issues to json file
        let issuesContent = JSON.stringify(issuesArr);
        let pdfDoc = new pdfkit;
        pdfDoc.pipe(fs.createWriteStream(pathForRepo + ".pdf"));
        pdfDoc.text(issuesContent);
        pdfDoc.end();
    }
    console.log("-------------------ISSUES NAME/ID-------------------");
    console.log("----------------------------------------------------");
}