import "./styles.css";
import { showProjects, showTodos } from "./dom.js";
import { addNewTodo, deleteTodo } from "./todo.js";

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
  let project = document.querySelector("#project-choice").value || "Inbox";
  let completed = false;
  addNewTodo(title, description, dueDate, priority, project, completed);

  modal.close();
  form.reset();
  showTodos(currentProject);
  showProjects();
});

const deleteModal = document.querySelector(".delete-modal");

const cancelDelete = document.querySelector(".delete-modal .cancel-button");
const confirmDelete = document.querySelector(".delete-modal .delete-button");

let todoToDelete = null;

const todosList = document.querySelector(".todos");
todosList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    todoToDelete = e.target.closest("div");

    deleteModal.showModal();
  }
});

cancelDelete.addEventListener("click", () => {
  deleteModal.close();
});

confirmDelete.addEventListener("click", () => {
  let id = todoToDelete.getAttribute("data-id");

  deleteTodo(id);
  showTodos(currentProject);
  deleteModal.close();
});
