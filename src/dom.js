import { projects } from "./project.js";

const projectsList = document.querySelector(".projects-list");

function showProjects() {
  for (let project of projects) {
    if (project.name !== "Inbox") {
      const projectItem = document.createElement("li");
      projectItem.textContent = project.name;

      projectsList.appendChild(projectItem);
    }
  }
}

export { showProjects };
