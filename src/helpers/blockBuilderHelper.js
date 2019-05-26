import escodegen from "escodegen";

export const blockBuilder = methodBlock => {
  return methodBlock.map(statement => {
    // we have to remove thisExpression, setState and state calls
    // setState call - callExpression
    // change this.state.key -> key , assignmentExpression / variableDeclaration
    // change this.func -> func,
     switch(statement.type) {
      case "ExpressionStatement":
        return buildExpression(statement.expression);

      case "VariableDeclaration":
        return buildDeclaration(statement.declarations);

      default:
        return escodegen.generate(statement);
     }
  });
}

const buildExpression = expression => {
  switch(expression.type) {
    case "callExpression":
      return buildCallExpression(expression);
  }
}

const buildCallExpression = expression => {
  switch(expression.callee.type) {
    case "MemberExpression":
      return buildCallMemberExpression(expression);

    case "Identifier":
      return buildCallIdentifier(expression);
  }
}

const buildCallMemberExpression = expression => {
  const calleeObj = expression.callee.object;
  const calleeProp = expression.callee.property;
  const args = expression.arguments;

  // handle setState
  const isSetState = checkIfSetState(calleeObj, calleeProp);
  if(isSetState) {
    expression = convertSetState(expression);
  }
}

const buildCallIdentifier = expression => {

}

const buildDeclaration = declarations => {

}

const checkIfSetState = (calleeObj, calleeProp) =>
  calleeObj.type === "ThisExpression" && calleeProp.name === "setState";


const convertSetState = expression => {
  const arg = expression.arguments.properties;
  const props = arg.map(row => {
    switch(row.type) {
      case "SpreadElement":

      case "Property":
    }
  });
}
