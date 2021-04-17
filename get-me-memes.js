let puppeteer = require('puppeteer');
let fs = require('fs');
let path = require('path');
let pdfDocument = require('pdfkit');
let {saveToPDF} = require("./saveToPDF.js");
let {returnListOfSourceOfMemes} = require("./getSourceLinks.js");
let {takeScreenshotAndSaveToFolder} = require("./screenshotAndSave.js");

let memeSubReddit = process.argv.slice(2)[0];

(async function(){
    let browserInstance = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized", "-disable-notifications"]
    });
    let newPage = await browserInstance.newPage();
    await newPage.goto("https://www.reddit.com");
    await Promise.all([await newPage.waitForSelector("#header-search-bar", {visible : true}),
        await newPage.type("#header-search-bar", "r/memes", {delay : 200}),
        await newPage.click("#header-search-bar"),
        await newPage.waitForSelector('a[class="_20OHBqoDD71_8fv7tuG6u6 _3NseKdP3_1HONmKk_kK3_l XEkFoehJNxIH9Wlr5Ilzd "]', {visible : true}),
        await newPage.click('a[class="_20OHBqoDD71_8fv7tuG6u6 _3NseKdP3_1HONmKk_kK3_l XEkFoehJNxIH9Wlr5Ilzd "]'),
        await newPage.waitForSelector('a[class = "M2Hk_S2yvXpsNPfZMBMur _1s79QnBguPbckxiiPvFXGP _2iuoyPiKHN3kfOoeIQalDT _3zbhtNO0bdck0oYbYRhjMC HNozj_dKjQZ59ZsfEegz8 "]',
        {visible : true})
    ]);

    let currentSubUrl = newPage.url();
    let randomCounter = 0;
    let sortByWhatFlag;
    while(true){
        sortByWhatFlag = Math.floor((Math.random() * 4) + 1);
        if(++randomCounter == 10) break; // to emulate multiple random events to enable distince filter operation
    }
    let ifTopThenSortByWhatFlag;
    randomCounter = 0;
    while(true){
        ifTopThenSortByWhatFlag = Math.floor((Math.random() * 6) + 1);
        if(++randomCounter == 10) break; // to emulate multiple random events to enable distince filter operation
    }

    switch(sortByWhatFlag){
        case 1:
            currentSubUrl = currentSubUrl + "hot";
            break;
        case 2:
            currentSubUrl = currentSubUrl + "new";
            break;
        case 3: 
            currentSubUrl = currentSubUrl + "rising";
            break;
        case 4: 
            if(ifTopThenSortByWhatFlag == 1) currentSubUrl += "top/?t=hour";
            else if(ifTopThenSortByWhatFlag == 2) currentSubUrl += "top/?t=day"; 
            else if(ifTopThenSortByWhatFlag == 3) currentSubUrl += "top/?t=week";
            else if(ifTopThenSortByWhatFlag == 4) currentSubUrl += "?t=month";
            else if(ifTopThenSortByWhatFlag == 5) currentSubUrl += "?t=year";
            else if(ifTopThenSortByWhatFlag == 6) currentSubUrl += "?t=hour";
            break; 
        default:
    }
    await newPage.goto(currentSubUrl, {waitUntil : "networkidle2"}); // to filter the page randomly
    console.log("Page Loaded");
    let listOfSourceOfMemes = await returnListOfSourceOfMemes(newPage, 'div > img[alt = "Post image"]');
    await takeScreenshotAndSaveToFolder(newPage, listOfSourceOfMemes, "C:/Users/kshit/Desktop/reddit-meme-scrapper/memes/");
    await saveToPDF("./memes");
    await browserInstance.close();
})();  




