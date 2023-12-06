const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

async function scrapeVideoUrls(url) {
  puppeteer.use(StealthPlugin())
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox','--single-process','--no-zygote'],
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    headless: true,
    executablePath:process.env.PUPPETEER_EXECUTABLE_PATH,
    waitForInitialPage: true
  })
  const page = await browser.newPage()
  // await page.setViewport({ width: 1920, height: 1080 });
  await page.setJavaScriptEnabled(true);
  //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
  
  await page.goto(url,{timeout:15000})
  const title = await page.title()
  console.log('page title',title);
  //await page.screenshot({path:'example.png'})
  let videoUrls = []
  if(url.includes('mazwai.com')){ //wait for img tag for mazwai because there is no video selector
    if(url.includes('mazwai.com/video')){ //wait for video tag on single video page.
      await page.waitForSelector('video',{timeout: 10000})
    }
    else {
      await page.waitForSelector('img',{timeout: 10000})
    }
  }
  else { //wait for video tag for all other websites
    await page.waitForSelector('video',{timeout:12000})
  }
  //const html = await page.content()
  //console.log('pagehtml',html);
  if (url.includes('freepik.com')) {
    videoUrls = await getUrlFromSourceTagWithDataSrc(page)
  }
  else if(url.includes('pexels.com')) {
    videoUrls = await getUrlFromSourceTagWithSrc(page)
  }
  else if(url.includes('videezy.com')) {
    videoUrls = await getUrlFromSourceTagWithSrc(page)
  }
  else if(url.includes('mixkit.co')){
    videoUrls = await getUrlFromVideoTagWithSrc(page)
  }
  else if(url.includes('coverr.co')){
    videoUrls = await getUrlFromVideoTagWithSrc(page)
  }
  else if(url.includes('mazwai.com')){
    if(url.includes('mazwai.com/video')){
      videoUrls = await getUrlFromSourceTagWithSrc(page) 
    }
    else {
      videoUrls = await getUrlFromImgTagWithDataVideoSource(page)
    }
  }
  
  await browser.close();

  return videoUrls
}

async function getUrlFromSourceTagWithDataSrc(page) { 
  const videoUrls = await page.evaluate(() => {
    const videoElements = Array.from(document.querySelectorAll('video source, video'));
    return videoElements.map(element => {
      if (element.tagName === 'SOURCE') {
        return element.getAttribute('data-src');
      }
      return null;
    }).filter(src => src !== null);
  });
  return videoUrls
}

async function getUrlFromSourceTagWithSrc(page){ 
  const videoUrls = await page.evaluate(() => {
    const videoElements = Array.from(document.querySelectorAll('video source, video'));
    return videoElements.map(element => {
      if (element.tagName === 'SOURCE') {
        return element.getAttribute('src');
      }
      return null;
    }).filter(src => src !== null);
  });
  return videoUrls
}


async function getUrlFromVideoTagWithSrc(page){ 
  const videoUrls = await page.evaluate(() => {
    const videoElements = Array.from(document.querySelectorAll('video source, video'));
    return videoElements.map(element => {
      if (element.tagName === 'VIDEO') {
        return element.getAttribute('src');
      }
      return null;
    }).filter(src => src !== null);
  });
  return videoUrls
}

async function getUrlFromImgTagWithDataVideoSource(page){ 
  const videoUrls = await page.evaluate(() => {
    const videoElements = Array.from(document.querySelectorAll('img'));
    return videoElements.map(element => {
      if (element.tagName === 'IMG') {
        return element.getAttribute('data-video-source');
      }
      return null;
    }).filter(src => src !== null);
  });
  return videoUrls
}


module.exports = scrapeVideoUrls;