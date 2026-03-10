import { projects } from "./project.js";
import { todos, deleteTodo } from "./todo.js";
import { formatDate } from "./utils.js";

const projectsList = document.querySelector(".projects-list");
const todosList = document.querySelector(".todos");

function showProjects() {
  projectsList.textContent = "";

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
      const div = document.createElement("div");
      div.classList.add("todo-div");
      div.setAttribute("data-id", todo.id);

      const input = document.createElement("input");
      input.type = "checkbox";

      const todoDataDiv = document.createElement("div");

      const todoName = document.createElement("li");
      todoName.textContent = todo.title;

      const todoDescription = document.createElement("p");
      todoDescription.textContent = todo.description;

      const todoDate = document.createElement("span");
      todoDate.textContent = `${formatDate(todo.dueDate)}`;
      todoDate.classList.add("todo-date");

      const todoPriority = document.createElement("span");
      todoPriority.textContent = ` — P${todo.priority}`;

      const deleteButton = document.createElement("span");
      deleteButton.classList.add("delete-button");

      const hr = document.createElement("hr");

      todoDataDiv.append(todoName, todoDescription, todoDate, todoPriority);

      div.append(input, todoDataDiv, deleteButton);
      todosList.append(div, hr);
    }
  }
}

export { showProjects, showTodos };
