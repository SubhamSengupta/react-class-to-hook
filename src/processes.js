import { processImports } from "./helpers/importCreationHelper";
import { processClasses } from "./helpers/classCreationHelper";

export const processAST = actualAST => {
  // process imports
  const actualImports = actualAST.imports || [];
  const processedImports = processImports(actualImports);
  // process classes
  const classes = actualAST.classes || [];
  const functionalComponents = processClasses(classes);
  // console.log(functionalComponents);
  return {
    imports: processedImports,
    components: functionalComponents
  };
}
