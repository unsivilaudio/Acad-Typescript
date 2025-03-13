import State from '@/models/state';
import Project, { ProjectStatus } from '@/models/project';

type ProjectListener = (projects: Project[]) => void;

class ProjectState extends State<ProjectListener> {
  private static instance: ProjectState;
  private projects: Project[] = [];

  constructor() {
    super();
    if (ProjectState.instance) {
      return ProjectState.instance;
    }
    ProjectState.instance = this;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export default ProjectState;
