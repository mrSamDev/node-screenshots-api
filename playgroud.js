const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'hn.pdf', format: 'A4'});
//playgroud
  await browser.close();
})();

// const isDownloadFormatPdf = options.format === "pdf";
// const cacheName = `${fileName}.${isDownloadFormatPdf ? `${options.dimensions && options.dimensions.pdfFormat}.` : ``}${options.dimensions.width}.${options.dimensions.height}`;
// const index = cache.keys().indexOf(cacheName);
// console.log('index: ', index);
// if (index > -1) return sendData(fileName, res);
// cache.set(cacheName, true, 10000);