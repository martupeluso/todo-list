import { projects, addNewProject } from "./project.js";

const todos = [];

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
}

function deleteTodo(id) {
  let index = todos.findIndex((todo) => todo.id === id);

  todos.splice(index, 1);
}

function editTodo(
  id,
  title,
  description,
  dueDate,
  priority,
  project,
  completed,
) {
  let chosenTodo = todos.find((todo) => todo.id === id);

  chosenTodo.title = title;
  chosenTodo.description = description;
  chosenTodo.dueDate = dueDate;
  chosenTodo.priority = priority;
  chosenTodo.project = project;
  chosenTodo.completed = completed;
}

export { todos };
