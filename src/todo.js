import { projects, addNewProject } from "./project.js";
import { getFromLocalStorage, saveToLocalStorage } from "./storage.js";

const todos = getFromLocalStorage("todos") || [];

class Todo {
  constructor(title, description, dueDate, priority, project, completed) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.completed = completed;
  }
}

function addNewTodo(title, description, dueDate, priority, project, completed) {
  let newTodo = new Todo(
    title,
    description,
    dueDate,
    priority,
    project,
    completed,
  );

  let projectExists = projects.some(
    (project) => project.name === newTodo.project,
  );

  if (!projectExists) {
    addNewProject(newTodo.project);
  }

  todos.push(newTodo);

  saveToLocalStorage("todos", todos);
}

function deleteTodo(id) {
  let index = todos.findIndex((todo) => todo.id === id);

  todos.splice(index, 1);

  saveToLocalStorage("todos", todos);
}

function editTodo(
  id,
  newTitle,
  newDescription,
  newDueDate,
  newPriority,
  newProject,
) {
  let chosenTodo = todos.find((todo) => todo.id === id);

  chosenTodo.title = newTitle;
  chosenTodo.description = newDescription;
  chosenTodo.dueDate = newDueDate;
  chosenTodo.priority = newPriority;
  chosenTodo.project = newProject;

  let projectExists = projects.some((project) => project.name === newProject);

  if (!projectExists) {
    addNewProject(newProject);
  }

  saveToLocalStorage("todos", todos);
}

export { todos, addNewTodo, deleteTodo, editTodo };
