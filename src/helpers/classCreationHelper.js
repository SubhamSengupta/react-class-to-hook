import { ASSIGNMENT_EXPR, STATE } from "../constants";
import { filterClassConstructor, filterClassMethods, filterLifecycle } from "../filters";
import { transformToHook } from "./hookTransformHelper";

export const processClasses = classes => {
  const modifiedClasses = classes.map(classItem => {
    const classBody = classItem.body.body || [];
    const classConstructor = filterClassConstructor(classBody);
    const lifeCycleMethods = extractLifecycleMethods(classBody);
    const renderer = extractClassRenderer(classBody);

    // get initial state from constructor
    const initialStates = getInitialStateFromConstructor(classConstructor);
    const stateHooks = createStateHooks(initialStates);
    return {
      name: classItem.id.name,
      stateHooks,
      useEffectHooks: lifeCycleMethods
    }
  });

  return createFunctional(modifiedClasses);
}

const createFunctional = classes => {
  return classes.map(classItem => {
    let lines = [`const ${classItem.name} = props => {`];
    lines.push(classItem.stateHooks);
    lines.push(classItem.useEffectHooks);
    return lines.join("\n\t") + "\n}";
  }).join("\n\n");
}

const createStateHooks = initialStates => {
  if (!initialStates) return "";
  return initialStates.map(state => `const [${state.key}, ${"set" + state.key}] = useState(${state.value});`)
    .join("\n");
}

const getInitialStateFromConstructor = classConstructor => {
  if(!classConstructor) return null;
  const value = classConstructor.value || {};
  const statements = value.body.body || [];
  let assignments = statements.filter(statement => statement.expression.type === ASSIGNMENT_EXPR);
  assignments = assignments.map(assignment => assignment.expression);
  let stateAssignment = assignments.filter(expression => expression.left.property.name === STATE);
  stateAssignment = stateAssignment.length
    ? stateAssignment[0].right.properties
    : [];

  return stateAssignment.map(row => ({key: row.key.name, value: row.value.raw}));
}



const extractLifecycleMethods = classBody => {
  const classMethods = filterClassMethods(classBody);
  const lifecycleMethods = filterLifecycle(classMethods);
  return transformToHook(lifecycleMethods);
}

const extractClassRenderer = classBody => {

}
