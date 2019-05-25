import fs, { mkdirSync } from "fs";
import path from "path";

const TARGET_DIR = path.resolve(__dirname, "./generated/");
const OUTPUT_PATH = path.resolve(TARGET_DIR, "output.js");

export const createFile = modifiedAST => {
  const importDeclarations = modifiedAST.imports || "";

  if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR);
  fs.writeFileSync(OUTPUT_PATH, importDeclarations, "utf-8");
}
