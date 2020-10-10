const puppeteer = require("puppeteer");
const takeScreenShot = async (options) => {
  let browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  let page = await browser.newPage();

  const isDownloadFormatPdf = options.format === "pdf";
  if (!isDownloadFormatPdf && options.dimensions) await page.setViewport(options.dimensions);
  await page.goto(options.url, { waitUntil: "networkidle2" });
  if (isDownloadFormatPdf) await page.pdf({ path: options.path, format: options.dimensions.pdfFormat });
  else await page.screenshot({ path: options.path, type: options.format, fullPage: true });
  await page.close();
  await browser.close();
};

module.exports = takeScreenShot;
