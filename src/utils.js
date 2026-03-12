import {
  compareAsc,
  isToday,
  isTomorrow,
  isAfter,
  isBefore,
  endOfWeek,
  format,
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
  return todos.filter((todo) => isToday(todo.dueDate));
}

function filterByThisWeek(todos) {
  return todos.filter((todo) => isThisWeek(todo.dueDate));
}

function filterByPriority(todos, priority) {
  return todos.filter((todo) => todo.priority === priority);
}

function isThisWeek(dueDate) {
  let today = new Date();

  return (
    (isToday(dueDate) || isAfter(dueDate, today)) &&
    isBefore(dueDate, endOfWeek(today, { weekStartsOn: 1 }))
  );
}

function formatDate(date) {
  if (isToday(date)) {
    return `Today ${format(date, "HH:mm")}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow ${format(date, "HH:mm")}`;
  } else if (isThisWeek(date)) {
    return format(date, "cccc HH:mm");
  } else {
    return format(date, "LLL dd HH:mm");
  }
}

export {
  sortByName,
  sortByDueDate,
  sortByPriority,
  filterByToday,
  filterByThisWeek,
  formatDate,
};
