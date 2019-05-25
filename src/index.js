const acorn = require("acorn");
import jsx from "acorn-jsx";
import fs from "fs";
import path from "path";
import { filterSections } from "./filters";
import { IMPORT_DECLARATION, CLASS_DECLARATION, IMPORTS, CLASSES } from "./constants";

const JSXParser = acorn.Parser.extend(jsx());

const categorize = parsed => {
  const body = Array.isArray(parsed.body) ? parsed.body : [];
  const parts = {};

  // imports
  parts[IMPORTS] = filterSections(body, IMPORT_DECLARATION);
  // classes
  parts[CLASSES] = filterSections(body, CLASS_DECLARATION);
  return parts;
}



const process = () => {
  // read file content
  const fileContent = fs.readFileSync(path.resolve(__dirname, "./Sample.js"), "utf-8");

  // parse file
  const parsed = JSXParser.parse(fileContent, {sourceType: "module"});

  // console.log(JSON.stringify(parsed));

  // divide into parts
  const parts = categorize(parsed);
  console.log(parts);
}


process();
