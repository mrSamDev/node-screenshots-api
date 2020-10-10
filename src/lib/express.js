"use strict";
const bodyParser = require("body-parser");
const cors = require("cors");
const httpStatus = require("http-status");
const express = require("express");
const config = require("../config");
const routes = require("../api/v1");
const { errors } = require("celebrate");
const { EventEmitter } = require("events");
const profiles = new EventEmitter();
profiles.on("route", ({ req, elapsedMS }) => {});

const expressApp = ({ app }) => {
  app.use(function profilerMiddleware(req, res, next) {
    const start = Date.now();
    res.once("finish", () => {
      profiles.emit("route", { req, elapsedMS: Date.now() - start });
    });
    next();
  });

  app.use(bodyParser.json({}));

  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  app.get(config.apiPrefix + "/status", (req, res) => res.status(httpStatus.OK).send("Up!"));

  routes.forEach((route) => {
    app.use(config.apiPrefix, route);
  });

  app.use(errors());

  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = httpStatus.NOT_FOUND;
    next(err);
  });

  app.use((err, req, res, next) => {
    console.log({ err });
    return res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: err.message,
    });
  });
};

module.exports = expressApp;
