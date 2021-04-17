let fs = require('fs');
let path = require('path')
let pdfDocument = require('pdfkit');

async function saveToPDF(dirPath){

    let pdfDoc = new pdfDocument({size : 'A4'});
    pdfDoc.font('Times-Roman').fontSize(40).fillColor('black').text('Piping Hot Memes', 
    {align : 'center', valign : 'center'});
    pdfDoc.pipe(fs.createWriteStream('./memes.pdf'));
    console.log("Source Created");
    let memes =  await fs.promises.readdir(dirPath);
    for(let meme of memes){
        console.log(meme);
        await pdfDoc.addPage().image(path.join(dirPath, meme), {width:500, height:500}); 
    }
    pdfDoc.end();
}

module.exports = {
    saveToPDF : saveToPDF
}