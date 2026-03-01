import {
  compareAsc,
  isToday,
  parseISO,
  isAfter,
  isBefore,
  endOfWeek,
} from "date-fns";

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

function sortByDueDate(todos) {
  return todos.toSorted((a, b) => compareAsc(a.dueDate, b.dueDate));
}

function filterByToday(todos) {
  return todos.filter((todo) => isToday(parseISO(todo.dueDate)));
}

function filterByThisWeek(todos) {
  return todos.filter((todo) => isThisWeek(parseISO(todo.dueDate)));
}

function filterByPriority(todos, priority) {
  return todos.filter((todo) => todo.priority === priority);
}

function isThisWeek(dueDate) {
  let today = new Date();

  return (
    (isToday(dueDate) || isAfter(dueDate, today)) &&
    isBefore(dueDate, endOfWeek(today))
  );
}
