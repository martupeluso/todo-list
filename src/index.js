import "./styles.css";
import { showProjects, showTodos } from "./dom.js";
import { addNewTodo } from "./todo.js";

const projectName = document.querySelector(".project-name");

let currentProject = "Inbox";

showProjects();
showTodos(currentProject);

const inbox = document.querySelector(".inbox");
inbox.addEventListener("click", () => {
  currentProject = "Inbox";
  showTodos(currentProject);
  projectName.textContent = currentProject;
});

const projectsList = document.querySelector(".projects-list");
projectsList.addEventListener("click", (e) => {
  let project = e.target.closest("li");

  if (project) {
    currentProject = project.textContent;
    showTodos(currentProject);
    projectName.textContent = currentProject;
  }
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

form.addEventListener("submit", () => {
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  let dueDate = document.querySelector("#datetime").value || new Date();
  let priority = document.querySelector("#priority").value;
  let project = document.querySelector("#project-choice").value;
  let completed = false;
  addNewTodo(title, description, dueDate, priority, project, completed);

  modal.close();
  form.reset();
  showTodos(currentProject);
  showProjects();
});
