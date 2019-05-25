const acorn = require("acorn");
import jsx from "acorn-jsx";
import fs from "fs";
import path from "path";
import { categorize } from "./filters";
import { processAST } from "./processes";
import { createFile } from "./fileHandler";

const JSXParser = acorn.Parser.extend(jsx());

const process = () => {
  // read file content
  const fileContent = fs.readFileSync(path.resolve(__dirname, "./Sample.js"), "utf-8");
  // parse file
  const parsed = JSXParser.parse(fileContent, {sourceType: "module"});
  // console.log(JSON.stringify(parsed));
  // divide into parts
  const parts = categorize(parsed);
  // transform to hooks
  const modifiedAST = processAST(parts);
  console.log(modifiedAST);
  // create file
  createFile(modifiedAST);
}


process();
