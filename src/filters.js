import { IMPORT_DECLARATION, CLASS_DECLARATION, IMPORTS, CLASSES } from "./constants";

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
