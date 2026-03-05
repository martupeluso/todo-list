import "./styles.css";
import { showProjects, showTodos } from "./dom.js";

let currentProject = "Inbox";

showProjects();
showTodos(currentProject);

const inbox = document.querySelector(".inbox");
inbox.addEventListener("click", () => {
  currentProject = "Inbox";
  showTodos(currentProject);
});

const projects = document.querySelectorAll(".projects-list li");
projects.forEach((project) => {
  project.addEventListener("click", () => {
    currentProject = project.textContent;
    showTodos(currentProject);
  });
});
