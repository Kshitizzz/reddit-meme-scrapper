# Reddit Meme Scrapper App

This script serves you fresh memes from your favorite sub, in a pdf, delivered right to your E-Mail. Avoid endless scrolling while
browsing memes and save your time while having a good laugh!

## Long Descripton

Let's be honest, we all have a tendency to endlessly scroll our favorite meme site- Reddit, while telling our colleagues that we are on a break.
It's all fun and games until you realize, oh fish, an hour has gone by! Then you stress about the pile of work you have yet to do. The problem
here aren't the memes or reddit, it's us and our willpower. We always want to be in a comfortable place until an external stimulus reminds us that we
have work to do. So, here comes the solution - **reddit_meme_scrapper**. This script is an automation-web-scrapping project, which scrappes 20-30 memes 
at once from your favorite sub-reddit, formats them in a PDF file, and then sends them right to your E-Mail. **This way you don't have to open reddit
to ultimately get lost in the spiral of endless scrolling!**

## Getting Started

* main file of this application is - **get-me-memes.js**
* launch the terminal in the same directory as the file, type ```node get-me-memes <subreddit_name> <receiver_email>```
* you can watch out for the progress on the console
* after a couple of minutes, a memes.pdf file should appear in your current directory
* memes.pdf would then be sent to the ```receiver_email```

### Prerequisites

* Please go through the dependency file - package_lock.json to install all the packages required to run this app
* Modules used:
```
nodejs - fs, path, puppeteer, nodemailer
```

## Built With

* [nodejs](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [puppeteer](https://maven.apache.org/) - Dependency Management

## Authors

* **Kshitiz Omar** - *Initial work* - [kshitizzz](https://github.com/kshitizzz)

## Acknowledgments

* Thanks to **Jasbir Singh** [Jasbir96](https://github.com/Jasbir96) for teaching me all this stuff
* Insiparation: I inspired myself, as I wanted to curb my meme consumption xD


P.S- I built this as my showcase project in a hackathon. I will make future updates to it.

