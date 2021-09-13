const puppeteer = require('puppeteer');

let page;
console.log("Before Opening");

const browserPromise = puppeteer.launch({
    headless: false,
    slowMo: true,
    defaultViewport: null,
    args: ["--start - maximized"]
});

browserPromise.then(function(browser) {
    const pagesArrPromise = browser.pages();
    return pagesArrPromise;

}).then(function(browserPages) {
    //open the google in first tab/page opened
    page = browserPages[0];
    let gotoPromise = page.goto("https://www.google.com/");
    return gotoPromise;

}).then(function() {
    //waiting for the element to appear on the page
    let elementWaitPromise = page.waitForSelector("input[type='text']", {
        visible: true
    });
    return elementWaitPromise;

}).then(function() {
    //type the given text, website or url (indentification by using selectors)
    let keyboardPromise = page.type("input[type='text']", "Folware");
    return keyboardPromise;

}).then(function() {
    //pressed the enter key on the keyboard after writing the text
    let enterPressed = page.keyboard.press("Enter");
    return enterPressed;

}).then(function() {
    //type the given text, website or url (indentification by using selectors)
    let elementWaitPromise = page.waitForSelector(".tF2Cxc h3", {
        visible: true
    });
    return elementWaitPromise;

}).then(function() {
    //mouse click on first selected selector
    let mouseClickPromise = page.click(".tF2Cxc h3");
    return mouseClickPromise;

}).catch(function(error) {
    //caught an error
    console.log(error);
});

console.log("After Opening");