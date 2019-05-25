import fs from "fs";
import path from "path";

const TARGET_DIR = path.resolve(__dirname, "./generated/");
const OUTPUT_PATH = path.resolve(TARGET_DIR, "output.js");

export const createFile = modifiedAST => {
  const importDeclarations = modifiedAST.imports || "";
  const componentDeclarations = modifiedAST.components || [];
  const newTemplate = createFileFromTemplate(importDeclarations, componentDeclarations);
  if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR);
  fs.writeFileSync(OUTPUT_PATH, newTemplate, "utf-8");
}

const createFileFromTemplate = (importDeclarations, componentDeclarations) => {
  return (`${importDeclarations} \n\n${componentDeclarations}`);
}
