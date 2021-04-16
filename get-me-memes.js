// scrape the top memes from reddit from your desired meme sub reddit
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
    await newPage.goto(currentSubUrl + "top"); // to sort the page by top memes from today
    // now scrape the current image
    // scroll down to the next image > repeat step - 1
    // have to figure out scraping an image 
    // have to figure out how to save image in the pdf file
    // have to figure out scrolling
})();  


async function returnTopFilterClickLink(page, selector){
    function runOnConsole(selector){
        let topFilterUrl = document.querySelector(selector).href;
        return topFilterUrl;
    }
    return page.evaluate(runOnConsole, selector)
}