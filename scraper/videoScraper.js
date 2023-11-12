const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

async function scrapeVideoUrls(url) {
  puppeteer.use(StealthPlugin())
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox','--single-process','--no-zygote'],
  defaultViewport: null,
  ignoreHTTPSErrors: true,
  headless: true,
  executablePath:process.env.PUPPETEER_EXECUTABLE_PATH
  })
  const page = await browser.newPage()
 // await page.setViewport({ width: 1920, height: 1080 });
  await page.setJavaScriptEnabled(true);
  //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

  await page.goto(url)
    const title = await page.title()
    console.log('page title',title);
  await page.screenshot({path:'example.png'})
  await page.waitForSelector('video',{timeout:0})
  const html = await page.content()
  console.log('pagehtml',html);
  const videoUrls = await page.evaluate(() => {
    const videoElements = Array.from(document.querySelectorAll('video source, video'));
    return videoElements.map(element => {
      if (element.tagName === 'SOURCE') {
        return element.getAttribute('src');
      } else if (element.tagName === 'VIDEO') {
        return element.getAttribute('src');
      }
      return null; // handle other cases if needed
    }).filter(src => src !== null);
  });

  
  console.log('videoUrls',videoUrls);
  
  
  await browser.close();
  return videoUrls
}

module.exports = scrapeVideoUrls;