import "./styles.css";
import { todos } from "./todo.js";
import { showProjects, showTodos } from "./dom.js";
import {
  projects,
  addNewProject,
  deleteProject,
  editProject,
} from "./project.js";
import { addNewTodo, deleteTodo, editTodo } from "./todo.js";
import { filterByToday, filterByThisWeek, filterByPriority } from "./utils.js";
import { getFromLocalStorage, saveToLocalStorage } from "./storage.js";

const projectName = document.querySelector(".project-name");
projectName.addEventListener("mouseover", () => {
  if (projectName.classList.contains("editable")) {
    projectName.contentEditable = true;
  }
});

projectName.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    let projectExists = projects.find(
      (project) => project.name === projectName.textContent,
    );

    if (projectName.textContent === "" || projectExists) return;

    let newName = projectName.textContent;

    editProject(currentProjectID, newName);
    updateCurrentProject(currentProjectID, newName);

    showProjects();
    renderTodos();
  }
});

let currentTheme = getFromLocalStorage("theme") || "light";
document.documentElement.classList = currentTheme;

let themeButtons = document.querySelectorAll(".theme-picker div");
themeButtons.forEach((button) => {
  const radio = button.querySelector("input[type='radio'");
  if (radio.value === currentTheme) {
    radio.checked = true;
  }
});

let currentProject = "Inbox";
let currentProjectID = null;
let currentSort = "Name";

let itemToDelete = null;
let itemToEdit = null;
let itemToComplete = null;

showProjects();
renderTodos();

const themePicker = document.querySelector(".theme-picker");
themePicker.addEventListener("click", (e) => {
  const button = e.target.closest("div");

  if (button) {
    const radio = button.querySelector("input[type='radio']");
    radio.checked = true;
    currentTheme = radio.value;
    document.documentElement.classList = currentTheme;
    saveToLocalStorage("theme", currentTheme);
  }
});

const inbox = document.querySelector(".inbox");
inbox.addEventListener("click", () => {
  updateCurrentProject(null, "Inbox");
});

const today = document.querySelector(".today");
today.addEventListener("click", () => {
  updateCurrentProject(null, null, "Today");
});

const upcoming = document.querySelector(".upcoming");
upcoming.addEventListener("click", () => {
  updateCurrentProject(null, null, "Upcoming");
});

const filtersList = document.querySelector(".filters-list");
filtersList.addEventListener("click", (e) => {
  let filter = e.target.closest("li");

  if (filter) {
    updateCurrentProject(null, null, filter.textContent);
  }
});

const projectsList = document.querySelector(".projects-list");
projectsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    itemToDelete = e.target.closest("li");

    deleteModal.showModal();
  } else {
    let project = e.target.closest("li");

    if (project) {
      let id = project.getAttribute("data-id");
      updateCurrentProject(id, project.textContent);
    }
  }
});

const addProjectButton = document.querySelector(".add-new-project");
addProjectButton.addEventListener("click", () => {
  let li = document.createElement("li");
  let newProject = document.createElement("p");
  newProject.contentEditable = true;

  newProject.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (newProject.textContent) {
        let projectExists = projects.some(
          (project) => project.name === newProject.textContent,
        );

        if (!projectExists) {
          addNewProject(newProject.textContent);
          newProject.contentEditable = false;

          let createdProject = projects.at(-1);

          updateCurrentProject(createdProject.id, createdProject.name);
          showProjects();
        }
      }
    }
  });

  newProject.addEventListener("blur", () => {
    if (!newProject.textContent) {
      li.remove();
    }
  });

  li.appendChild(newProject);
  projectsList.append(li);
  newProject.focus();
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
  let projectInput = document.querySelector("#project-choice");
  projectInput.placeholder = currentProject || "Inbox";
  modal.showModal();
});

cancelModal.addEventListener("click", () => {
  modal.close();
  form.reset();
});

form.addEventListener("submit", () => {
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  let dueDate = document.querySelector("#datetime").value;
  let priority = document.querySelector("#priority").value;
  let project =
    document.querySelector("#project-choice").value ||
    currentProject ||
    "Inbox";
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

const editModal = document.querySelector(".edit-modal");
const editForm = document.querySelector(".edit-modal form");

const cancelEdit = document.querySelector(".edit-modal .cancel");

const newTitle = document.querySelector(".edit-modal #new-title");
const newDescription = document.querySelector(".edit-modal #new-description");
const newDate = document.querySelector(".edit-modal #new-datetime");
const newProject = document.querySelector(".edit-modal #new-project-choice");
const newPriority = document.querySelector(".edit-modal #new-priority");

const todosList = document.querySelector(".todos");
todosList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    itemToDelete = e.target.closest("div");

    deleteModal.showModal();
  } else if (e.target.tagName === "INPUT") {
    itemToComplete = e.target.closest("div[data-id]");
    let id = itemToComplete.getAttribute("data-id");
    let todo = todos.find((todo) => todo.id === id);

    todo.completed = !todo.completed;
    saveToLocalStorage("todos", todos);
    renderTodos();
  } else {
    itemToEdit = e.target.closest("div[data-id]");

    if (!itemToEdit) return;

    editModal.showModal();
    document.querySelector("#new-title").focus();

    let id = itemToEdit.getAttribute("data-id");
    let todo = todos.find((todo) => todo.id === id);

    newTitle.value = todo.title;
    newDescription.value = todo.description;
    newDate.value = todo.dueDate.slice(0, 16);
    newProject.value = todo.project;
    newPriority.value = todo.priority;
  }
});

const completedTodosList = document.querySelector(".completed-todos");
completedTodosList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    itemToDelete = e.target.closest("div");

    deleteModal.showModal();
  } else if (e.target.tagName === "INPUT") {
    let itemToUncomplete = e.target.closest("div[data-id]");
    let id = itemToUncomplete.getAttribute("data-id");
    let todo = todos.find((todo) => todo.id === id);

    todo.completed = !todo.completed;
    saveToLocalStorage("todos", todos);
    renderTodos();
  }
});

cancelEdit.addEventListener("click", () => {
  editModal.close();
});

cancelDelete.addEventListener("click", () => {
  deleteModal.close();
});

editForm.addEventListener("submit", () => {
  let id = itemToEdit.getAttribute("data-id");

  if (todos.some((todo) => todo.id === id)) {
    let title = newTitle.value;
    let description = newDescription.value;
    let dueDate = newDate.value;
    let priority = newPriority.value;
    let project = newProject.value;

    editTodo(id, title, description, dueDate, priority, project);
    showProjects();
    renderTodos();
  }
});

confirmDelete.addEventListener("click", () => {
  let id = itemToDelete.getAttribute("data-id");

  if (todos.some((todo) => todo.id === id)) {
    deleteTodo(id);
    renderTodos();
  } else if (projects.some((project) => project.id === id)) {
    let deletedProjectName = itemToDelete.textContent;
    deleteTodosFromProject(deletedProjectName);
    deleteProject(id);
    showProjects();
    updateCurrentProject(currentProjectID, "Inbox");
  }

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
    } else {
      let priority = projectName.textContent.at(-1);
      filteredTodos = filterByPriority(todos, priority);

      showTodos(filteredTodos, currentProject, currentSort);
    }
  } else {
    showTodos(todos, currentProject, currentSort);
  }
}

function deleteTodosFromProject(project) {
  const todosToDelete = todos.filter((todo) => todo.project === project);
  for (let todo of todosToDelete) {
    deleteTodo(todo.id);
  }
}

function updateCurrentProject(id, project, name) {
  if (project !== "Inbox" && project !== null) {
    projectName.classList.add("editable");
  } else {
    projectName.classList.remove("editable");
    projectName.contentEditable = false;
  }

  currentProjectID = id;

  projectName.textContent = project || name;
  currentProject = project;
  renderTodos();
}
