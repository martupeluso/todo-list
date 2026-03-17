import "./styles.css";
import { todos } from "./todo.js";
import { showProjects, showTodos } from "./dom.js";
import { projects, addNewProject, deleteProject } from "./project.js";
import { addNewTodo, deleteTodo, editTodo } from "./todo.js";
import { filterByToday, filterByThisWeek, filterByPriority } from "./utils.js";

const projectName = document.querySelector(".project-name");

let currentProject = "Inbox";
let currentSort = "Name";

let itemToDelete = null;
let itemToEdit = null;

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

const filtersList = document.querySelector(".filters-list");
filtersList.addEventListener("click", (e) => {
  let filter = e.target.closest("li");

  if (filter) {
    projectName.textContent = filter.textContent;
    currentProject = null;
    renderTodos();
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
      currentProject = project.textContent;
      projectName.textContent = currentProject;
      renderTodos();
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
        addNewProject(newProject.textContent);
        newProject.contentEditable = false;
        currentProject = newProject.textContent;
        projectName.textContent = currentProject;
        showProjects();
        renderTodos();
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

const editModal = document.querySelector(".edit-modal");
const editForm = document.querySelector(".edit-modal form");

const cancelEdit = document.querySelector(".edit-modal .cancel");
const confirmEdit = document.querySelector(".edit-modal .confirm");

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
  } else if (projects.some((project) => project.id === id)) {
    let deletedProjectName = itemToDelete.textContent;
    deleteTodosFromProject(deletedProjectName);
    deleteProject(id);
    showProjects();
    currentProject = "Inbox";
    projectName.textContent = currentProject;
  }

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
