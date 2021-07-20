//@ts-check

const { createServer } = require("http");
const { readHtmlFile } = require("./utills/html");
const { readCssFile } = require("./utills/css");
const { readJsFile } = require("./utills/javascript");

const app = createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    readHtmlFile("index", res);
  } else if (req.url === "/style.css" && req.method === "GET") {
    readCssFile("style", res);
  } else if (req.url === "/main.js" && req.method === "GET") {
    readJsFile("main", res);
  } else if (req.url === "/entities.js" && req.method === "GET") {
    readJsFile("entities", res);
  } else if (req.url === "/pingpong" && req.method === "GET") {
    readHtmlFile("pingpong", res);
  } else if (req.url === "/pingpong.js" && req.method === "GET") {
    readJsFile("pingpong", res);
  } else if (req.url === "/pingpong.css" && req.method === "GET") {
    readCssFile("pingpong", res);
  } else {
    readHtmlFile("404", res);
  }
});

module.exports = { app };
