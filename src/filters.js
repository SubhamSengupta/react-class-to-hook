export const filterSections = (body, type) => {
  return body.filter(section => section.type === type);
}
