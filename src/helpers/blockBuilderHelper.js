import escodegen from "escodegen";

export const blockBuilder = methodBlock => {
  return methodBlock.map(statement => {
    return escodegen.generate(statement);
  });
}
