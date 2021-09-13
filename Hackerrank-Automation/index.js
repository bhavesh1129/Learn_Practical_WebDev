const puppeteer = require('puppeteer');
const codeFile = require('./codes');

console.log("Before Opening!");

let myEmail = "lomawalo@acrossgracealley.com";
let myPass = "abc1234";

const browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
});

let page;

browserPromise
    .then(function(browserObj) {
        let browserOpenPromise = browserObj.pages();
        return browserOpenPromise;
    }).then(function(newTab) {
        page = newTab[0];
        let hackerrankPromise = page.goto("https://www.hackerrank.com/auth/login");
        return hackerrankPromise;
    }).then(function() {
        let enterEmail = page.type("input[type='text']", myEmail);
        return enterEmail;
    }).then(function() {
        let enterPass = page.type("input[type='password']", myPass);
        return enterPass;
    }).then(function() {
        let clickLoginButton = page.click("button[data-analytics='LoginPassword']");
        return clickLoginButton;
    }).then(function() {
        let clickOnAlgoSection = page.waitForSelector(".track-card a[data-attr2='algorithms']", {
            visible: true,
        });
        return clickOnAlgoSection;
    }).then(function() {
        let clickOnAlgoSection = page.click(".track-card a[data-attr2='algorithms']");
        return clickOnAlgoSection;
    }).then(function() {
        let goToWarmUp = page.waitForSelector("input[value='warmup']", {
            visible: true,
        });
        return goToWarmUp;
    }).then(function() {
        let clickOnWarmUp = page.click("input[value='warmup']");
        return clickOnWarmUp;
    }).then(function() {
        let allChallengesButton = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled");
        return allChallengesButton;
    }).then(function(questionArr) {
        console.log("Number of Questions in WarmUp Page: " + questionArr.length);
        let questionSolved = questionSolver(page, questionArr[0], codeFile.answers[0]);
        return questionSolved;
    })
    .catch(function(err) {
        console.log(err);
    });

function questionSolver(page, question, answer) {
    return new Promise(function(res, rej) {
        let questionClicked = question.click();
        questionClicked.then(function() {
            let codeEditor = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return codeEditor;
        }).then(function() {
            return waitAndClick(".checkbox-wrap", page);
        }).then(function() {
            return page.waitForSelector(".custominput ");
        }).then(function() {
            return page.type(".custominput", answer);
        }).then(function() {
            let pressCTRL = page.keyboard.down('Control');
            return pressCTRL;
        }).then(function() {
            let pressA = page.keyboard.press('A', { delay: 100 });
            return pressA;
        }).then(function() {
            let pressX = page.keyboard.press('X', { delay: 100 });
            return pressX;
        }).then(function() {
            let unpressCTRL = page.keyboard.up('Control');
            return unpressCTRL;
        }).then(function() {
            let mainCodeEditor = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return mainCodeEditor;
        }).then(function() {
            let pressCTRL = page.keyboard.down('Control');
            return pressCTRL;
        }).then(function() {
            let pressA = page.keyboard.press('A', { delay: 100 });
            return pressA;
        }).then(function() {
            let pressV = page.keyboard.press('V', { delay: 100 });
            return pressV;
        }).then(function() {
            let unpressCTRL = page.keyboard.up('Control');
            return unpressCTRL;
        }).then(function() {
            let pressSubmitButton = page.click("button.hr-monaco-submit");
            return pressSubmitButton;
        }).then(function() {
            res();
        }).catch(function(err) {
            rej();
        })
    });
}

function waitAndClick(selector, currentPage) {
    return new Promise(function(res, rej) {
        let waitForModelPromise = currentPage.waitForSelector(selector);
        waitForModelPromise.then(function() {
            let clickModel = currentPage.click(selector);
            return clickModel;
        }).then(function() {
            res();
        }).catch(function(err) {
            rej();
        })
    });
}
console.log("After Opening");