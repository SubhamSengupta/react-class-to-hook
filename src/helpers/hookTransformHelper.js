import { blockBuilder } from "./blockBuilderHelper";

export const transformToHook = lifecycleMethods => {
  return lifecycleMethods.map(method => {
    switch(method.key.name) {
      case "componentDidMount":
        return buildComponentDidMountHook(method);
    }
  })
}

const buildComponentDidMountHook = method => {
  const methodBlock = method.value.body.body;
  return blockBuilder(methodBlock).join("\n");
}
