require("./src/config");
const express = require("express");
const loaders = require("./src/lib");
const chalk = require("chalk");
const cluster = require("cluster");
const fs = require("fs");
async function startServer() {
  const dir = "./pdfs";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log("DIRECTORY");
  }
  const app = express();
  await loaders({ app });
  const PORT = process.env.PORT || 7001;
  app.listen(PORT, (err) => {
    if (err) {
      console.log("err: ", err);
      return process.exit(1);
    }
    console.log(
      chalk.red(`
    ################################################
    🛡️ Screen shot Server listening on port: ${PORT} 🛡️ 
    ################################################
  `)
    );
  });
}

if (cluster.isMaster) {
  var numWorkers = require("os").cpus().length;

  console.log("Master cluster setting up " + numWorkers + " workers...");

  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("online", function (worker) {
    console.log("Worker " + worker.process.pid + " is online");
  });

  cluster.on("exit", function (worker, code, signal) {
    console.log(
      "Worker " +
        worker.process.pid +
        " died with code: " +
        code +
        ", and signal: " +
        signal
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  startServer();
}
