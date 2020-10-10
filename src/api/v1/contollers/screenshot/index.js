const cache = require("../../../../lib/cache");
const fs = require("fs");
const path = require("path");
const dir = path.resolve();
const takeScreenShot = require("../../utils/puppeter");
const getScreenShot = async (req, res) => {
  const options = req.body;
  const fileName = `${options.name}.${options.extension}`;
  const path = `./pdfs/${fileName}`;
  await takeScreenShot({ ...options, path });
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
