import { projects } from "./project.js";
import {
  sortByName,
  sortByDueDate,
  sortByPriority,
  formatDate,
} from "./utils.js";

const projectsList = document.querySelector(".projects-list");
const todosList = document.querySelector(".todos");
const completedTodosList = document.querySelector(".completed-todos");

function showProjects() {
  projectsList.textContent = "";

  for (let project of projects) {
    if (project.name !== "Inbox") {
      const projectItem = document.createElement("li");
      projectItem.textContent = project.name;
      projectItem.setAttribute("data-id", project.id);

      const deleteButton = document.createElement("span");
      deleteButton.classList.add("delete-button");

      projectItem.appendChild(deleteButton);
      projectsList.appendChild(projectItem);
    }
  }
}

function showTodos(todos, currentProject, currentSort) {
  todosList.textContent = "";
  completedTodosList.textContent = "";

  if (
    todos.length === 0 ||
    todos.every((todo) => todo.completed) ||
    (!todos.some((todo) => todo.project === currentProject) &&
      currentProject !== null)
  ) {
    showEmptyViewMessage();
  }

  let sortedTodos;

  if (currentSort === "Name") {
    sortedTodos = sortByName(todos);
  } else if (currentSort === "Date") {
    sortedTodos = sortByDueDate(todos);
  } else {
    sortedTodos = sortByPriority(todos);
  }

  for (let todo of sortedTodos) {
    if (todo.project === currentProject || currentProject === null) {
      const div = document.createElement("div");
      div.classList.add("todo-div");
      div.setAttribute("data-id", todo.id);

      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = todo.completed;

      const todoDataDiv = document.createElement("div");

      const todoName = document.createElement("li");
      todoName.textContent = todo.title;

      const todoDescription = document.createElement("p");
      todoDescription.textContent = todo.description;

      const todoDate = document.createElement("span");
      todoDate.textContent = `${formatDate(todo.dueDate)}`;
      todoDate.classList.add("todo-date");

      const todoPriority = document.createElement("span");
      todoPriority.classList.add("priority-display");
      todoPriority.textContent = `P${todo.priority}`;

      const todoProject = document.createElement("span");
      todoProject.classList.add("project-display");
      todoProject.textContent = `${todo.project}`;

      const deleteButton = document.createElement("span");
      deleteButton.classList.add("delete-button");

      const hr = document.createElement("hr");

      todoDataDiv.append(
        todoName,
        todoDescription,
        todoDate,
        todoPriority,
        todoProject,
      );

      div.append(input, todoDataDiv, deleteButton);

      if (todo.completed) {
        completedTodosList.append(div, hr);
      } else {
        todosList.append(div, hr);
      }
    }
  }
}

function showEmptyViewMessage() {
  const p = document.createElement("p");
  p.textContent = "Nothing to see here!";

  todosList.appendChild(p);
}

export { showProjects, showTodos };
