let puppeteer = require("puppeteer");

module.exports = {
    returnListOfSourceOfMemes : returnListOfSourceOfMemes
}

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