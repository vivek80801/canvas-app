//@ts-check
const { ServerResponse } = require("http");
const { readFile } = require("fs");

/**
 * @param {string} filename
 * @param {ServerResponse} res
 */
const readHtmlFile = (filename, res) => {
  const newFileName = "/views/" + filename + ".html";
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

module.exports = { readHtmlFile };
