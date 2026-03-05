import { projects } from "./project.js";
import { todos } from "./todo.js";

const projectsList = document.querySelector(".projects-list");
const todosList = document.querySelector(".todos");

function showProjects() {
  for (let project of projects) {
    if (project.name !== "Inbox") {
      const projectItem = document.createElement("li");
      projectItem.textContent = project.name;

      projectsList.appendChild(projectItem);
    }
  }
}

function showTodos(currentProject) {
  todosList.textContent = "";

  for (let todo of todos) {
    if (todo.project === currentProject) {
      const todoItem = document.createElement("li");
      todoItem.textContent = todo.title;

      todosList.appendChild(todoItem);
    }
  }
}

export { showProjects, showTodos };
