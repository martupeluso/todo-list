import { todos } from "./todo.js";

const projects = [];

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
}

addNewProject("Inbox");

export { projects, addNewProject };
