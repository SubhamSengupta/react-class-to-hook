import {IMPORT_DEFAULT_SPECIFIER} from "../constants"

export const processImports = actualImports => {
  // not modifying anything now, print as it is
  return actualImports.map(importItem => createImport(importItem)).join("\n");
}

const createImport = importItem => {
  let base = ["import"];
  const specifiers = getSpecifiersFromImport(importItem);
  base.push(specifiers.defaultSpecifier || "");
  const groupedNamedSpecifiers = specifiers.namedSpecifiers.length
    ? "{ " + specifiers.namedSpecifiers.join(", ") + " }"
    : "";
  if (groupedNamedSpecifiers) base.push(",");
  base.push(groupedNamedSpecifiers);
  base.push("from");
  base.push(specifiers.source)

  return base.join(" ") + ";";
}

const getSpecifiersFromImport = item => {
  if(!item.specifiers) return {};

  let defaultSpecifier;
  let namedSpecifiers = [];

  item.specifiers.forEach(specifier => {
    if (specifier.type === IMPORT_DEFAULT_SPECIFIER) {
      defaultSpecifier = specifier.local.name;
    } else {
      let namedSpec = getNamedSpecifier(specifier);
      namedSpecifiers.push(namedSpec);
    }
  })

  return {
    defaultSpecifier,
    namedSpecifiers,
    source: item.source.raw
  };
}

const getNamedSpecifier = specifier => {
  const imported = specifier.imported.name;
  const local = specifier.local.name;
  return imported === local ? imported : `${imported} as ${local}`;
}
