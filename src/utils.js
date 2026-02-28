function sortByName(todos) {
  // localeCompare allows for correct sorting of words in any language, and the
  // "base" sensitivity option treats uppercase, lowercase, and accents the same.
  return todos.toSorted((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
  );
}

function sortByPriority(todos) {
  return todos.toSorted((a, b) => a.priority - b.priority);
}
