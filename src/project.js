import { todos } from "./todo.js";
import { getFromLocalStorage, saveToLocalStorage } from "./storage.js";

const projects = getFromLocalStorage("projects") || [];

class Project {
  constructor(name) {
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

addNewProject("Inbox");

export { projects, addNewProject };
