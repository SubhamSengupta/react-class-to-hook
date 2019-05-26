import { IMPORT_DECLARATION, CLASS_DECLARATION, IMPORTS, CLASSES, CONSTRUCTOR, METHOD, REACT_LIFECYCLE_METHODS } from "./constants";

export const filterSections = (body, type) => body.filter(section => section.type === type);

export const categorize = parsed => {
  const body = parsed.body && Array.isArray(parsed.body) ? parsed.body : [];
  const parts = {};

  // imports
  parts[IMPORTS] = filterSections(body, IMPORT_DECLARATION);
  // classes
  parts[CLASSES] = filterSections(body, CLASS_DECLARATION);

  return parts;
}

export const filterClassConstructor = classBody => {
  const filtered = classBody.filter(item => item.kind === CONSTRUCTOR);
  return filtered.length ? filtered[0] : null;
}

export const filterClassMethods = classBody =>
  classBody.filter(item => item.kind === METHOD);

export const filterLifecycle = classMethods =>
  classMethods.filter(method => REACT_LIFECYCLE_METHODS.includes(method.key.name));
