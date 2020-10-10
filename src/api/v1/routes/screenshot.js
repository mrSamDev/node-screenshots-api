const express = require("express");
const router = express.Router();
const controllers = require("../contollers/screenshot");
const runAsyncWrapper = require("../utils/tryCatch");
const validations = require("../middleware/validations");

router.post("/screen-shot", validations.screenShot, runAsyncWrapper(controllers.getScreenShot));

module.exports = router;
