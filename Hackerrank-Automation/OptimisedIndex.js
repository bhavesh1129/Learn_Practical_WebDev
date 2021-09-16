// Optimised code by using Async Await

const puppeteer = require('puppeteer');
const codeFile = require('./codes');

console.log("Before Opening!");

let myEmail = "lomawalo@acrossgracealley.com";
let myPass = "abc1234";


(async function() {
    try {
        const browserPromise = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
        });
        let newTab = await browserPromise.newPage();
        await newTab.goto("https://www.hackerrank.com/auth/login");
        await newTab.type("input[type='text']", myEmail, { delay: 50 });
        await newTab.type("input[type='password']", myPass, { delay: 50 });
        await newTab.click("button[data-analytics='LoginPassword']");
        await waitAndClick(".track-card a[data-attr2='algorithms']", newTab);
        await waitAndClick("input[value='warmup']", newTab);
        let allChallengesButton = await newTab.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled");
        console.log("Number of Questions in WarmUp Page: " + allChallengesButton.length);
        let questionSolved = await questionSolver(newTab, allChallengesButton[0], codeFile.answers[0]);
        return questionSolved;
    } catch (error) {
        console.log(error);
    }
})()

async function waitAndClick(selector, currentPage) {
    await currentPage.waitForSelector(selector);

    let selectorClicked = currentPage.click(selector);
    return selectorClicked;
}

async function questionSolver(page, question, answer) {

    await question.click();
    let codeEditor = await waitAndClick(".monaco-editor.no-user-select.vs", page);
    await waitAndClick(".checkbox-wrap", page);
    await page.waitForSelector(".custominput");
    await page.type(".custominput", answer);
    let pressCTRL = await page.keyboard.down('Control');
    let pressA = await page.keyboard.press('A', { delay: 100 });
    let pressX = await page.keyboard.press('X', { delay: 100 });
    let unpressCTRL = await page.keyboard.up('Control');
    let mainCodeEditor = await waitAndClick(".monaco-editor.no-user-select.vs", page);
    let pressCTRL2 = await page.keyboard.down('Control');
    let pressA2 = await page.keyboard.press('A', { delay: 100 });
    let pressV = await page.keyboard.press('V', { delay: 100 });
    let unpressCTRL2 = await page.keyboard.up('Control');
    let pressSubmitButton = await page.click("button.hr-monaco-submit");
    return pressSubmitButton;
}