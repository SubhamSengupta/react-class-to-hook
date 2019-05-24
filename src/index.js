const acorn = require("acorn");
const jsx = require("acorn-jsx");
const fs = require("fs");
const path = require("path");

const JSXParser = acorn.Parser.extend(jsx());

const classContent = fs.readFileSync(path.resolve(__dirname, "./Sample.js"), "utf-8");

const parsed = JSXParser.parse(classContent, {sourceType: "module"});

console.log(JSON.stringify(parsed))
