class Todo {
  constructor(title, description, dueDate, project, priority, completed) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
    this.priority = priority;
    this.completed = completed;
  }
}

class TodoManager {
  constructor() {
    this.todos = [];
  }

  addNewTodo(title, description, dueDate, project, priority, completed) {
    let newTodo = new Todo(
      title,
      description,
      dueDate,
      project,
      priority,
      completed,
    );

    this.todos.push(newTodo);
  }

  modifyTodo(index, propertyToChange, newValue) {
    let pickedTodo = this.todos[index];

    pickedTodo[propertyToChange] = newValue;
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
  }
}

let manager = new TodoManager();
