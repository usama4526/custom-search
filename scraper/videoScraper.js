const puppeteer = require('puppeteer-core')
async function scrapeVideoUrls(url) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox','--single-process','--no-zygote','--remote-debugging-port=9222'],
  defaultViewport: null,
  ignoreHTTPSErrors: true,
  headless: false,
  executablePath: process.env.NODE_ENV==='development' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
  })
  const page = await browser.newPage()
 // await page.setViewport({ width: 1920, height: 1080 });
  await page.setJavaScriptEnabled(true);
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

  await page.goto(url)
  await page.waitForSelector('video',{timeout:0})
  //await page.screenshot({path:'example.png'})
  //const html = await page.content()
  //console.log(html);
  const videoUrls = await page.evaluate(() => {
    const videoElements = Array.from(document.querySelectorAll('video source'));
    return videoElements.map(source => source.getAttribute('src'));
  });
  
 console.log(videoUrls);
  

  await browser.close();
  return videoUrls
}

module.exports = scrapeVideoUrls;