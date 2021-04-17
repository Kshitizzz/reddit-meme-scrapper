let nodemailer = require('nodemailer');
let {email, password} = require("./crediantials.js");

module.exports = {
    sendMail : sendMail
}


async function sendMail(attachmentPath, receiver1) {
    let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: email, 
        pass: password
        }
    });
    
    let bodyText =`
    Heyo


    Here's your daily dose of memes. Enjoy!
    Sent by reddit-scrapper-bot made with love by Kshitiz!


    Later!
    `

    let bodyHtml = `
    <b>Heyo</b>


    <br>Here's your daily dose of memes. Enjoy!
    Sent by reddit-scrapper-bot made with love by Kshitiz!


    Later! </br>
    `

    let toSend = await transporter.sendMail({
      from: "kshitiz.omar.16ece@bml.edu.in", // sender address
      to: receiver1, // list of receivers
      subject: "Piping Hot Memes Served Right In Your Inbox!", // Subject line
      text: bodyText, 
      html: bodyHtml, 
      attachments : [
          {
              filename : "memes.pdf",
              path : attachmentPath
          }
      ] 
    }, (err, data) => {
        if(err) console.log(err);
        else console.log(data);
        });
};

