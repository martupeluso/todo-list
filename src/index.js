import "./styles.css";
import { todos } from "./todo.js";
import { showProjects, showTodos } from "./dom.js";
import { addNewTodo, deleteTodo } from "./todo.js";
import { filterByToday, filterByThisWeek } from "./utils.js";

const projectName = document.querySelector(".project-name");

let currentProject = "Inbox";
let currentSort = "Name";

showProjects();
renderTodos();

const inbox = document.querySelector(".inbox");
inbox.addEventListener("click", () => {
  currentProject = "Inbox";
  renderTodos();
  projectName.textContent = currentProject;
});

const today = document.querySelector(".today");
today.addEventListener("click", () => {
  projectName.textContent = "Today";
  currentProject = null;
  renderTodos();
});

const upcoming = document.querySelector(".upcoming");
upcoming.addEventListener("click", () => {
  projectName.textContent = "Upcoming";
  currentProject = null;
  renderTodos();
});

const projectsList = document.querySelector(".projects-list");
projectsList.addEventListener("click", (e) => {
  let project = e.target.closest("li");

  if (project) {
    currentProject = project.textContent;
    renderTodos();
    projectName.textContent = currentProject;
  }
});

const sortButtons = document.querySelector(".sort-options ul");
sortButtons.addEventListener("click", (e) => {
  const li = e.target.closest("li");

  if (li) {
    const radio = li.querySelector("input[type='radio']");
    radio.checked = true;
    currentSort = radio.value;

    renderTodos();
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
  renderTodos();
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
  renderTodos();
  deleteModal.close();
});

let filteredTodos;

function renderTodos() {
  if (currentProject === null) {
    if (projectName.textContent === "Today") {
      filteredTodos = filterByToday(todos);
      showTodos(filteredTodos, currentProject, currentSort);
    } else if (projectName.textContent === "Upcoming") {
      filteredTodos = filterByThisWeek(todos);
      showTodos(filteredTodos, currentProject, currentSort);
    }
  } else {
    showTodos(todos, currentProject, currentSort);
  }
}
