const expressLoader = require("./express");
const cache = require("./cache");

module.exports = async ({ app }) => {
  try {
    expressLoader({ app });
  } catch (error) {
    throw error;
  }
};
