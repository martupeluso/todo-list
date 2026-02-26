const projects = [
  {
    name: "Inbox",
    todos: [],
  },
];

export default class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}
