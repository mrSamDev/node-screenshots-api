"use strict";
const dotenv = require("dotenv");
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV || "development";
const envFound = dotenv.config({ path: `.env.${env}` });
// if (envFound.error) throw new Error(`⚠️  Couldn't find .env.${env} file  ⚠️`);

const environmentVariables = {
  port: parseInt(process.env.PORT, 10),
  apiPrefix: "/api/v1",
  loglevel: process.env.LOG_LEVEL || "silly",
};

module.exports = environmentVariables;
