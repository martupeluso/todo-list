import { todos } from "./todo.js";
import { getFromLocalStorage, saveToLocalStorage } from "./storage.js";

const projects = getFromLocalStorage("projects") || [];

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
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

function editProject(id, newName) {
  let project = projects.find((project) => project.id === id);

  for (let todo of todos) {
    if (todo.project === project.name) {
      todo.project = newName;
    }
  }

  project.name = newName;

  saveToLocalStorage("projects", projects);
  saveToLocalStorage("todos", todos);
}

if (!projects.some((project) => project.name === "Inbox")) {
  addNewProject("Inbox");
}

export { projects, addNewProject, deleteProject, editProject };
