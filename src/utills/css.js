//@ts-check
const { ServerResponse } = require("http");
const { readFile } = require("fs");

/**
 * @param {string} filename
 * @param {ServerResponse} res
 */

const readCssFile = (filename, res) => {
  const newFileName = "/public/css/" + filename + ".css";
  readFile(__dirname.replace("/src/utills", newFileName), (err, data) => {
    if (err) {
      res.write(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
};

module.exports = { readCssFile };
