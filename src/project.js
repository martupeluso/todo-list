const projects = [
  {
    name: "Inbox",
    todos: [],
  },
];

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}

function addNewProject(name) {
  let newProject = new Project(name);

  projects.push(newProject);
}

export { projects, addNewProject };
