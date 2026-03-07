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

const modal = document.querySelector(".modal");
const form = document.querySelector(".modal form");
const cancelModal = document.querySelector(".modal .cancel");

const addButton = document.querySelector(".add-new-todo");
addButton.addEventListener("click", () => {
  modal.showModal();
});

cancelModal.addEventListener("click", () => {
  modal.close();
  form.reset();
});
