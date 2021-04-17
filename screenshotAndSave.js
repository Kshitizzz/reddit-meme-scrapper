let fs = require('fs');
let path = require('path');
let puppeteer = require("puppeteer");

module.exports = {
    takeScreenshotAndSaveToFolder : takeScreenshotAndSaveToFolder
}


async function takeScreenshotAndSaveToFolder(page, srcList, destination){
    let counter = 1;
    for(let src of srcList){
        let memeFilePath = path.join(destination, "meme" + counter++ + ".PNG");
        await page.goto(src, {waitUntil : "networkidle2"});
        await page.screenshot(
            {path : memeFilePath,
            clip : {x:500, y:0, width:1100, height:990}
        });
    }
}