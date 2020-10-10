const cache = require("../../../../lib/cache");
const fs = require("fs");
const path = require("path");
const dir = path.resolve();
const takeScreenShot = require("../../utils/puppeter");

const trimText = (string) => {
  const length = 80;
  if (string.length > length) return string.substring(0, length - 3)
  return string;
};

const getScreenShot = async (req, res) => {
  const options = req.body;
  const isDownloadFormatPdf = options.format === "pdf";
  const fileName = `${options.name}.${options.extension}`;
  const cacheName = `${trimText(fileName)}.${isDownloadFormatPdf ? `${options.dimensions && options.dimensions.pdfFormat}.` : ``}${options.dimensions.width}.${options.dimensions.height}`;
  console.log('cacheName: ', cacheName);
  const index = cache.keys().indexOf(cacheName);
  console.log('index: ', index);
  console.log('index: ', index);
  if (index > -1) return sendData(fileName, res);
  const path = `./pdfs/${fileName}`;
  await takeScreenShot({ ...options, path });
  cache.set(cacheName, true, 10000);
  return sendData(fileName, res);
};

const sendData = (path, res) => {
  fs.readFile(dir + "/pdfs/" + path, function (err, data) {
    if (err) throw err;
    res.setHeader("Content-Disposition", `attachment; filename=${path}`);
    res.setHeader("Content-Transfer-Encoding", "binary");
    res.setHeader("Content-Type", "application/octet-stream");
    return res.send(Buffer.from(data, "binary"));
  });
};

module.exports = { getScreenShot };
