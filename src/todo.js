class Todo {
  constructor(title, description, dueDate, priority, project, completed) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.completed = completed;
  }
}

function addNewTodo(title, description, dueDate, priority, project, completed) {
  let newTodo = new Todo(
    title,
    description,
    dueDate,
    priority,
    project,
    completed,
  );
}
