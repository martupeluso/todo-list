import { projects, addNewProject } from "./project";

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

  addTodoToProject(newTodo);
  todos.push(newTodo);
}

function addTodoToProject(newTodo) {
  let todosProject = projects.find(
    (project) => project.name === newTodo.project,
  );

  if (todosProject) {
    todosProject.todos.push(newTodo);
  } else {
    addNewProject(newTodo.project);
    projects.at(-1).todos.push(newTodo);
  }
}
