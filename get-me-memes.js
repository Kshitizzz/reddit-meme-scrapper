// scrape the memes from reddit from your desired meme sub reddit
// format them in a pdf file, maybe send it to user's mail

let puppeteer = require('puppeteer');
let fs = require('fs');
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
    let sortByWhatFlag = Math.floor((Math.random() * 4) + 1);
    let ifTopThenSortByWhatFlag = Math.floor((Math.random() * 6) + 1);
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
    await saveToFolder(newPage, listOfSourceOfMemes, "C:/Users/kshit/Desktop/reddit-meme-scrapper/memes/");
})();  


async function returnListOfSourceOfMemes(page, selector){
    await page.waitForSelector('div > img[alt = "Post image"]', {visible : true});
    function runOnConsole(selector){
        let listOfImageElements = document.querySelectorAll(selector);
        let sourceList = []; 
        for(let imageElement of listOfImageElements){

            sourceList.push(imageElement.getAttribute('src'));
        }
        return sourceList;
    }
    return page.evaluate(runOnConsole, selector)
}

async function saveToFolder(page, srcList, destination){
    let counter = 1;
    for(let src of srcList){
        let viewSource = await page.goto(src);
        fs.writeFile(destination+"meme"+ counter++ + ".png", await viewSource.buffer(), err => {
        if (err) return console.log(err);
        console.log("Meme Saved!");
    })
    }
}