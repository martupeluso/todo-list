import { todos } from "./todo.js";
import { getFromLocalStorage, saveToLocalStorage } from "./storage.js";

const projects = getFromLocalStorage("projects") || [];

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
  }

  get todos() {
    return todos.filter((todo) => todo.project === this.name);
  }
}

function addNewProject(name) {
  let newProject = new Project(name);

  projects.push(newProject);

  saveToLocalStorage("projects", projects);
}

function deleteProject(id) {
  let index = projects.findIndex((project) => project.id === id);

  projects.splice(index, 1);

  saveToLocalStorage("projects", projects);
}

addNewProject("Inbox");

export { projects, addNewProject };
