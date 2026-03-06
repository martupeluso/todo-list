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
      const div = document.createElement("todo-div");
      div.classList.add("todo-div");

      const input = document.createElement("input");
      input.type = "checkbox";

      const todoDataDiv = document.createElement("todo-data-div");

      const todoName = document.createElement("li");
      todoName.textContent = todo.title;

      const todoDescription = document.createElement("p");
      todoDescription.textContent = todo.description;

      const todoDate = document.createElement("span");
      todoDate.textContent = todo.dueDate;

      const todoPriority = document.createElement("span");
      todoPriority.textContent = ` — P${todo.priority}`;

      const hr = document.createElement("hr");

      todoDataDiv.append(todoName, todoDescription, todoDate, todoPriority);

      div.append(input, todoDataDiv);
      todosList.append(div, hr);
    }
  }
}

export { showProjects, showTodos };
